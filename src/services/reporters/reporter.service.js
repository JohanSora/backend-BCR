const boom  = require('@hapi/boom');
const sequelize = require('./../../libs/sequelize');

const { models } = require('./../../libs/sequelize');


class ReporterService{

  constructor(){
    // construct
  }

  async  getPointsNoAssign(){


    const salesReporter = await models.Sales.findAll( {
        include:[{
          model: models.User,
          as: 'employAssigned',
            attributes: { exclude: ['password'] },
        }],
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
          as: 'employAssigned',
          attributes: { exclude: ['password'] },

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


  async getDigipointsPending(type, country, userEmployee){
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

      const query = `
      select sa.employ_assigned_id , comp.name as company_name, coun.name as country_name, rol."name"  as role_assigned,
        sum(sa.assigned_points) as assigned_points,
        (select sum(order_carts.digipoint_substract) as digi_cart from order_carts where order_carts.employee_id = ${userEmployee}) as cart_points
      from sales sa
      inner join employee_pos epos on epos.employee_id  =  ${userEmployee}
      inner join points_of_sales pos on pos.id = epos.pos_id
      inner join companies comp on comp.id = pos.company_id
      inner join countries coun on coun.id = pos.country_id
      inner join users us on us.id  = sa.employ_assigned_id
      inner join roles rol on rol.id = us.role_id
      where sa.assigned_points > 0 and sa.employ_assigned_id  =  ${userEmployee} and coun.id = ${countryId}
      group by  sa.employ_assigned_id, comp.name, coun.name, rol.name`;
//console.log(query);
     try {

          const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
          return result;

      } catch (error) {
        throw boom.notFound('No longer data to show ',error);
      }
  }

  async salesWithParams( quarter, week, saleType){
    let quarterQuery      = "sa.quarter_id = "+ parseInt(quarter);
    let weekQuery         = " and sa.week_file = "+ parseInt(week);
    let saleTypeQuery     = " and sa.sale_type = ";

    if(parseInt(saleType) == 1){
      saleTypeQuery = saleTypeQuery+'\'IN\'';
    }

    if(parseInt(saleType) == 2){
      saleTypeQuery = saleTypeQuery+'\'TM\'';
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

   const query = `select pos.description as pos, p.description as product, concat(pe.names, ' ', pe.last_name) names_employee, q."name", sa.week_file as week, sa.year_file, sa.sale_type from sales sa join points_of_sales pos on pos.id = sa.pos_id join products p on p.id = sa.product_id join quarters q on q.id = sa.quarter_id join people pe on pe.user_id = employ_assigned_id left join error_sales_process esp on esp.id = sa.error_id where ${querySection}`;

console.log(query);
       try {

          const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
          return result;

      } catch (error) {
        throw boom.notFound('No longer data to show ',error);
      }
  }


  async  getErrorFile(){
    const { Op } = require("sequelize");

    const salesReporter = await models.Sales.findAll( {
        include:[{
          model: models.User,
          as: 'employAssigned',
          attributes: { exclude: ['password'] },

        },
      'error'],
        where:{
          errorId: {[Op.ne]: null}
        }

    });
    if(!salesReporter){
      throw boom.notFound('Not found');
    }

    return salesReporter;
  }


}

module.exports =  ReporterService;
