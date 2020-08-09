import React, {useEffect} from 'react';
import {getUserDetails} from '../../../utils/apiRequests'

export default function UserProfile({user}) {
    useEffect(() => {
        getUserDetails(user.id).then((res) => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }, [user.id]);

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
