const boom  = require('@hapi/boom');

const { models }          = require('./../../libs/sequelize');
const Sales               = require('./sales.service.js');
const user                = require('./../catalogs/user.service');
const Product             = require('./../catalogs/product.service');
const Rule                = require('./../operations/rules.service');
const EmployeePosService  = require('./../operations/employees-pos.service');
const PointsOfSaleService = require('./../operations/points-of-sale.service');
const fiscalPeriodService = require('./../catalogs/fiscal-period.service');
const QuarterService      = require('./../operations/quarter.service');
const XLSX                = require('xlsx');

// provisional services
const employeeAssignService = require('../operations/employee-points.service');

const useSelection    = new user();
const findProduct     = new Product();
const findRule        = new Rule();
const findPosEmployee = new EmployeePosService();
const findPos         = new PointsOfSaleService();
const findFiscalPerid = new fiscalPeriodService();
const findQuarter     = new QuarterService();
const employeeAssign  = new employeeAssignService();

class CsvFileProcessService{

  constructor(){
    // construct
  }

  async create(data){
    const newCsvFile = await models.CsvFilesProcessed.create(data);
    return newCsvFile;
  }

  async find(){
    const csvFile = await models.CsvFilesProcessed.findAll();

    return csvFile;
  }

  async findOne(id){

    const csvFile = await models.CsvFilesProcessed.findByPk(id);

    if (!csvFile){
     throw boom.notFound('Csv Files Processed not found');
    }

    return csvFile;
  }

  async update(id, changes){
    const CsvFilesProcessed = this.findOne(id);
    const resp = (await CsvFilesProcessed).update(changes);

    return resp;
  }

  async delete(id){
    const csvFile = this.findOne(id);
    (await csvFile).destroy();

    return {id};
  }

