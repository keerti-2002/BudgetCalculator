import React from 'react'
import {MdSend} from "react-icons/md"
export const Expense = ({charge,amount,handleCharge,handleAmount,handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}> 
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">Charge</label>
          <input
          type="text"
          className="form-control" 
          id="charge"
          name="charge"
          placeholder="Eg. Rent"
          value={charge}
          onChange={handleCharge}>
          </input>
        </div>
      <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
          type="number"
          className="form-control" 
          id="amount"
          name="amount"
          placeholder="Eg. 1000"
          value={amount}
          onChange={handleAmount}>
          </input>
        </div>
      </div>
      <button type="submit" className="btn">submit
      <MdSend className="btn-icon"/>
      </button>
    </form>
  )
}

export default Expense