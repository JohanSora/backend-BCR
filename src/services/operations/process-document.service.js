const boom  = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4} = require('uuid');


class ProcessDocumentService{

  async converAndSaveFile(data){

    try {

        // get file extension
        const fileExtension = path.parse(data.fileName).ext;

        //convert b64 to binary
        const binaryData = Buffer.from(data.base64String, 'base64');

        const getStringName = uuidv4();
        const setNewName = getStringName+fileExtension;


        await fs.promises.writeFile(__dirname +"/../../assets/uploads/"+setNewName,
                         binaryData);

        return true;

    } catch (error) {
        throw boom.notFound('Somethig wront '+error);
    }


}





}



module.exports = ProcessDocumentService;
