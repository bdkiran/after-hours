import React from 'react'
import {useAuth} from './auth-context'

const UserContext = React.createContext()

function UserProvider(props) {
  console.log("useprovider called")
  var { data: {user}} = useAuth()
  console.log(user);
  return <UserContext.Provider value={user} {...props} />
}

function useUser() {
  console.log("useUser called")
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`)
  }
  return context
}

export {UserProvider, useUser }