import React from "react";

import style from "./Loader.module.css";

function SpinnerLoader() {
    return (
        <div className={style.spinner} />
    )
}

function DotLoader() {
    return (
        <div>
            <div className={style.dotter} />
            <div className={style.dotter} />
            <div className={style.dotter} />
        </div>
    )
}

export { SpinnerLoader, DotLoader };