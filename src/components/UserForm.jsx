import React, { use, useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import { addUser } from "../store/userSlice";

export default function UserForm(){
    const [userName, setUserName] = useState("")
    const dispatch =useDispatch()

    const getUser = (e)=>{
        e.preventDefault()
        if(userName){
            dispatch(addUser(userName))
        }
        setUserName("")
    }
    return(
        <div className="formBox">
            <h3 className="formHeading">Enter User</h3>
            <form className="userForm" onSubmit={getUser}>
                <label className="formLabel">Enter User Name</label>
                <input required maxLength={20} value={userName} onChange={(e)=>setUserName(e.target.value)} className="formInput" placeholder="  Jhon Brayan" type="text"></input>
                <button className="formButton" type="submit">submit</button>
            </form>
        </div>
    )
}