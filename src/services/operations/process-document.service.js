const boom  = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4} = require('uuid');
const Excel = require('exceljs');
const XLSX = require('xlsx');



class ProcessDocumentService{

  async converAndSaveFile(bodyData){

    try {

        // let data = [];
        //read from a file
        //let workbook = new Excel.workbook();
        // get file extension
        const fileExtension = path.parse(bodyData.fileName).ext;

        //convert b64 to binary
        const binaryData = Buffer.from(bodyData.base64String, 'base64');

        const getStringName = uuidv4();
        const setNewName = getStringName+fileExtension;



        await fs.promises.writeFile(__dirname +"/../../assets/uploads/"+setNewName,
                         binaryData);


        //const pathData = __dirname +"/../../assets/uploads/"+setNewName;
        const pathData = __dirname +"/../../assets/uploads/a5d973eb-8fd2-47ee-a482-469370cbbb0e.xlsx";

        //const processExcel = this.parseAndSave(pathData);

        const workbook = XLSX.readFile(pathData)

        const  workbookSheets = workbook.SheetNames;
        const  sheets = workbookSheets[0];
        const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheets]);
        console.log( dataExcel )


        for(const itemFila of dataExcel){

            //var number = 44839;
            var number = itemFila['DATE'];

            var dateN = new Date((number - (25567 + 2)) * 86400 * 1000);

            //let dateExplodeToFormat = dateRead

            console.log( dateN)
        }






        console.log(sheets)


        return pathData;


    } catch (error) {
        throw boom.notFound('Somethig wront '+error);
    }


}


/* async parseAndSave(pathDocument){

  try {







    console.log(data)

    return true

  } catch (error) {
      throw boom.notAcceptable('No is document processble');
  }


} */





}



module.exports = ProcessDocumentService;
