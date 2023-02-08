const boom  = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');
const SaleService = require('./sales.service');
const RuleService = require('./rules.service');
const saleServ = new SaleService();
const ruleServ = new RuleService();

class SpecialAssignService{

  constructor(){
    // construct
  }

  async create(data){
    //const newSale = await models.Sales.create(data);

      const processData = data;
      const employeesInclude = processData.employees;
      let newData = '';

      for(let item of employeesInclude){
          newData = await models.EmployeePointsCollect.create({
            employeeId: item,
            statusId:11,
            pointsAssigned:data.pointsAssign,
            pointsRedeemed:0,
            pointsAssignedDate: new Date(),
            userAssignedId:data.userAssignedId,
            saleAssigned:false,
            reasonAssign:data.reason,
            behavior:true,
            promotion:false
          })
      }

      return newData;


  }

  async createAssignByPromotion(data){


    const ruleAssign = await ruleServ.findByPromotion(data.quarter, data.saleType, data.week);
    const processData = data;
    const employeeIncludes = processData.employees
    let sumSale = 0;
    let newData = '';
    let sales = '';
    let affectedInvoices=[];

    if(ruleAssign == null){
      throw boom.failedDependency('There is no rule where the criteria can be applied');
    }

    if(sales == null){
      throw boom.notFound('Sale not found to apply promotion');
    }

    for(let item of employeeIncludes){
      sales = await saleServ.findSaleByUser(item);
        for(let sale of sales){
          sumSale = sumSale+sale.pendingPoints*ruleAssign.multiplier;
          affectedInvoices.push(sale.invoiceNumber)

        }

        newData = await models.EmployeePointsCollect.create({
          employeeId: item,
          statusId:11,
          pointsAssigned:sumSale,
          pointsRedeemed:0,
          pointsAssignedDate: new Date(),
          userAssignedId:data.userAssignedId,
          saleAssigned:false,
          reasonAssign:ruleAssign.reason+" invoices affected|"+affectedInvoices,
          behavior:false,
          promotion:true

        })


    }

    return newData;
  }




}

module.exports =  SpecialAssignService;
