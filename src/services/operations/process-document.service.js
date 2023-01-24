const boom  = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const { v4: uuidv4} = require('uuid');
const XLSX = require('xlsx');
const CsvFileService = require('./csv-files-process.service');
const Sales = require('./sales.service.js');
const user = require('./../catalogs/user.service');
const Product = require('./../catalogs/product.service');
const Rule    = require('./../operations/rules.service');
const EmployeePosService = require('./../operations/employees-pos.service');
const PointsOfSaleService = require('./../operations/points-of-sale.service');
const fiscalPeriodService = require('./../catalogs/fiscal-period.service');
const QuarterService = require('./../operations/quarter.service');


const serviceDocument   = new CsvFileService();
const useSelection      = new user();
const findProduct       = new Product();
const findRule          = new Rule();
const findPosEmployee   = new EmployeePosService();
const findPos           = new PointsOfSaleService();
const findFiscalPerid   = new fiscalPeriodService();
const findQuarter       = new QuarterService();


class ProcessDocumentService{

  async converAndSaveFile(bodyData){

    try {


        const fileExtension = path.parse(bodyData.fileName).ext;

        //convert b64 to binary
        const binaryData = Buffer.from(bodyData.base64String, 'base64');

        const getStringName = uuidv4();
        const setNewName = getStringName+fileExtension;



        const resFileSave = await fs.promises.writeFile(__dirname +"/../../assets/uploads/"+setNewName,
                         binaryData);

        const dirNameString = __dirname+"/../..";
        const pathData      = dirNameString+"/assets/uploads/"+setNewName;



        if(resFileSave){
          console.log("resFile: ",resFileSave)
        }

        const registerFile = await serviceDocument.create({
            nameUuid: getStringName,
            extension: fileExtension,
            complete: 1,
            pathSrc:pathData,
            operationStatusId: 2
          });

          const workbook = XLSX.readFile(pathData)
          const  workbookSheets = workbook.SheetNames;
          const  sheets = workbookSheets[0];
          const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheets]);
          // console.log( dataExcel )
          // ToDo Change a new process and endPoint
          let count = 0;
          for(const itemFila of dataExcel){

              const serviceSales = new Sales();
               count = count +1;
               const number           = itemFila['DATE'];
               const dateN            = new Date((number - (25567 + 2)) * 86400 * 1000);
               const salesFullDate    = this.processDate(dateN,1);
               const nowDate          = this.processDate(new Date(),2);
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



               if(findProd == null ){
                  uploadRowError = 4;
                  successType = 0;
                  console.log("PRODUCT not  FOUND");
                  findProd = null
               }



               if( salesFullDate.indexOf("NAN")){
                  uploadRowError = 3;
                  successType = 0;
                  dateSale = null;
               }

              if(itemFila['Email Address'] == null ||  String(itemFila['Email Address']).length < 1 ){
                  uploadRowError = 2;
                  successType = 0;
                  userSale = null;
              }

               if((itemFila['Email Address'] != null)){
                  let userSaleToFind = await useSelection.findByEmail(String(itemFila['Email Address']));
                  findPosInUser = await findPosEmployee.findByUserId(userSaleToFind.id);
                  getIdCompany = await findPos.findOne(findPosInUser.posId);
                  let getFiscalPeriod = await findFiscalPerid.findByCompany(getIdCompany.companyId);
                  let getQuarter = await findQuarter.findRuleByQuarterFiscal(getFiscalPeriod.id);


                  findRuleInter      = await findRule.findByQuarter(getQuarter.id);
                  digipointSave      = ( parseFloat(itemFila['Revenue USD']) * findRuleInter.digipointsPerAmount) / findRuleInter.baseAmount;
                  approuch           = Math.round(digipointSave);


                  getPosId = findPosInUser.posId;
                  dateSale = salesFullDate;
                  userSale = userSaleToFind.id;
                  uploadRowError = null;


               }

             const saleInvoiceSave =  await serviceSales.create({
                  posId: getPosId,
                  productId: findProd.id,
                  employAssignedId:userSale,
                  totalPoints:approuch,
                  pendingPoints:approuch,
                  assignedPoints:0,
                  saleDates:dateSale.toString(),
                  pointsLoadDates:nowDate.toString(),
                  pointsAssignedDates:null,
                  fileUploadId:registerFile.id,
                  uploadSuccess:successType,
                  invoiceNumber: itemFila['INVOICE'],
                  saleAmount: itemFila['Revenue USD'],
                  errorId:uploadRowError
                });
                console.log("🚀 ~ file: process-document.service.js:80 ~ ProcessDocumentService ~ converAndSaveFile ~ saleInvoiceSave", saleInvoiceSave)
                           //let dateExplodeToFormat = dateRead

          }

        return path;


    } catch (error) {
        throw boom.notFound('Somethig wront -> '+error);
    }


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

    return year+'-'+dateMonth+'-'+dateDay+' 00:00:00.000';


  }




}



module.exports = ProcessDocumentService;
