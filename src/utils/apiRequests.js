import {getToken} from '../auth-provider';

async function getUserExperiences(userId) {
  const token = await getToken()
  const bearerTokenString = 'Bearer ' + token
  const endpoint = "experience/user/" + userId;
  const config = {
    method: "GET",
    headers: { "Content-Type": "application/json", 'Authorization': bearerTokenString },
  };

  return apiClient(endpoint, config);
}

async function getExperience(expId) {
  const token = await getToken()
  const bearerTokenString = 'Bearer ' + token
  const endpoint = "experience/" + expId;
  const config = {
    method: "GET",
    headers: { "Content-Type": "application/json", 'Authorization': bearerTokenString },
  };

  return apiClient(endpoint, config);
}

async function editExperienceDetails(dataPayload) {
  const token = await getToken()
  const bearerTokenString = 'Bearer ' + token
  const endpoint = "experience";
  const config = {
    method: "PUT",
    body: JSON.stringify(dataPayload),
    headers: { "Content-Type": "application/json", 'Authorization': bearerTokenString },
  };

  return apiClient(endpoint, config);
}

async function createExperience(dataPayload) {
  const token = await getToken()
  const bearerTokenString = 'Bearer ' + token
  const endpoint = "experience";
  const config = {
    method: "POST",
    body: JSON.stringify(dataPayload),
    headers: { "Content-Type": "application/json", 'Authorization': bearerTokenString },
  };

  return apiClient(endpoint, config);
}

async function deleteExperience(expId) {
  const token = await getToken()
  const bearerTokenString = 'Bearer ' + token
  const endpoint = "experience/" + expId;
  const config = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", 'Authorization': bearerTokenString },
  };

  return apiClient(endpoint, config);
}

const URL = process.env.REACT_APP_DAYGER;

async function apiClient(endpoint, config) {
  return window.fetch(`${URL}/${endpoint}`, config).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { getUserExperiences, getExperience, editExperienceDetails, createExperience, deleteExperience };
