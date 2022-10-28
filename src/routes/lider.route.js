const router = require("express").Router();
const liderController = require("../controllers/lider.controller");
const { authLider } = require("../utils/authLider");

router.route("/MLLiderBCRCreate").post(liderController.createLider);
router.route("/MLLiderBCRLogin").post(liderController.login);
router
  .route("/MLLiderBCRGetLiders")
  .get(authLider, liderController.getAllLiders);
router.route("/MLLiderBCRGetLider").get(authLider, liderController.getLider);

router
  .route("/MLSLiderBCRUpdateSuperLider")
  .put(authLider, liderController.updateLider);
router
  .route("/MLSLiderBCRDeleteSuperLider")
  .put(authLider, liderController.deleteLider);

module.exports = router;
