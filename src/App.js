import React from 'react';
import './App.css';
import {useUser} from './context/user-context'
import UnathenticatedApp from './components/UnathenticatedApp'
import AuthenticatedApp from './components/AuthenticatedApp'

function App() {
    const user = useUser()
    return user ? <AuthenticatedApp user={user}/> : <UnathenticatedApp />
}

export default App;
