const boom  = require('@hapi/boom');
const sequelize = require('./../../libs/sequelize');

const { models } = require('./../../libs/sequelize');


class ReporterService{

  constructor(){
    // construct
  }

  async  getPointsNoAssign(){


    const salesReporter = await models.Sales.findAll( {
        include:[
            'employAssigned'
        ],
        where:{
          assignedPoints:0
        },

    });
    if(!salesReporter){
      throw boom.notFound('Sale not found');
    }

    return salesReporter;
  }




  async  getPointsAssign(){
    const { Op } = require("sequelize");

    const salesReporter = await models.Sales.findAll( {
        include:[{
          model: models.User,
          as: 'employAssigned'

        }],
        where:{
          assignedPoints: {[Op.gt]:0}
        }

    });
    if(!salesReporter){
      throw boom.notFound('Sale not found');
    }

    return salesReporter;
  }


  async getDigipointsPending(type, country){
    let types = type;
    let countryId = country;
    switch (parseInt(types)) {
      case 1:
          types = '=';
      break;
      case 2:
        types = '>';
      break;
      default:
          types = '!=';
      break;
    }

    if(parseInt(countryId) == 0){
      countryId = 1
    }

      const query = `select empColl.employ_id, compa."name" as company,
      os."name" as status , cou."name" as country  , concat(pe.names, ' ', pe.last_name ) as user_assig,
      sum(empColl.points_assigned) as poins_assig,
      sum(empColl.points_redeemed) as redeem, rol."name" as role
  from employee_points_collects empColl
  inner join people pe on pe.user_id = empColl.employ_id
  inner join employee_pos ep on ep.employee_id = empColl.employ_id
  inner join points_of_sales pos on pos.id = ep.pos_id
  inner join companies compa on compa.id = pos.company_id
  inner join users us on us.id  = empcoll.employ_id
  inner join roles rol on rol.id = us.role_id
  inner join countries cou on cou.id = pos.country_id
  inner join operation_statuses os on os.id = empColl.status_id
  where empColl.points_redeemed  ${types} 0 and cou.id = ${countryId} group by empColl.employ_id,
        empColl.status_id, pe.names, pe.last_name, os."name", compa."name", rol."name", cou.name`;

//console.log(query);
     try {

          const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
          return result;

      } catch (error) {
        throw boom.notFound('No longer data to show: ',error);
      }
  }

  async salesWithParams( quarter, week, saleType){
    let quarterQuery      = "sa.quarter_id = "+ parseInt(quarter);
    let weekQuery         = " and sa.week_file = "+ parseInt(week);
    let saleTypeQuery     = " and sa.sale_type = ";

    if(parseInt(saleType) == 1){
      saleTypeQuery = saleTypeQuery+'IN';
    }

    if(parseInt(saleType) == 2){
      saleTypeQuery = saleTypeQuery+'TM';
    }


    if(parseInt(quarter) == 0 ){
        quarterQuery = '';

    }
    if(parseInt(week) == 0){
      weekQuery = '';
    }

    if(parseInt(saleType) == 0){
      saleTypeQuery = '';
    }

    if(parseInt(quarter)  == 0 && parseInt(week) == 0){

      if(parseInt(saleType) == 1){
        saleTypeQuery = "sa.sale_type = 'IN'";
      }

      if(parseInt(saleType) == 2){
        saleTypeQuery = "sa.sale_type = 'TM'";
      }



    }
    if(parseInt(quarter) == 0 && parseInt(week) > 0){
      weekQuery     = "sa.week_file = "+  parseInt(week);
    }



    let querySection = quarterQuery+weekQuery+saleTypeQuery;

    console.log(saleType, saleTypeQuery);

   const query = `select pos.description, p.description, concat(pe.names, ' ', pe.last_name) names_employee, q."name", sa.week_file as week, sa.year_file from sales sa join points_of_sales pos on pos.id = sa.pos_id join products p on p.id = sa.product_id join quarters q on q.id = sa.quarter_id join people pe on pe.user_id = employ_assigned_id left join error_sales_process esp on esp.id = sa.error_id where ${querySection}`;

console.log(query);
       try {

          const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
          return result;

      } catch (error) {
        throw boom.notFound('No longer data to show ',error);
      }
  }



}

module.exports =  ReporterService;
