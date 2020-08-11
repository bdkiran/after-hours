import { getToken } from '../auth-provider';

const URL = process.env.REACT_APP_DAYGER;

async function getImage(pictureDirectory) {
    const token = await getToken()
    const bearerTokenString = 'Bearer ' + token
    const endpoint = "images/" + pictureDirectory;
    const config = {
      method: "GET",
      headers: { "Content-Type": "application/json", 'Authorization': bearerTokenString },
    };
    return mediaClient(endpoint, config);
}

async function mediaClient(endpoint, config) {
    return window.fetch(`${URL}/${endpoint}`, config).then(async (response) => {
      const data = await response.blob();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
  }

export { getImage }