const API_URL = process.env.NEXT_PUBLIC_API_URL;


// GET TOKEN
const getToken = () => {

  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }

  return null;
};


// REGISTER
export const registerUser = async (userData) => {

  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }
  );

  return response.json();
};


// LOGIN
export const loginUser = async (userData) => {

  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }
  );

  return response.json();
};


// GET JOBS
export const getJobs = async (
  category = "",
  search = ""
) => {

  let url = `${API_URL}/jobs?`;

  if (category) {
    url += `category=${category}&`;
  }

  if (search) {
    url += `search=${search}`;
  }

  const response = await fetch(url);

  return response.json();
};


// GET SINGLE JOB
export const getJobById = async (id) => {

  const response = await fetch(
    `${API_URL}/jobs/${id}`
  );

  return response.json();
};


// CREATE JOB
export const createJob = async (jobData) => {

  const response = await fetch(
    `${API_URL}/jobs`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },

      body: JSON.stringify(jobData)
    }
  );

  return response.json();
};


// UPDATE STATUS
export const updateJobStatus = async (
  id,
  status
) => {

  const response = await fetch(
    `${API_URL}/jobs/${id}`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },

      body: JSON.stringify({ status })
    }
  );

  return response.json();
};


// DELETE JOB
export const deleteJob = async (id) => {

  const response = await fetch(
    `${API_URL}/jobs/${id}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );

  return response.json();
};