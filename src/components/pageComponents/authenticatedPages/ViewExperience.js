import React, { useEffect, useState } from "react";

import { SpinnerLoader } from "../../navigationComponents/Loader"
import { getExperience } from "../../../utils/apiRequests";
import style from "./ViewExperience.module.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../context/auth-context"

function ViewExperience(props) {
    const [experience, setExperience] = useState(null);

    //let routerLocation = useLocation();
    const experienceId = props.match.params.id

    const history = useHistory();
    const { logout } = useAuth();

    useEffect(() => {
        //Make a call to server to get experience information
        //Get the experience id from url?
        getExperience(experienceId).then(res => {
            if (!res.data) {
                return
            }
            setExperience(res.data)
        }).catch(err => {
            //Check if there is an authroization error
            if(err.data){
                //If so remove the user, and route to login page
                logout()
                history.push("/login")
            }
        })
    }, [experienceId, history, logout]);

    const generateExperience = () => {
        return (
            <div className={style.expContainer}>
                <div className={style.photoSection}>
                </div>
                <div className={style.titleSection}>
                    <h1>{experience.name}</h1>
                    <button>
                        <Link to={{
                            pathname: "/experience/edit/" + experience.id,
                            state: { experience: experience }
                        }}
                        >
                            Edit Experience
                    </Link>
                    </button>
                </div>
                <div className={style.detailsSection}>
                    <h3>{experience.time}</h3>
                    <h3>{experience.location}</h3>
                    <h3>{experience.description}</h3>
                </div>
            </div>
        )
    }

    const noExp = () => {
        return <SpinnerLoader />
    }

    return (
        <main>
            <div className={style.mainContent}>
                <div className={style.sideFill} />
                {experience === null ? noExp() : generateExperience()}
                <div className={style.sideFill} />
            </div>
        </main>
    )
}

export default ViewExperience;