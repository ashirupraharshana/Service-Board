const JobRequest = require("../models/JobRequest");

// GET all jobs
const getAllJobs = async (req, res) => {
  try {
    const { category, status, search } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
  filter.title = {
    $regex: search,
    $options: "i"
  };
}

    const jobs = await JobRequest.find(filter).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET single job
const getJobById = async (req, res) => {
  try {
    const job = await JobRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE new job
const createJob = async (req, res) => {
  try {
    const job = await JobRequest.create({
  ...req.body,
  createdBy: req.user._id
});

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// UPDATE job status only
const updateJobStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const allowedStatuses = [
      "Open",
      "In Progress",
      "Closed"
    ];

    if (!allowedStatuses.includes(status)) {

      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const job = await JobRequest.findById(
      req.params.id
    );

    if (!job) {

      return res.status(404).json({
        message: "Job not found"
      });
    }

    job.status = status;

    await job.save();

    res.status(200).json(job);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

//delete job
const deleteJob = async (req, res) => {

  try {

    const job = await JobRequest.findById(req.params.id);

    if (!job) {

      return res.status(404).json({
        message: "Job not found"
      });
    }

    if (
      job.createdBy.toString() !== req.user._id.toString()
    ) {

      return res.status(403).json({
        message: "Not allowed"
      });
    }

    await job.deleteOne();

    res.json({
      message: "Job deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJobStatus,
  deleteJob
};