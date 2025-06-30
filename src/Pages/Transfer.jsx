import React from "react";
import {TransferForm, TransferList} from "../components/index"
export default function Transfer(){
    return(
        <div>
            <TransferForm/>
            <div className="transferListBox">
                <h1 className="formHeading">Transfer History</h1>
                <TransferList/>
            </div>
        </div>
    )
}