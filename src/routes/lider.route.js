const router = require("express").Router();
const liderController = require("../controllers/lider.controller");
const { auth } = require("../utils/auth");

router.route("/MLLiderBCRCreate").post(liderController.createLider);
router.route("/MLLiderBCRLogin").post(liderController.login);
router.route("/MLLiderBCRGetLiders").get(auth, liderController.getAllLiders);
router.route("/MLLiderBCRGetLider").get(auth, liderController.getLider);

router
  .route("/MLSLiderBCRUpdateSuperLider")
  .put(auth, liderController.updateLider);
router
  .route("/MLSLiderBCRDeleteSuperLider")
  .put(auth, liderController.deleteLider);

module.exports = router;
