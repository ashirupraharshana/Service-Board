const express = require("express");

const router = express.Router();

const {

  getAllJobs,

  getJobById,

  createJob,

  acceptJob,

  updateJobStatus,

  deleteJob

} = require("../controllers/jobController");

const {

  protect,

  authorizeRoles

} = require("../middleware/authMiddleware");


// PUBLIC ROUTES
router.get("/", getAllJobs);

router.get("/:id", getJobById);


// HOMEOWNER ROUTES
router.post(
  "/",
  protect,
  authorizeRoles("homeowner"),
  createJob
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("homeowner"),
  deleteJob
);


// TRADESPERSON ACCEPT JOB
router.patch(
  "/:id/accept",
  protect,
  authorizeRoles("tradesperson"),
  acceptJob
);


// TRADESPERSON UPDATE STATUS
router.patch(
  "/:id",
  protect,
  authorizeRoles("tradesperson"),
  updateJobStatus
);

module.exports = router;