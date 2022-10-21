const router = require("express").Router();
const superadminController = require("../controllers/superadmin.controller");
const { auth } = require("../utils/auth");

router.route("/MLSADMINBCRCreate").post(superadminController.createSuperAdmin);
router.route("/MLSADMINBCRLogin").post(superadminController.login);
router
  .route("/MLSADMINBCRGetSuperAdmins")
  .get(auth, superadminController.getAllSuperAdmins);
router
  .route("/MLSADMINBCRGetSuperAdmin")
  .get(auth, superadminController.getSuperAdmin);

router
  .route("/MLSADMINBCRUpdateSuperAdmin")
  .put(auth, superadminController.updateSuperAdmin);
router
  .route("/MLSADMINBCRDeleteSuperAdmin")
  .put(auth, superadminController.deleteSuperAdmin);

module.exports = router;
