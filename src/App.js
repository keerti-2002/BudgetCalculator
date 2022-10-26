import './App.css';
import React,{useState} from 'react'
import ExpenseList from './Components/ExpenseList'
import Expense from './Components/Expense'
import Alert from './Components/Alert'
import { v4 as uuidv4 } from 'uuid';

//import useState()
//function returns [] with 2 values
//actual value of the state
//functon for update/control
//default value

const initExp=[
  { id:uuidv4(),charge:"Rent",amount:16000},
  { id:uuidv4(),charge:"Car Loan",amount:10000},
  { id:uuidv4(),charge:"Electricity bill",amount:1500}
  
]

function App() {
  const[exp,setExp]=useState(initExp);
  const[charge,setCharge]=useState("");
  const[amount,setAmount]=useState("");
  const[alert,setAlert]=useState({show:false});


  //handle charge
  const handleCharge=e=>{
    console.log(`charge :Rs.{e.target.value}`);
    setCharge(e.target.value);
  };

  //handle amount
  const handleAmount=e=>{
    console.log(`amount :Rs.{e.target.value}`);
    setAmount(e.target.value);
  };
  //handle alert
  const handleAlert=({type,text})=>{
    setAlert({show:true,type,text});
    setTimeout(()=>{
      setAlert({show:false});
    },5000)
  }

  //handle submit
  const handleSubmit=e=>{
    e.preventDefault();
    // console.log(charge,amount);
    if(charge!==""&&amount>0){
      const sinexp={id:uuidv4(),charge,amount};
      setExp([...exp,sinexp]);
      handleAlert({type:"success",text:"Item added Successfully"});
      setCharge("");
      setAmount("");

    }
    else{
      //handle alert call
    }
  };




  return (
    <>
    {alert.show&&<Alert type={alert.type} text={alert.text}/>}
      <Alert />
      <h1> BUDGET CALCULATOR </h1>
      <main className="App">
        <Expense charge={charge} amount={amount} handleCharge={handleCharge} handleAmount={handleAmount} handleSubmit={handleSubmit}/>
        <ExpenseList exp={exp}/>
        </main>
        <h1>TOTAL :{" "}<span className="total"> Rs.
        {exp.reduce((acc,curr)=>{
          return(acc+=parseInt(curr.amount));
        },0)}</span>
        </h1>
    </>
  );
}

export default App;
