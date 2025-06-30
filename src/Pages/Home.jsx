import React from "react";
import {UserForm, UserList, UserDetails} from "../components/index";
import { useSelector} from "react-redux";
export default function Home(){
    const Data = useSelector(state =>state.userData)
    return(
        <div>
            <UserForm/>
            <div className="userListBox">
                <h1 className="formHeading">UserList</h1>
            {
                Data.map((user)=>(
                    <div key={user.userId}>
                        <UserList username={user.userName}/>
                    </div>
                ))
            }
            </div>
            <UserDetails/>
        </div>
    )
}