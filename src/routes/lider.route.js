const router = require("express").Router();
const liderController = require("../controllers/lider.controller");
const { authLider } = require("../utils/authLider");
const { authSuperadmin } = require("../utils/authSuperadmin");

router.route("/MLLiderBCRCreate").post(liderController.createLider);
router.route("/MLLiderBCRLogin").post(liderController.login);
router
  .route("/MLLiderFromAdminBCRLogin")
  .post(authSuperadmin, liderController.loginFromAdmin);
router
  .route("/MLLiderBCRGetLiders")
  .get(authLider, liderController.getAllLiders);
router.route("/MLLiderBCRGetLider").get(authLider, liderController.getLider);

router
  .route("/MLSLiderBCRUpdateLider")
  .put(authLider, liderController.updateLider);
router
  .route("/MLSLiderBCRDeleteLider")
  .put(authLider, liderController.deleteLider);

module.exports = router;