  async processSales(id){

    //console.log(idFile);
    // MINE: Se obtiene el archivo CSV procesado utilizando su ID, que se pasa como parámetro a la función processSales.
    const getFile = await models.CsvFilesProcessed.findByPk(id);

    // MINE: Se utiliza la biblioteca xlsx para leer el contenido del archivo CSV. Se utiliza la función readFile para leer el archivo y se guarda el resultado en la variable workbook.
    const workbook       = XLSX.readFile(getFile.pathSrc)
    // MINE: Se obtiene la lista de nombres de hojas del libro de trabajo utilizando la propiedad SheetNames de workbook. El primer nombre de hoja se asigna a la variable sheets.
    const workbookSheets = workbook.SheetNames;
    const sheets         = workbookSheets[0];
    // MINE: Se utiliza la función sheet_to_json de la biblioteca xlsx.utils para convertir la hoja de cálculo en formato JSON. El resultado se guarda en la variable dataExcel, que contendrá un array de objetos, donde cada objeto representa una fila de datos del archivo CSV.
    const dataExcel      = XLSX.utils.sheet_to_json(workbook.Sheets[sheets]);
    // MINE: console.log("dataExcel:", dataExcel);
    // MINE: Se realiza un procesamiento de fechas utilizando el método processDate de la instancia actual de CsvFileProcessService. Este método se utiliza para convertir la fecha en el formato adecuado.
    const nowDate        = this.processDate(new Date(),2);
    // MINE: Se inicializa la variable count en 0, que se utilizará para llevar un conteo de las filas procesadas.
    let count = 0;
    let countSalesProcessed = 0;

    // MINE: console.log("getFile.dataValues.operationStatusId:", getFile.dataValues.operationStatusId);
    // MINE: SUGERENCIA: dar respuesta si el archivo ya tiene un operationStatusId igual a 7
    // if (getFile.dataValues.operationStatusId == 7) return "This CSV file has already been processed";


    getFile.update({
      operationStatusId:1,
      UpdatedAt:nowDate.toString(),
    })

    for(const itemFila of dataExcel){

      count = count +1;
      const serviceSales = new Sales();

      const number           = itemFila['DATE'];
      const dateN            = new Date((number - (25567 + 2)) * 86400 * 1000);
      const salesFullDate    = this.processDate(dateN,1);

      const yearAndWeek      = String(itemFila['WK']).split("-");
      let uploadRowError     = null;
      let successType        = 1;
      let findProd           = await findProduct.findByName(itemFila['PRODUCT_NAME']); // MINE: ejemplo: 'CCSN'
      // MINE: return findProd;

      let yearReference      = yearAndWeek[0];
      let weekReference      = yearAndWeek[1];
      let findPosInUser      = '';
      let getIdCompany       = '';
      let userSale           = '';
      let dateSale           = '';
      let findRuleInter      = '';
      let digipointSave      = '';
      let approuch           = '';
      let getPosId           = '';
      let quarter            = null;
      let invoiceAssigNumber = '';

      let getInvoice = await this.findByInvoice(String(itemFila['INVOICE']), parseInt(findProd.id) );
      // MINE: return getInvoice;
      // manage Errors

      let factError       = (findProd == null ||  String(findProd).length < 1  || String(findProd) == '' ) ? 1 : 0;
      invoiceAssigNumber  = (factError === 1 ) ? 0 : String(itemFila['INVOICE']);

      let emailError      = (itemFila['Email Address'] == null || itemFila['Email Address'] == 'NULL'  ||  String(itemFila['Email Address']).length < 1  || String(itemFila['Email Address']) == '') ? 1 : 0;
      let userSaleToFind  = (emailError === 1 )       ? null : await useSelection.findByEmail(String(itemFila['Email Address'])); // MINE: Acá busca al vendedor (modelo users) por email
      findPosInUser       = (userSaleToFind == null)  ? null : await findPosEmployee.findByUserId(userSaleToFind.id); // MINE: Acá busca a employee_pos
      getIdCompany        = (findPosInUser == null)   ? null : await findPos.findOne(findPosInUser.posId);
      let getFiscalPeriod = (getIdCompany == null)    ? null : await findFiscalPerid.findByCompany(getIdCompany.companyId);
      let getQuarter      = (getFiscalPeriod == null) ? null : await findQuarter.findRuleByQuarterFiscal(getFiscalPeriod.id);
      let sType           = itemFila['STYPE'];
      /*
        console.log("**** IVOINCE **** ",getInvoice);
        console.log("**** USER **** ",findPosInUser); 
      */

      findRuleInter = (findPosInUser == null) ? null : await findRule.findByQuarter(getQuarter.id,sType, weekReference); // MINE: Busca el model rules
      // console.log("Rule encontrada: ",findRuleInter);
      // console.log("**** RULE **** ",findRuleInter);
      // console.log("**** SALES DATE **** ",itemFila['DATE']);


      const salesInvoice = await serviceSales.findSaleByInvoice(`${itemFila['INVOICE']}`); //MINE: buscar dónde encuentro el invoice
      const exists = salesInvoice.find(venta => venta.product?.description == findProd.description);

      // MINE
      /* console.log("Este es el invoice de la fila:", `${itemFila['INVOICE']}`);
      console.log("Este es el sku de la fila:", itemFila['PRODUCT_NAME']);
      console.log(`existe un producto con mismo invoice y sku?`, !!exists); */
      // return {salesInvoice, exists: !!exists, findProd};

      // MINE:
      /* if (Boolean(exists)) {
        // continue;
      } else {
        countSalesProcessed += 1;
      } */

      // MINE: Error in line: Invalid date format please revise this format
      if ((itemFila['DATE'] == 'NULL') || (salesFullDate == null)) {
        uploadRowError = 3;
        successType = false;
        dateSale = null;
        // LO COMENTÉ YOOO
        // console.log("**** IN FEIL **** ",itemFila['DATE']);
        console.log("ENTRÉ AQUÍ, ESTE ES EL uploadRowError =>", uploadRowError);
      }
      
      // MINE: Error in line: no name user
      // MINE: SUGERENCIA: No debería ser el error 8? (Error in line: Rule no exist)
      if (findRuleInter == null) {
        uploadRowError = 9;
      }
      
      // MINE: SUGERENCIA: Esta validación está pisando los dos if anteriores, 
      if ((itemFila['DATE'] == 'NULL') || (getInvoice != null) || (factError == 1) || (emailError == 1) || ( findRuleInter == null)  || (findRuleInter == null)) {
        console.log("Y AQUÍ TAMBIÉN, ESTE ES EL uploadRowError =>", uploadRowError);
        // LO COMENTÉ YOOO
        // console.log("ERRORS : ", getInvoice.dataValues)
        const saleInvoiceSave =  await serviceSales.create({
          posId: null,
          productId: null,
          employAssignedId:null,
          totalPoints:0,
          quarterId:null,
          yearInFile:null,
          weekInFile:null,
          pendingPoints:0,
          assignedPoints:0,
          saleDates:nowDate,
          pointsLoadDates:nowDate,
          pointsAssignedDates:nowDate,
          fileUploadId:getFile.id,
          uploadSuccess:0,
          invoiceNumber:String(itemFila['INVOICE']) ,
          saleAmount: itemFila['Revenue USD'],
          errorId:(getInvoice != null) ? 7 : uploadRowError,
          UpdatedAt:nowDate.toString(),
          saleType: null,
          salesNote: `Sales Error factura: ${ itemFila['INVOICE'] } Line: ${count}`,
          marketSegment: String(itemFila['MARKET_SEGMENT']),
          phonevsWeb: String(itemFila['PHONE_VS_WEB'])
        });
      }

      console.log("Y AQUÍ TAMBIÉN, ESTE ES EL uploadRowError =>", uploadRowError);
      return "YO ";


      if (emailError == 0 && getInvoice == null && factError == 0 && emailError == 0 && dateN != null && findRuleInter != null && (itemFila['DATE'] != 'NULL')) {
        
        if (userSaleToFind != null) {
          if (sType !== null || sType != '') {

            digipointSave = (parseFloat(itemFila['Revenue USD']) * findRuleInter.digipointsPerAmount) / findRuleInter.baseAmount;
            approuch      = Math.round(digipointSave);

            if (findRuleInter !== null) {
              //console.log('READY****')
              getPosId = findPosInUser.posId;
              dateSale = salesFullDate;
              userSale = userSaleToFind.id;
              uploadRowError = null;
              quarter = getQuarter.id;
              successType = true;
              //console.log(" ****** FECHA DE LA VENTA ******",dateSale);

              const saleInvoiceSave =  await serviceSales.create({
                posId: getPosId,
                productId: findProd.id,
                employAssignedId:userSale,
                totalPoints:approuch,
                quarterId:quarter,
                yearInFile:yearReference,
                weekInFile:weekReference,
                pendingPoints:0,
                assignedPoints:approuch,
                saleDates:dateSale,
                pointsLoadDates:nowDate,
                pointsAssignedDates:nowDate,
                fileUploadId:getFile.id,
                uploadSuccess:successType,
                invoiceNumber:invoiceAssigNumber ,
                saleAmount: itemFila['Revenue USD'],
                errorId:uploadRowError,
                UpdatedAt:nowDate.toString(),
                saleType: itemFila['STYPE'].toString(),
                salesNote: null,
                marketSegment: String(itemFila['MARKET_SEGMENT']),
                phonevsWeb: String(itemFila['PHONE_VS_WEB'])
              });
                  
              if (approuch > 0) {
                let employeeAssig = await employeeAssign.create({
                  employeeId: userSale,
                  statusId: 11,
                  pointsAssigned:approuch,
                  pointsRedeemed:0,
                  pointsAssignedDate:nowDate,
                  userAssignedId:1,
                  saleAssigned:true,
                  percentageSale:0,
                  saleId:saleInvoiceSave.id,
                  createdAt:nowDate,
                  updatedAt:nowDate,
                  reasonAssign:invoiceAssigNumber,
                  behavior:false,
                  promotion:false,
                })
              }
              // provisional info insert
            } else {
              dateSale = null;
              uploadRowError = 5; // MINE: Error in line: Week no found
              quarter = getQuarter.id;
              successType = false;
            }
            // return dateSale;
          } else {
            uploadRowError = 6; // MINE: Error in line:  Sales type no found
            successType = false;
            dateSale = null;
          }
        } else {
          uploadRowError = 7; // MINE: Error in line:  Sales type no found
          successType    = false;
          dateSale       = null;
        }
      }
      // console.log("🚀 ~ file: process-document.service.js:80 ~ ProcessDocumentService ~ converAndSaveFile ~ saleInvoiceSave", saleInvoiceSave)
      //let dateExplodeToFormat = dateRead
    }

    getFile.update({
      operationStatusId:7,
      UpdatedAt:nowDate.toString(),
    })

    const report = {
      salesToProcess: dataExcel.length,
      salesProcessed: countSalesProcessed,
    }

    return "Process Success";
  }

