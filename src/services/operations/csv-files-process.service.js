const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');
const Sales = require('./sales.service.js');
const user = require('./../catalogs/user.service');
const Product = require('./../catalogs/product.service');
const Rule    = require('./../operations/rules.service');
const EmployeePosService = require('./../operations/employees-pos.service');
const PointsOfSaleService = require('./../operations/points-of-sale.service');
const fiscalPeriodService = require('./../catalogs/fiscal-period.service');
const QuarterService = require('./../operations/quarter.service');
const XLSX = require('xlsx');


const useSelection      = new user();
const findProduct       = new Product();
const findRule          = new Rule();
const findPosEmployee   = new EmployeePosService();
const findPos           = new PointsOfSaleService();
const findFiscalPerid   = new fiscalPeriodService();
const findQuarter       = new QuarterService();

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
    if(!csvFile){
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
    const getFile = await models.CsvFilesProcessed.findByPk(id);

    const workbook = XLSX.readFile(getFile.pathSrc)
    const  workbookSheets = workbook.SheetNames;
    const  sheets = workbookSheets[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheets]);
    const nowDate          = this.processDate(new Date(),2);

    let count = 0;
    getFile.update({
      operationStatusId:1,
      UpdatedAt:nowDate.toString(),
    })
  for(const itemFila of dataExcel){

        const serviceSales = new Sales();
        count = count +1;
        const number           = itemFila['DATE'];
        const dateN            = new Date((number - (25567 + 2)) * 86400 * 1000);
        const salesFullDate    = this.processDate(dateN,1);

        const yearAndWeek      = String(itemFila['WK']).split("-");
        let uploadRowError     = null;
        let successType        = 1;
        let findProd           = await findProduct.findByName(itemFila['PRODUCT_NAME']);
        let yearReference      = yearAndWeek[0];
        let weekReference      = yearAndWeek[1];
        let findPosInUser      = '';
        let getIdCompany       = '';
        let userSale           = '';
        let dateSale           = ''
        let findRuleInter      = '';
        let digipointSave      = '';
        let approuch           = '';
        let getPosId           = '';
        let quarter            = null;


        if(findProd == null ){
            uploadRowError = 4;
            successType = false;
            findProd = null
        }

        if( salesFullDate.indexOf("NAN") || salesFullDate == null){
            uploadRowError = 3;
            successType = false;
            dateSale = null;
        }

        if(itemFila['Email Address'] == null ||  String(itemFila['Email Address']).length < 1 ){
            uploadRowError = 2;
            successType = false;
            userSale = null;
        }


        if((itemFila['Email Address'] != null)){
            let userSaleToFind = await useSelection.findByEmail(String(itemFila['Email Address']));
            findPosInUser = await findPosEmployee.findByUserId(userSaleToFind.id);
            getIdCompany = await findPos.findOne(findPosInUser.posId);
            let getFiscalPeriod = await findFiscalPerid.findByCompany(getIdCompany.companyId);
            let getQuarter = await findQuarter.findRuleByQuarterFiscal(getFiscalPeriod.id);
            let sType = itemFila['STYPE'];

            if(sType !== null || sType != ''){

                findRuleInter      = await findRule.findByQuarter(getQuarter.id,sType, weekReference);
                digipointSave      = ( parseFloat(itemFila['Revenue USD']) * findRuleInter.digipointsPerAmount) / findRuleInter.baseAmount;
                approuch           = Math.round(digipointSave);

                if(findRuleInter !== null){
                  console.log('READY****')
                  getPosId = findPosInUser.posId;
                  dateSale = salesFullDate;
                  userSale = userSaleToFind.id;
                  uploadRowError = null;
                  quarter = getQuarter.id;
                  successType = true;
                  //console.log(" ****** FECHA DE LA VENTA ******",dateSale);

                }else{
                        dateSale = salesFullDate;
                        uploadRowError = 5;
                        quarter = getQuarter.id;
                        successType = false;
                }

             // return dateSale;
            }else{
              uploadRowError = null;
              quarter = getQuarter.id;
              successType = true;
            }

        }



        const saleInvoiceSave =  await serviceSales.create({
            posId: getPosId,
            productId: findProd.id,
            employAssignedId:userSale,
            totalPoints:approuch,
            quarterId:quarter,
            yearInFile:yearReference,
            weekInFile:weekReference,
            pendingPoints:approuch,
            assignedPoints:0,
            saleDates:dateSale.toString(),
            pointsLoadDates:nowDate.toString(),
            pointsAssignedDates:null,
            fileUploadId:getFile.id,
            uploadSuccess:successType,
            invoiceNumber: itemFila['INVOICE'],
            saleAmount: itemFila['Revenue USD'],
            errorId:uploadRowError,
            UpdatedAt:nowDate.toString(),
            saleType: itemFila['STYPE'].toString()
          });
        // console.log("🚀 ~ file: process-document.service.js:80 ~ ProcessDocumentService ~ converAndSaveFile ~ saleInvoiceSave", saleInvoiceSave)
                    //let dateExplodeToFormat = dateRead
    }

      getFile.update({
      operationStatusId:7,
      UpdatedAt:nowDate.toString(),
    })


    return "Process Success";


}


processDate(data, type){

  let dateDay='';

  const date = new Date(data);

  if(type == 1){
    dateDay = (date.getDate() < 10) ? "0"+parseInt(date.getDate()+1) : parseInt(date.getDate()+1);
  }else{
    dateDay = (date.getDate() < 10) ? "0"+parseInt(date.getDate()) : parseInt(date.getDate());
  }

  const dateMonth = (date.getMonth()+1 < 10) ? "0"+parseInt(date.getMonth()+1) : parseInt(date.getMonth()+1);
  const year = date.getFullYear();


//  console.log( year+'-'+dateMonth+'-'+dateDay+' 00:00:00.000');

  return year+'-'+dateMonth+'-'+dateDay+' 00:00:00.000';


}


}

module.exports =  CsvFileProcessService;
