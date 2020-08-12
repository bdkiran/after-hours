import React, { useEffect, useState, useRef } from "react";

import { SpinnerLoader } from "../../../navigationComponents/Loader"
import { getExperience } from "../../../../utils/apiRequests";
import { fetchImage } from "../../../../utils/mediaRequest";
import style from "./ViewExperience.module.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../../context/auth-context"

import { submitImage } from "../../../../utils/mediaRequest"

function ViewExperience(props) {
    const [experience, setExperience] = useState(null);
    //Maybe state is initially set to a base image
    const [experienceImage, setExperienceImage] = useState(null)
    const [editImage, setImageEdit] = useState(false)

    var fileRef = useRef(null)

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
            console.log(res.data)
            setExperience(res.data)
            return res.data.pictureUrl
        }).then(url => {
            //What happens when url is not present?
            return fetchImage(url)
        }).then(returnBlob => {
            //console.log(returnBlob)
            let objectUrl = URL.createObjectURL(returnBlob);
            setExperienceImage(objectUrl)
        }).catch(err => {
            //Check if there is an authroization error
            //Are there other error checks
            //What happens when chained together??
            if (err.data) {
                //If so remove the user, and route to login page
                logout()
                history.push("/login")
            }
        })
    }, [experienceId, history, logout]);

    //These functions share a lot of code, how can we reuse
    const fileSubmit = (e) => {
      e.preventDefault()
      console.log(fileRef.current.name)
      //Creates our form data object
      var data = new FormData()
      data.append(fileRef.current.name, fileRef.current.files[0])
      data.append("experienceId", experienceId)
      //Is user id neccesary?
      //Submits to backend
      submitImage(data).then(res => {
          setImageEdit(false)
          return res.data.filename
          //setExperienceImage(res.data.filename)
      }).then(url => {
        return fetchImage(url);
      }).then(returnBlob => {
        let objectUrl = URL.createObjectURL(returnBlob);
        setExperienceImage(objectUrl)
      })
    }

    const editImageToggle = () => {
        console.log("button pressed")
        setImageEdit(true)
    }

    const imageSection = () => {
        if (editImage) {
            return (
                <div className={style.photoSection}>
                    <form
                        onSubmit={e => fileSubmit(e)}
                    >
                        <input type="file" accept='image/*' name="myFile" ref={fileRef} />
                        <input type="submit" value="upload" />
                    </form>
                </div>
            )
        } else {
            return (
                <div className={style.photoSection}>
                    <img id={style.image} src={experienceImage} alt="Experience" />
                    <button id={style.editImageBtn} onClick={editImageToggle}> Edit</button>
                </div>
            )
        }

    }

    const generateExperience = () => {
        return (
            <div className={style.expContainer}>
                {
                    imageSection()
                }
                <div className={style.titleSection}>
                    <h1>{experience.name}</h1>
                    <div>
                        <Link className={style.editExperienceButton} to={{
                            pathname: "/experience/edit/" + experience.id,
                            state: { experience: experience }
                        }}
                        >
                            Edit Experience
                    </Link>
                    </div>
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