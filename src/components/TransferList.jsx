import React from "react";
import { useSelector } from "react-redux";
export default function TransferList(){
    const transData = useSelector(state=>state.transferData)
    return(
        <>
        {
            transData.map((data)=>(
                <div key={data.transactionId} className="transferList">
                    <div className="PayorBox">
                        <p className="transferListLabel">Payor</p>
                        <b className="payorName">{data.payor}</b>
                    </div>
                    <div className="timeBox">
                        <p className="transferListLabel">time</p>
                        <b className="time">{data.time.slice(16,24)}</b>
                    </div>
                    <div className="amountBox">
                        <p className="transferListLabel">Amount</p>
                        <b className="amount">{(data.amount)}</b>
                    </div>
                    <div className="splitBox">
                        <p className="transferListLabel">Splits</p>
                        <div className="splitsNameBox">
                            {data.splits.map((item)=>(
                                <p key={item} className="splitsName">{item}</p>
                            ))}
                            {(data.payorInSplit != true)? null : 
                            <p className="splitsName">{data.payor}</p>}
                        </div>
                    </div>
                </div>
            ))
        }
        </>
    )
}