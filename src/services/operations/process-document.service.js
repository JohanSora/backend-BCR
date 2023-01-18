const boom  = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const { v4: uuidv4} = require('uuid');
const XLSX = require('xlsx');
const CsvFileService = require('./csv-files-process.service');
const Sales = require('./sales.service.js')

const serviceDocument = new CsvFileService();
const serviceSales = new Sales();


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
            complete: (resFileSave) ? 1 : 0,
            pathSrc:pathData,
            operationStatusId: 2
          });

          const workbook = XLSX.readFile(pathData)
          const  workbookSheets = workbook.SheetNames;
          const  sheets = workbookSheets[0];
          const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheets]);
         // console.log( dataExcel )

          let count = 0;
          for(const itemFila of dataExcel){
              const serviceSales = new Sales();
               count = count +1;
               //var number = 44839;
               const number = itemFila['DATE'];
               const dateN = new Date((number - (25567 + 2)) * 86400 * 1000);
               const salesFullDate = this.processDate(dateN,1);
               const nowDate = this.processDate(new Date(),2);

               console.log("🚀 ~ file: process-document.service.js:80 ~ ProcessDocumentService ~ converAndSaveFile ~ line truncate", count)
             const saleInvoiceSave =  await serviceSales.create({
                  productId: null,
                  employAssignedId:null,
                  totalPoints:1,
                  pendingPoints:1,
                  assignedPoints:1,
                  saleDates:salesFullDate.toString(),
                  pointsLoadDates:nowDate.toString(),
                  pointsAssignedDates:nowDate.toString(),
                  fileUploadId:registerFile.id,
                  uploadSuccess:1,
                  invoiceNumber: itemFila['INVOICE'],
                  saleAmount: itemFila['Revenue USD'],
                  errorId:null
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
