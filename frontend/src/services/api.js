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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create job");
  }

  return data;
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
  const token = getToken();

  const url = `${API_URL}/jobs/${id}/accept`;

  console.log("ACCEPT JOB URL:", url);

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const text = await response.text();

  console.log("STATUS:", response.status);
  console.log("CONTENT TYPE:", response.headers.get("content-type"));
  console.log("RAW RESPONSE:", text);

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      "Backend returned HTML instead of JSON. Actual response: " + text
    );
  }

  if (!response.ok) {
    throw new Error(data.message || "Failed to accept job");
  }

  return data;
};
export const updateJob = async (
  id,
  jobData
) => {

  const response = await fetch(
    `${API_URL}/jobs/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },

      body: JSON.stringify(jobData)
    }
  );

  return response.json();
};