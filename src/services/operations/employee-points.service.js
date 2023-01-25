const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class EmployeePointsCollectService{

  constructor(){
    // construct
  }

  async create(data){
    const newEmployeePointCollect = await models.EmployeePointsCollect.create(data);
    return newEmployeePointCollect;
  }


  async createBySalesId(data){
    try{

      const saleById          = await models.Sales.findByPk(data.saleId);
      const pointsToAssign    = data.pointsAssigned;
      const respOperation     =  (parseInt(saleById.pendingPoints) - parseInt(pointsToAssign));
      const nowDate           = new Date();
      const userIdReceiving   = data.userAssignedId;

      console.log("points to assign", pointsToAssign);

     if(respOperation > 0){
              //
      await models.EmployeePointsCollect.create({
        employeeId:         data.employeeId,
        status:             true,
        pointsAssigned:     pointsToAssign,
        pointsRedeemed:     0,
        pointsAssignedDate: nowDate,
        userAssignedId:     userIdReceiving,
        saleId:             data.saleId,
        saleAssigned:       true
      });
      const resp = (await saleById).update({
        pendingPoints: respOperation,
        assignedPoints: parseInt(saleById.assignedPoints) + parseInt(pointsToAssign),
        pointsAssignedDate: nowDate,
      });

        return resp;

      }else{
        throw boom.conflict('Digipoints for sale are insufficient to be allocated or the information does not have the required format ');
      }

    }catch(error){
      throw boom.badData('Somethig wront -> '+error);
    }

  }

  async find(){

    const EmployeePointCollect = await models.EmployeePointsCollect.findAll();

    return EmployeePointCollect;
  }

  async findOne(id){

    const EmployeePointCollect = await models.EmployeePointsCollect.findByPk(id);
    if(!EmployeePointCollect){
     throw boom.notFound('Eployee points collect not found');
    }
    return EmployeePointCollect;
  }

  async update(id, changes){
     const EmployeePointsCollect = this.findOne(id);
     const resp = (await EmployeePointsCollect).update(changes);

     return resp;
  }

  async delete(id){
    const EmployeePointsCollect = this.findOne(id);
    (await EmployeePointsCollect).destroy();

    return {id};
  }


}

module.exports =  EmployeePointsCollectService;
