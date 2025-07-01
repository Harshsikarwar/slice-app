import { createSlice, nanoid } from "@reduxjs/toolkit";

let getData = JSON.parse(localStorage.getItem("userData"))
let getTansfer = JSON.parse(localStorage.getItem("transfers"))

const initialState = {
    userData:(getData === null)? [] : getData,
    transferData:(getTansfer === null)? [] : getTansfer,
    singleUserData:[
        {userId: "",
            userName: "",
            borrow: [{userName: "", amount: 0}],
            transfer: [{userName: "", amount: 0}],
            userId: "",
            userName: ""
        }
    ],
    userDataDisplay:"none",
}

const userSlice = createSlice({
    name:"slice",
    initialState,
    reducers:{
        addUser : (state, actions)=>{
            const Data = {
                userId:nanoid(),
                userName:actions.payload,
                borrow:[],
                transfer:[],
            }
            const validation= state.userData.find((item)=>(actions.payload === item.userName))
            if(validation){
                alert("user already exists")
                return
            }
            state.userData.push(Data)
            localStorage.setItem("userData",JSON.stringify(state.userData))
        },

        removeUser: (state, actions)=>{
            state.userData = state.userData.filter((user)=>(actions.payload != user.userName))
            localStorage.setItem("userData",JSON.stringify(state.userData))
        },

        getUser : (state, actions)=>{
            (state.singleUserData === undefined)? null : 
            state.singleUserData.pop()
            state.singleUserData.push(state.userData.find((user)=>(actions.payload === user.userName)))
            
        },

        displayUserData:(state)=>{
            const detailBox = document.getElementById("userDetailBox")
            if(state.userDataDisplay === "none"){
                state.userDataDisplay = "flex"
                detailBox.style.display = state.userDataDisplay
            }else{
                state.userDataDisplay = "none"
                detailBox.style.display = state.userDataDisplay
            }
        },

        setTransaction : (state, actions)=>{
            if(actions.payload[2] > 99999){
                alert("amount size only allow under 5 digits")
                localStorage.setItem("recentTransfer",[])
                return
            }
            if(actions.payload[3] <= 0 ){
                alert("select atlest one user for split")
                localStorage.setItem("recentTransfer",[])
                return
            }
            const userTransfer = {
                transactionId:nanoid(),
                payor : actions.payload[0],
                splits : actions.payload[1],
                amount : Number(actions.payload[2]),
                amountSplit : Math.round(Number(actions.payload[2]) / Number(actions.payload[3])),
                totalSplits : actions.payload[3],
                time : String(new Date())
            }
            const user = state.userData.find((item)=>(item.userName === actions.payload[0]))
            if(user){
                console.log("comes");
                
                state.transferData.unshift(userTransfer)
                localStorage.setItem("transfers",JSON.stringify(state.transferData))
                localStorage.setItem("recentTransfer",JSON.stringify(userTransfer))
            }
            else{
                alert("user not exist")
                localStorage.setItem("recentTransfer",[])
                return
            }
            state.transferStatus = true
        },

        setBorrow : (state, actions)=>{
            const transaction = JSON.parse(localStorage.getItem("recentTransfer"))
            if(!transaction){
                return
            }
            
            for(let i=0; i<transaction.totalSplits; i++){
                let splitValue = transaction.amountSplit
                const user = JSON.parse(localStorage.getItem("userData")).find((item)=>(transaction.splits[i] === item.userName))
                if(user.transfer){
                    const userUpdate = user.transfer.find((userTrasnfer)=>(transaction.payor === userTrasnfer.userName))
                    if(userUpdate){
                        if(userUpdate.amount >= transaction.amountSplit ){
                            userUpdate.amount-=transaction.amountSplit
                            state.userData = state.userData.filter((item)=>(item.userName != transaction.splits[i]))
                            state.userData.push(user)
                            localStorage.setItem("userData",JSON.stringify(state.userData))
                            return
                        }
                        else{
                            splitValue = transaction.amountSplit - userUpdate.amount
                            userUpdate.amount = 0
                        }
                    }
                }

                if(user.borrow){
                    const userUpdate = user.borrow.find((userTransfer)=>(userTransfer.userName === transaction.payor))
                    if(userUpdate){
                        userUpdate.amount+=splitValue
                    }
                    else{
                        const newBorrow = {
                            userName:transaction.payor,
                            amount:splitValue
                        }
                        user.borrow.push(newBorrow)
                    }
                }

                if(user.borrow === 0 || undefined){
                    user.borrow=[{
                        userName:transaction.payor,
                        amount:splitValue
                    }]
                }

                state.userData = state.userData.filter((item)=>(item.userName != transaction.splits[i]))
                state.userData.push(user)
                localStorage.setItem("userData",JSON.stringify(state.userData))
                
            }
        },

        setTransfer : (state, actions)=>{
            const transaction = JSON.parse(localStorage.getItem("recentTransfer"))
            const user = JSON.parse(localStorage.getItem("userData")).find((item)=>(transaction.payor === item.userName))
            for(let i=0; i<transaction.totalSplits; i++){
                let splitValue = transaction.amountSplit
                if(user.borrow){
                    const userUpdate = user.borrow.find((userBorrow)=>(transaction.splits[i] === userBorrow.userName))
                    if(userUpdate){
                        if(userUpdate.amount >= transaction.amountSplit ){
                            userUpdate.amount-=transaction.amountSplit
                            state.userData = state.userData.filter((item)=>(item.userName != transaction.payor))
                            state.userData.push(user)
                            localStorage.setItem("userData",JSON.stringify(state.userData))
                            return
                        }
                        else{
                            splitValue = transaction.amountSplit - userUpdate.amount
                            userUpdate.amount=0
                        }
                    }
                }

                if(user.transfer){
                    const userUpdate = user.transfer.find((userTransfer)=>(userTransfer.userName === transaction.splits[i]))
                    if(userUpdate){
                        userUpdate.amount+=splitValue
                    }
                    else{
                        const newTransfer = {
                            userName:transaction.splits[i],
                            amount:splitValue
                        }
                        user.transfer.push(newTransfer)
                    }
                }

                if(user.transfer === 0 || undefined){
                    user.transfer=[{
                        userName:transaction.splits[i],
                        amount:splitValue
                    }]
                }

                state.userData = state.userData.filter((item)=>(item.userName != transaction.payor))
                state.userData.push(user)
                localStorage.setItem("userData",JSON.stringify(state.userData))
                
            }
        },
    }
}
)

export const {addUser, removeUser, getUser, setTransfer, setTransaction, setBorrow, displayUserData} = userSlice.actions
export default userSlice.reducer