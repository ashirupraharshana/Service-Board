const express = require("express");

const router = express.Router();

const {
  getAllJobs,
  getJobById,
  createJob,
  acceptJob,
  updateJobStatus,
  deleteJob,
  updateJob
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

router.put(
  "/:id",
  protect,
  authorizeRoles("homeowner"),
  updateJob
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("homeowner"),
  deleteJob
);


// TRADESPERSON ROUTES
router.patch(
  "/:id/accept",
  protect,
  authorizeRoles("tradesperson"),
  acceptJob
);

router.patch(
  "/:id",
  protect,
  authorizeRoles("tradesperson"),
  updateJobStatus
);

module.exports = router;