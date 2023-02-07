const boom  = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4} = require('uuid');
const CsvFileService = require('./csv-files-process.service');



const serviceDocument   = new CsvFileService();



class ProcessDocumentService{

  async converAndSaveFile(bodyData){

    try {


        const fileExtension = path.parse(bodyData.fileName).ext;

        const originalFileName = path.parse(bodyData.fileName).name;

        //convert b64 to binary
        const binaryData = Buffer.from(bodyData.base64String, 'base64');

        const getStringName = uuidv4();
        const setNewName = getStringName+'-'+originalFileName+fileExtension;
        const nowDate           = new Date();



        await fs.promises.writeFile(__dirname +"/../../assets/uploads/"+setNewName,
                         binaryData);

        const dirNameString = __dirname+"/../..";
        const pathData      = dirNameString+"/assets/uploads/"+setNewName;

        const registerFile = await serviceDocument.create({
            nameUuid: getStringName+'-'+originalFileName,
            extension: fileExtension,
            complete: 1,
            pathSrc:pathData,
            operationStatusId: 2,
            UpdatedAt:nowDate,
          });

        return registerFile;

    } catch (error) {
        throw boom.notFound('Somethig wront -> '+error);
    }


}











}



module.exports = ProcessDocumentService;
