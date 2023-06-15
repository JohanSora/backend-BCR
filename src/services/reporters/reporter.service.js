const boom = require('@hapi/boom');
const sequelize = require('./../../libs/sequelize');

const { models } = require('./../../libs/sequelize');


class ReporterService {

  constructor() {
    // construct
  }

  async getPointsNoAssign() {


    const salesReporter = await models.Sales.findAll({
      include: [{
        model: models.User,
        as: 'employAssigned',
        attributes: { exclude: ['password'] },
      }],
      where: {
        assignedPoints: 0
      },

    });
    if (!salesReporter) {
      throw boom.notFound('Sale not found');
    }

    return salesReporter;
  }


  async getResumenByUser(emailuser) {
    const query = `SELECT 
      SUM(CASE WHEN epc.promotion = false AND epc.behavior = false THEN epc.points_assigned ELSE 0 END) AS behavior_points,
      SUM(CASE WHEN epc.promotion = false AND epc.behavior = true THEN epc.points_assigned ELSE 0 END) AS behavior_points,
      SUM(CASE WHEN epc.promotion = true AND epc.behavior = false THEN epc.points_assigned ELSE 0 END) AS promo_points
    FROM
      employee_points_collects epc
    JOIN
      users u ON epc.employ_id = u.id
      WHERE employ_id = '${emailuser}';`;
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }

  async getPointsAssign() {
    const query = `SELECT s.sale_date, s.quarter_id, s.week_file, s.employ_assigned_id, u.email, s.invoice_number,
    s.product_id, p.description,s.sale_type, s.sales_amount, s.assigned_points
    FROM sales s
    JOIN users u ON s.employ_assigned_id = u.id
    JOIN products p ON s.product_id = p.id
    WHERE s.error_id IS null and sales_amount != 0
    ORDER BY s.sale_date DESC;`;
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }

  async getPointsAssignByUser(emailuser) {
    const query = `SELECT s.sale_date, s.quarter_id, s.week_file, s.employ_assigned_id, u.email, s.invoice_number,
    s.product_id, p.description,s.sale_type, s.sales_amount, s.assigned_points
    FROM sales s
    JOIN users u ON s.employ_assigned_id = u.id
    JOIN products p ON s.product_id = p.id
    WHERE s.error_id IS null and sales_amount > 0 AND employ_assigned_id  = '${emailuser}'
    ORDER BY s.sale_date DESC;`;
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }


  async getSalesByWeekAndStype() {
    const query = `SELECT 
    'Semana ' || CAST(week_file as varchar) as Semana,
    SUM(CASE WHEN sale_type = 'TM' THEN sales_amount ELSE 0 END) as CCT,
    SUM(CASE WHEN sale_type = 'IN' THEN sales_amount ELSE 0 END) as CCI
    FROM sales
    WHERE week_file IS NOT null and quarter_id = 2
    GROUP BY week_file
    ORDER BY week_file;`;
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }

  async getDigiByPromoPerUser() {
    const query = `select
	epc.employ_id,
	u.name,
	u.email,
	u.role_id,
	r.name as rol_name,
	epc.points_assigned,
	epc.reason_assign,
	epc.promotion
FROM employee_points_collects epc 
LEFT JOIN users u ON epc.employ_id = u.id
LEFT JOIN roles r on u.role_id = r.id
WHERE epc.promotion = true
GROUP BY epc.employ_id,
	u.name,
	u.email,
	u.name,
	u.role_id,
	r.name,
	u.id,
	epc.points_assigned,
	epc.reason_assign,
	epc.promotion
ORDER BY 
	u.email;`;
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }


  async getDigiByPromo() {
    const query = `select
    epc.reason_assign,
    sum(epc.points_assigned)
  FROM employee_points_collects epc
  WHERE epc.promotion = true
  GROUP BY epc.reason_assign
  ORDER BY 
    epc.reason_assign;`;
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }

  async getDigiByBehaPerUser() {
    const query = `select
    epc.employ_id,
    u.name,
    u.email,
    u.role_id,
    r.name as rol_name,
    epc.points_assigned,
    epc.reason_assign,
    epc.behavior
  FROM employee_points_collects epc 
  LEFT JOIN users u ON epc.employ_id = u.id
  LEFT JOIN roles r on u.role_id = r.id
  WHERE epc.behavior = true
  GROUP BY epc.employ_id,
    u.name,
    u.email,
    u.name,
    u.role_id,
    r.name,
    u.id,
    epc.points_assigned,
    epc.reason_assign,
    epc.behavior
  ORDER BY 
    u.email;`;
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }


