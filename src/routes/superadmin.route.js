const router = require("express").Router();
const superadminController = require("../controllers/superadmin.controller");
const { authSuperadmin } = require("../utils/authSuperadmin");

router.route("/MLSADMINBCRCreate").post(superadminController.createSuperAdmin);
router.route("/MLSADMINBCRLogin").post(superadminController.login);
router
  .route("/MLSADMINBCRGetSuperAdmins")
  .get(authSuperadmin, superadminController.getAllSuperAdmins);
router
  .route("/MLSADMINBCRGetSuperAdmin")
  .get(authSuperadmin, superadminController.getSuperAdmin);

router
  .route("/MLSADMINBCRUpdateSuperAdmin")
  .put(authSuperadmin, superadminController.updateSuperAdmin);
router
  .route("/MLSADMINBCRDeleteSuperAdmin")
  .put(authSuperadmin, superadminController.deleteSuperAdmin);

module.exports = router;
