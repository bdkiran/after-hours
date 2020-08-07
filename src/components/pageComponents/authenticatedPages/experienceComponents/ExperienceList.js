import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import { getUserExperiences } from '../../../../utils/apiRequests'

import style from "./ExperienceList.module.css"

export default function ExperienceList({ userId }) {

    const [experiences, setExperiences] = useState([])

    useEffect(() => {
        getUserExperiences(userId).then(result => {
            if (!result.data) {
                return
            }
            setExperiences(result.data)
        }).catch(err => console.log(err))
    }, [userId]);

    const history = useHistory();

    const goToExperienceDetails = (id) => {
        let path = "/experience/" + id;
        history.push(path)
    }

    const generateExperienceList = () => {
        const experienceItems = experiences.map((exp) => (
            <div className={style.experienceContainer} key={exp.id}
             onClick={() => goToExperienceDetails(exp.id)}>
                <h3>{exp.name}</h3>
                <h4>Location: {exp.location}</h4>
                <h4>Time: {exp.time}</h4>
                <p>Description: {exp.description}</p>
            </div>
        ));
        return (
            <div className={style.experienceMain}>
                {experienceItems}
            </div>
        )

    }

    const noExperiences = () => {
        return <div><h3>Create experiences. They will show up here</h3></div>
    }

    return (
        <div>
            <h1>Experiences</h1>
            <div className={style.contentContainer}>
                <div className={style.sideFill} />
                {(experiences.length > 0) ? generateExperienceList() : noExperiences()}
                <div className={style.sideFill} />
            </div>
        </div>
    )
}