  async getDigiByBeha() {
    const query = `select
    epc.reason_assign,
    sum(epc.points_assigned)
  FROM employee_points_collects epc
  WHERE epc.behavior = true
  GROUP BY epc.reason_assign
  ORDER BY 
    epc.reason_assign;`;
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }

  async getSalesBySegment() {
    const query = `SELECT 
    sale_type, 
    market_segment, 
    ROUND(SUM(sales_amount), 2) AS total_sales
FROM 
    sales
WHERE 
    sale_type IN ('TM', 'IN') AND 
    market_segment IN ('COMMERCIAL', 'EDUCATION')
    and quarter_id = 2
GROUP BY 
    sale_type, 
    market_segment
ORDER BY 
    sale_type desc;`;
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }

  async getUsersPolicyAll() {
    const query = `SELECT u.id, u.name, u.email, u.role_id, roles."name" as role_name, u.created_at, u.region
    FROM users as u
    JOIN roles ON role_id = roles.id
    WHERE policy = false
    order by u.name;`;
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }

  async getDigiStatus() {
    const query = `SELECT
	epc.employ_id,
	u.name,
	u.email,
	u.role_id,
	r.name as rol_name,
	SUM(CASE WHEN epc.behavior = false AND epc.promotion = false THEN epc.points_assigned ELSE 0 END) AS ventas,
	SUM(CASE WHEN epc.behavior = true THEN epc.points_assigned ELSE 0 END) AS behavior,
  SUM(CASE WHEN epc.promotion  = true THEN epc.points_assigned ELSE 0 END) AS promociones,
	SUM(epc.points_assigned) AS tpuntos,
	(SELECT COALESCE(SUM(oc.digipoint_substract), 0) FROM order_carts oc WHERE oc.employee_id = u.id) AS redimidos,
	SUM(epc.points_assigned) - (SELECT COALESCE(SUM(oc.digipoint_substract), 0) FROM order_carts oc WHERE oc.employee_id = u.id) AS puntos_disponibles
FROM
	employee_points_collects epc
	LEFT JOIN users u ON epc.employ_id = u.id
	LEFT JOIN roles r on u.role_id = r.id
GROUP BY
	epc.employ_id,
	u.name,
	u.email,
	u.name,
	u.role_id,
	r.name,
	u.id
ORDER BY
	u.email ASC;`;
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }

  async getRedeemAll() {
    const query = `SELECT order_carts.id, order_carts.employee_id as employeeId, users.name, users.email, users.role_id, roles.name AS role_name, order_carts.order_number as orderNumber, order_carts.product_object AS productsObject, operation_statuses.name AS status_name,  operation_statuses.id AS operationStatusId, order_carts.digipoint_substract, order_carts.created_at
    FROM order_carts
    JOIN users ON order_carts.employee_id = users.id
    JOIN roles ON users.role_id = roles.id
    JOIN operation_statuses ON order_carts.status_id = operation_statuses.id
    order by order_carts.created_at DESC;`;
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }

  async getDigipointsPendingAll(type, country) {
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


    if (parseInt(countryId) == 0) {
      countryId = 1
    }

    const query = `SELECT empColl.employ_id AS employ_assigned_id,
    ROW_NUMBER() OVER (ORDER BY COALESCE(total_sales_amount, 0) DESC) AS ranking,
    compa."name" AS company,
    os."name" AS status,
    cou."name" AS country,
    CONCAT(pe.names, ' ', pe.last_name) AS user_assig,
    us.email,
    us.region,
    SUM(empColl.points_assigned) AS poins_assig,
    SUM(empColl.points_redeemed) AS redeem,
    rol."name" AS role,
    sales.total_sales_amount
FROM employee_points_collects empColl
INNER JOIN people pe ON pe.user_id = empColl.employ_id
INNER JOIN employee_pos ep ON ep.employee_id = empColl.employ_id
INNER JOIN points_of_sales pos ON pos.id = ep.pos_id
INNER JOIN companies compa ON compa.id = pos.company_id
INNER JOIN users us ON us.id = empColl.employ_id
INNER JOIN roles rol ON rol.id = us.role_id
INNER JOIN countries cou ON cou.id = pos.country_id
INNER JOIN operation_statuses os ON os.id = empColl.status_id
LEFT JOIN (
    SELECT employ_assigned_id, SUM(sales_amount) AS total_sales_amount
    FROM sales
    GROUP BY employ_assigned_id
) sales ON sales.employ_assigned_id = empColl.employ_id
WHERE empColl.points_redeemed ${types} 0 AND cou.id = ${countryId}
GROUP BY empColl.employ_id, empColl.status_id, pe.names, pe.last_name, os."name", compa."name", rol."name", cou.name, us.email, us.region, sales.total_sales_amount
ORDER BY COALESCE(sales.total_sales_amount, 0) DESC, ranking ASC;`;
    //console.log(query);
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }

