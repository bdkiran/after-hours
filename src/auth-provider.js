const localStorageKey = "_auth-token_";

//Created to allow for the hls authentication
function getTokenSync() {
  return window.localStorage.getItem(localStorageKey);
}

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse(response) {
  if(response.data.token){
    window.localStorage.setItem(localStorageKey, response.data.token);
  }
  return {username: response.data.username, id: response.data.id};
}

function login({ username, password }) {
  return client("login", { username, password }).then(handleUserResponse);
}

function register({ username, password }) {
  return client("register", { username, password }).then(handleUserResponse);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}
const authURL = process.env.REACT_APP_DAYGER;

async function client(endpoint, data) {
  const config = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
  }

  return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

/* refresh route not sure if this is the appropriate place */
async function refresh() {
  const token =  await getToken();
  clientGet("refresh", token).then(handleUserResponse).catch(() => {});
}

/* bootstrap using token user info can get resent back to client, not sure if this is the appropriate place for this info */
function bootstrap(token) {
  //const token = getToken();
  return clientGet("bootstrap", token).then(handleUserResponse);
  
}

/* This is to be used by the bootstrap and refresh functions */
async function clientGet(endpoint, token) {
  let bearerTokenString = 'Bearer ' + token
  const config = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', 'Authorization': bearerTokenString }
  }

  //set local storage to new token
  //remove local stored token on failure
  return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {getTokenSync, getToken, login, register, logout, bootstrap, refresh}