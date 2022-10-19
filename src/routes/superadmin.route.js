const router = require("express").Router();
const superadminController = require("../controllers/superadmin.controller");

router.route("/MLSADMINBCRCreate").post(superadminController.createSuperAdmin);
router.route("/MLSADMINBCRLogin").post(superadminController.login);

module.exports = router;