  async getDigipointsPending(type, country, userEmployee) {
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


    if (parseInt(countryId) == 0) {
      countryId = 1
    }

    const query = `
    select epc.employ_id , comp.name as company_name, coun.name as country_name, rol."name"  as role_assigned,
    sum(epc.points_assigned) as assigned_points,
    (select sum(order_carts.digipoint_substract) as digi_cart from order_carts where order_carts.employee_id = ${userEmployee}) as cart_points
    from employee_points_collects epc
    inner join employee_pos epos on epos.employee_id  =  ${userEmployee}
    inner join points_of_sales pos on pos.id = epos.pos_id
    inner join companies comp on comp.id = pos.company_id
    inner join countries coun on coun.id = pos.country_id
    inner join users us on us.id  = epc.employ_id
    inner join roles rol on rol.id = us.role_id
    where epc.points_assigned ${types} 0 and epc.employ_id  =  ${userEmployee} and coun.id = ${countryId}
    group by  epc.employ_id, comp.name, coun.name, rol.name`;
    //console.log(query);
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }

  async salesWithParams(quarter, week, saleType) {
    let quarterQuery = "sa.quarter_id = " + parseInt(quarter);
    let weekQuery = " and sa.week_file = " + parseInt(week);
    let saleTypeQuery = " and sa.sale_type = ";

    if (parseInt(saleType) == 1) {
      saleTypeQuery = saleTypeQuery + '\'IN\'';
    }

    if (parseInt(saleType) == 2) {
      saleTypeQuery = saleTypeQuery + '\'TM\'';
    }


    if (parseInt(quarter) == 0) {
      quarterQuery = '';

    }
    if (parseInt(week) == 0) {
      weekQuery = '';
    }

    if (parseInt(saleType) == 0) {
      saleTypeQuery = '';
    }

    if (parseInt(quarter) == 0 && parseInt(week) == 0) {

      if (parseInt(saleType) == 1) {
        saleTypeQuery = "sa.sale_type = 'IN'";
      }

      if (parseInt(saleType) == 2) {
        saleTypeQuery = "sa.sale_type = 'TM'";
      }



    }
    if (parseInt(quarter) == 0 && parseInt(week) > 0) {
      weekQuery = "sa.week_file = " + parseInt(week);
    }



    let querySection = quarterQuery + weekQuery + saleTypeQuery;

    console.log(saleType, saleTypeQuery);

    const query = `select pos.description as pos, p.description as product, concat(pe.names, ' ', pe.last_name) names_employee, q."name", sa.week_file as week, sa.year_file, sa.sale_type from sales sa join points_of_sales pos on pos.id = sa.pos_id join products p on p.id = sa.product_id join quarters q on q.id = sa.quarter_id join people pe on pe.user_id = employ_assigned_id left join error_sales_process esp on esp.id = sa.error_id where ${querySection}`;

    console.log(query);
    try {

      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
      return result;

    } catch (error) {
      throw boom.notFound('No longer data to show ', error);
    }
  }


  async getErrorFile() {
    const { Op } = require("sequelize");

    const salesReporter = await models.Sales.findAll({
      include: [{
        model: models.User,
        as: 'employAssigned',
        attributes: { exclude: ['password'] },

      },
        'error'],
      where: {
        errorId: { [Op.ne]: null }
      }

    });
    if (!salesReporter) {
      throw boom.notFound('Not found');
    }

    return salesReporter;
  }


}

module.exports = ReporterService;
