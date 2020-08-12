import { getToken } from '../auth-provider';

const URL = process.env.REACT_APP_DAYGER;

async function fetchImage(pictureDirectory) {
    const token = await getToken()
    const bearerTokenString = 'Bearer ' + token
    const endpoint = "images/" + pictureDirectory;
    const config = {
        method: "GET",
        headers: { "Content-Type": "application/json", 'Authorization': bearerTokenString },
    };
    return imageClient(endpoint, config);
}

async function imageClient(endpoint, config) {
    return window.fetch(`${URL}/${endpoint}`, config).then(async (response) => {
        const data = await response.blob();
        if (response.ok) {
            return data;
        } else {
            return Promise.reject(data);
        }
    });
}


async function submitImage(imageFile) {
    const token = await getToken()
    const bearerTokenString = 'Bearer ' + token

    const endpoint = "imageUpload";
    const config = {
        method: "POST",
        headers: {
            //"Content-Type": "multipart/form-data",
            'Authorization': bearerTokenString
        },
        body: imageFile,
    }
    apiClient(endpoint, config)

}

//do we want a whole seperate client just becuase the responses are different??
//May be better off using the one in the apiRequest or creating one seperate file for clients
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


export { fetchImage, submitImage}