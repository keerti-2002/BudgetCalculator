import React from 'react'
import ExpenseItem from './ExpenseItem'
import {MdDelete} from 'react-icons/md'
export const ExpenseList = ({exp,handleDelete,handleEdit,clearItems}) => {
  return (
    <>
    <ul className="list">
        {exp.map((expense)=> {
            return<ExpenseItem key={expense.id} expense={expense} handleDelete={handleDelete} handleEdit={handleEdit}/>
        })} 
        </ul>
        {exp.length>0&&<button className="btn" onClick={clearItems}>Clear Expenses
        <MdDelete className="btn-icon"/> </button>}
    </>
  )
}

export default ExpenseList