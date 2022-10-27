import './App.css';
import React,{useState,useEffect} from 'react'
import ExpenseList from './Components/ExpenseList'
import Expense from './Components/Expense'
import Alert from './Components/Alert'
import { v4 as uuidv4 } from 'uuid';

//import useState()
//function returns [] with 2 values
//actual value of the state
//functon for update/control
//default value

//  const initExp=[
//   { id:uuidv4(),charge:"Rent",amount:16000},
//    { id:uuidv4(),charge:"Car Loan",amount:10000},
//    { id:uuidv4(),charge:"Electricity bill",amount:1500}
  
//  ]
const initExp=JSON.parse(localStorage.getItem("exp"));

function App() {
  const[exp,setExp]=useState(initExp);
  const[charge,setCharge]=useState("");
  const[amount,setAmount]=useState("");
  const[alert,setAlert]=useState({show:false});
  const[edit,setEdit]=useState(false);
  const[id,setId]=useState(0);

   useEffect(()=>{
     localStorage.setItem("exp",JSON.stringify(exp));
   },[exp]);

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
    },5000);
  };

  //handle submit
  const handleSubmit=e=>{
    e.preventDefault();

     if (charge!==""&&amount>0){
      if(edit){
        let tempExp=exp.map(item=>{ 
          return(item.id===id?{...item,charge,amount}:item);
        });
        setExp(tempExp);
        setEdit(false);
        handleAlert({type:"success",text:"Item edited successfully"});

      }
      else{
        const sinexp={id:uuidv4(),charge,amount};
        setExp([...exp,sinexp]);
        handleAlert({type:"success",text:"Item added Successfully"});

      }
      setCharge("");
      setAmount("");

    }
    else{
      //handle alert call
      handleAlert({type:"danger",text:"Please enter appropriate values"});
    }
  };

  //clear all items
  const clearItems=()=>{
    setExp([]);
    handleAlert({type:"success",text:"All items deleted"});
  };

  //delete particular element
  const handleDelete=(id)=>{
    let tempExp=exp.filter(item=> item.id!==id);
    setExp(tempExp);
    handleAlert({type:"danger",text:"Item deleted successfully"});
  };

  //edit particular element
  const handleEdit=(id)=>{
    let expense=exp.find(item=>item.id===id);
    let{charge,amount}=expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);

  };
  return (
    <>
    {alert.show&&<Alert type={alert.type} text={alert.text}/>}
      
      <h1> BUDGET CALCULATOR </h1>
      <main className="App">
        <Expense charge={charge} amount={amount} handleCharge={handleCharge} handleAmount={handleAmount} handleSubmit={handleSubmit} edit={edit}/>
        <ExpenseList exp={exp} clearItems={clearItems} handleDelete={handleDelete} handleEdit={handleEdit}/>
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
