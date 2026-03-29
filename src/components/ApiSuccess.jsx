import { useState } from "react";
import "./component.css";

export function ApiSuccessMessage({message, setMessage}) {

    const Close = () => {
        setMessage("")
    }

    return (
        <>
        {message && (
        <div className="ApiSuccessMsg">
            <h3>{message}</h3>
            <button 
            type="button"
            onClick={Close}
            >
                Ok
            </button>
        </div>
        )}
        </>
    )
}