import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { displayUserData } from "../store/userSlice";

export default function UserDetails(){
    const Data = useSelector(state =>state.singleUserData)
    const dispatch = useDispatch()
    const closeUserData = ()=>{
        dispatch(displayUserData())
    }
    
    return(
        <div id="userDetailBox" className="userDetailBox">
            <h2 className="userDetailName">User Details - {Data[0].userName}</h2>
            <div className="userDetailSubBox">
                <h3 className="userDetailTitle">Borrow</h3>
                {
                    Data[0]["borrow"].map((user)=>(
                        <div key={user.userName} className="userSubDetail">
                            <p className="userDetailOther">{user.userName} : {user.amount}</p>
                        </div>
                    ))
                }
            </div>
            <div className="userDetailSubBox">
                <h3 className="userDetailTitle">Transfer</h3>
                {
                    Data[0]["transfer"].map((user)=>(
                        <div key={user.userName} className="userSubDetail">
                            <p className="userDetailOther">{user.userName} : {user.amount}</p>
                        </div>
                    ))
                }
            </div>
            <button className="closeBtn" onClick={()=>closeUserData()}>Close</button>
        </div>
    )
}