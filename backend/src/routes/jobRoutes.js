const express = require("express");

const router = express.Router();

const {
  getAllJobs,
  getJobById,
  createJob,
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


// TRADESPERSON ROUTES
router.patch(
  "/:id",
  protect,
  authorizeRoles("tradesperson"),
  updateJobStatus
);

module.exports = router;