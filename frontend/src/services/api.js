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


export const createJob = async (jobData) => {

  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:5000/api/jobs",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },

      body: JSON.stringify(jobData)
    }
  );


  if (!response.ok) {

    const errorData = await response.json();

    throw new Error(
      errorData.message || "Failed to create job"
    );
  }

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

export const acceptJob = async (id) => {

  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5000/api/jobs/${id}/accept`,
    {
      method: "PATCH",

      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const data = await response.json();

  console.log(data);

  if (!response.ok) {

    throw new Error(data.message);
  }

  return data;
};