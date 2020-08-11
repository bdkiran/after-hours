import React, { useEffect } from 'react';
import { getUserDetails } from '../../../utils/apiRequests'
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../context/auth-context"

export default function UserProfile({ user }) {

    const history = useHistory();
    const { logout } = useAuth();

    useEffect(() => {
        getUserDetails(user.id).then((res) => {
            console.log(res)
        }).catch(err => {
            //Check if there is an authroization error
            if (err.data) {
                //If so remove the user, and route to login page
                logout()
                history.push("/login")
            }
        })
    }, [user.id, history, logout]);

    //use state function to call server to get user information
    return (
        <main>
            <div>
                <h1>Profile</h1>
                <h3>Username: {user.username}</h3>
                <p>This will require aditional styling</p>
                <p>More features such as edit name, email, and password will occur here.</p>
                <p>Endpoints required by backed, change in data model for aditional features</p>
            </div>
        </main>
    )
}