  processDate(data, type){

    let dateDay='';

    const date = new Date(data);

    if (type == 1) {
      if (date.getDate() < 10) {
        dateDay = "0"+parseInt(date.getDate()+1);
      }

      if (date.getDate() > 10 && date.getDate() < 31) {
        dateDay = parseInt(date.getDate()+1);
      }

      if (date.getDate() == 31) {
        dateDay = parseInt(date.getDate())
      }

      //dateDay = (date.getDate() < 10) ? "0"+parseInt(date.getDate()+1) : parseInt(date.getDate()+1);
    } else {
      dateDay = (date.getDate() < 10) ? "0"+parseInt(date.getDate()) : parseInt(date.getDate());
    }

    const dateMonth = (date.getMonth()+1 < 10) ? "0"+parseInt(date.getMonth()+1) : parseInt(date.getMonth()+1);
    const year = date.getFullYear();
    // console.log( year+'-'+dateMonth+'-'+dateDay+' 00:00:00.000');

    return year+'-'+dateMonth+'-'+dateDay+' 00:00:00.000';
  }

  async findByInvoice(getInvoiceNumber, prodId){

    const data = await models.Sales.findOne({
      where:{
        invoiceNumber: getInvoiceNumber,
        productId:prodId
      }
    });

    return data;
  }
}

module.exports =  CsvFileProcessService;
