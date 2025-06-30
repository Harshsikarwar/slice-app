import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { removeUser, getUser, displayUserData } from "../store/userSlice";
export default function UserList({username}){
    const dispatch = useDispatch()
    const [show, setShow] = useState("none")
    
    const deleteUser = (username) => {
        dispatch(removeUser(username))
    }

    const getUserData = (username) => {
        dispatch(getUser(username))
        dispatch(displayUserData())
    }
    return(
        <div className="userBox">
            <h3 className="username">{username}</h3>
            <div className="userBtnBox">
                <img onClick={()=>getUserData(username)}className="userBoxBtn" src="https://cdn-icons-png.flaticon.com/128/16769/16769575.png"></img>
                <img onClick={()=>deleteUser(username)} className="userBoxBtn" src="https://cdn-icons-png.flaticon.com/128/3917/3917411.png"></img>
            </div>
        </div>
    )
}