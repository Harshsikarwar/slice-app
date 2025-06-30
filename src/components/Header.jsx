import React from "react";
import { useNavigate } from "react-router";

export default function Header(){
    const navigate = useNavigate()
    return(
        <div className="Header">
            <h1 className="title">Slice</h1>
            <ul className="navBox">
                <li className="navItems" onClick={()=>navigate("/")}>Users</li>
                <li className="navItems" onClick={()=>navigate("/transfer")}>Transfers</li>
            </ul>
        </div>
    )
}