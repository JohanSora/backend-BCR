const boom  = require('@hapi/boom');


const { models }                   = require('./../../libs/sequelize');
const AwardService                 = require('./../catalogs/award.service');
const EmployeePointsCollectService = require('./../operations/employee-points.service');


const awardById = new AwardService();


class RedeemAwardService{

  constructor(){
    // construct
  }

  async create(data){

    try{
            let result = 0;

          const award = await awardById.findOne(data.awardId);
          let digipoinstValidation = award.digipoints-data.digipointSubstract;
          let countResults = 0;
          let sumResults = 0;
          let dateNow = new Date();
          let newRedeemAward = '';


          if(digipoinstValidation > data.digipointSubstract){

            //result = "You do not have enough Digipoints to redeem";
            throw boom.notFound('You are not adding enough digipoints to claim the gift');
          }

        let  pointsCollect = await models.EmployeePointsCollect.findAll({
            where:{
              employeeId: data.employeeId,
              statusId:                11
            }
          });
          countResults = (await pointsCollect).length;
          if(countResults > 0){
              for(let point of pointsCollect){
                  sumResults = sumResults+point.pointsAssigned
              }

              if(sumResults > 0){

                for(let pointsTo of pointsCollect){
                      let pointsCollect = new EmployeePointsCollectService();
                      pointsCollect.update(pointsTo.id ,
                        {
                                  pointsRedeemed: pointsTo.pointsAssigned,
                                  UpdatedAt: dateNow,
                                  statusId: 12,

                                }
                      )
                }

              }

              newRedeemAward = await models.RedeemAwards.create( {
                employeeId:           data.employeeId,
                awardId:              data.awardId,
                quarterId:            data.quarterId,
                digipointSubstract:   data.digipointSubstract,
                operationStatusId:    8,
                UpdatedAt:            dateNow
              });

              result = newRedeemAward;
          }




    return result;

    }catch(error){
      throw boom.badData('Something is wrong',error);
    }


  }

  async find(){

    const RedeemAwards = await models.RedeemAwards.findAll();

    return RedeemAwards;
  }

  async findOne(id){

    const RedeemAwards = await models.RedeemAwards.findByPk(id);
    if(!RedeemAwards){
     throw boom.notFound('Redeem award not found');
    }
    return RedeemAwards;
  }

  async update(id, changes){
      const dateNow = new Date();
     const RedeemAwards = this.findOne(id);
     const resp = (await RedeemAwards).update(changes, {
      UpdatedAt:dateNow
     });

     return resp;
  }

  async delete(id){
    const RedeemAwards = this.findOne(id);
    (await RedeemAwards).destroy();

    return {id};
  }


}

module.exports =  RedeemAwardService;
