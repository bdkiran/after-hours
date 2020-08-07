import React, {useState} from "react";
import * as auth from '../auth-provider';

const AuthContext = React.createContext();

//Check if the user has a token, attempts to authenticate with token
async function bootstrapAppData() {
  let user = null
  const token = await auth.getToken()
  if(token){
    //return token;
    user = await auth.bootstrap(token)
    return user
  }
  return user;
}

function AuthProvider(props) {
  const [data, setData] = useState({user: null});

  if (!data.user) {
    bootstrapAppData().then(function(result){
      if(!result){
        return
      }
      console.log(result)
      setData({user: result})
    }).catch( err => console.log(err))
  } 
  
  const login = async(loginCreds) => {
    let thing = await auth.login(loginCreds).then(userResult => {
      setData({user: userResult});
      return true;
    }).catch( () => {
      return false;
  });
    return thing;
  };

  const register = () => {}; // register the user

  const logout = () => {
    auth.logout() // clear the token in localStorage and the user data
    setData({user: null});
  };
  
  return (
    <AuthContext.Provider
      value={{ data, login, logout, register }}
      {...props}
    />
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
