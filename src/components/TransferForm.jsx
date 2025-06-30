import React, { use, useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { setTransfer, setTransaction, setBorrow } from "../store/userSlice";

export default function TransferForm(){
    const [payor, setPayor] = useState("")
    const [amount, setAmount] = useState(0)
    const dispatch =useDispatch()
    const currUsers = useSelector(state => state.userData)

    const getTransfer = (e)=>{
        e.preventDefault()
        let getSplice = document.getElementsByName("spliceUsers")
        let user = [payor]
        let splitUser =[]
        let totalSplits = 0
        for(let i=0; i<getSplice.length; i++){
            if(getSplice[i].checked){
                splitUser.push(getSplice[i].value)
                totalSplits+=1
            }
        }
        user.push(splitUser)
        user.push(amount)
        user.push(totalSplits)
        
        dispatch(setTransaction(user))
        dispatch(setBorrow())
        dispatch(setTransfer())
        
        setPayor("")
        setAmount("")
    }
    return(
        <div className="formBox">
            <h3 className="formHeading">Transfer Form</h3>
            <form className="userForm" onSubmit={getTransfer}>
                <label className="formLabel">Payor</label>
                <input className="formInput" required value={payor} onChange={(e)=>setPayor(e.target.value)} maxLength={20} placeholder="Jhon Brayan"></input>
                <label className="formLabel">Splites</label>
                <div className="splites">
                    {
                        currUsers.map((user)=>((user.userName === payor)? null:
                            <div key={user.userId} className="spliteItems">
                                <input name="spliceUsers" className="fromCheckBox" type="checkbox" value={user.userName}></input>
                                <label className="checkBoxItem">{user.userName}</label>
                            </div>
                        ))
                    }
                </div>
                <label className="formLabel">Amount</label>
                <input className="formInput" required value={amount} onChange={(e)=>setAmount(e.target.value)} type="number" placeholder="12000 (currency consider in rupees)"></input>
                <button className="formButton" type="submit">submit</button>
            </form>
        </div>
    )
}