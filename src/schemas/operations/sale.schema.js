const Joi = require('joi');

const id                    = Joi.number().integer();
const posId                 = Joi.number().integer();
const productId             = Joi.number().integer();
const employAssignedId      = Joi.number().integer();
const totalPoints           = Joi.number().integer();
const pendingPoints         = Joi.number().integer();
const assignedPoints        = Joi.number().integer();
const saleDates             = Joi.date();
const pointsLoadDates       = Joi.date();
const pointsAssignedDates   = Joi.date();
const fileUploadId          = Joi.number().integer();
const yearInFile            = Joi.number().integer();
const weekInFile            = Joi.number().integer();
const quarterId             = Joi.number().integer();;
const uploadSuccess         = Joi.boolean();
const invoiceNumber         = Joi.string();
const saleAmount            = Joi.number().positive().precision(2);
const errorId               = Joi.number().integer();
const saleType              = Joi.string();
const salesNote             = Joi.string();




const updateSaleSchema = Joi.object({
  posId: posId              ,
  productId: productId          ,
  employAssignedId: employAssignedId   ,
  totalPoints: totalPoints        ,
  pendingPoints: pendingPoints      ,
  assignedPoints: assignedPoints     ,
  saleDates: saleDates          ,
  pointsLoadDates: pointsLoadDates    ,
  pointsAssignedDates: pointsAssignedDates,
  fileUploadId: fileUploadId       ,
  yearInFile: yearInFile         ,
  weekInFile: weekInFile         ,
  quarterId: quarterId          ,
  uploadSuccess: uploadSuccess      ,
  invoiceNumber: invoiceNumber      ,
  saleAmount: saleAmount         ,
  errorId: errorId            ,
  saleType: saleType           ,
  salesNote: salesNote
});


const getSaleSchema = Joi.object({
  id:id.required()
})

module.exports = { updateSaleSchema, getSaleSchema };
