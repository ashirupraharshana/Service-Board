const express = require("express");

const {
  getAllJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob
} = require("../controllers/jobController");

const router = express.Router();

// GET all jobs
// POST new job
router.route("/")
  .get(getAllJobs)
  .post(createJob);

// GET single job
// PATCH update status
// DELETE job
router.route("/:id")
  .get(getJobById)
  .patch(updateJobStatus)
  .delete(deleteJob);

module.exports = router;