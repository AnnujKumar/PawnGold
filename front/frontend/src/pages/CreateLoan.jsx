import React from 'react'
import { useState } from 'react'
import {useNavigate} from "react-router-dom"
import { CFormInput,CRow,CCol,CButton,CNavLink,CNavItem } from '@coreui/react'
import axios from "axios"
const CreateLoan = () => {
    const [data,setData] = useState({customerName:"",amount:"",interestRate:"",startDate:"",status:"pending"})
    const navigate = useNavigate()
    const handleChange = (evt)=>{
        const value = evt.target.value;
        setData({
            ...data,
            [evt.target.name]: value
        })
    }
    const handleSubmit = async(evt)=>{

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/loan/create-loan`,
            {...data,customerEmail:"test@gmail.com",customerPhone:"111111111",branch:"msg",tenure:3,valuation:1.2,gold_weight:20,approvedBy:"msg3@gmail.com",amountLeft:data.amount}
        )
        if(response.status===200){
                navigate("/loans")
        }
        else{
            console.log("error")
        }
    }
  return (
    <div>
        <form >
        <CFormInput
        type="text"
        id="floatingInput"
        floatingClassName="mb-3"
        floatingLabel="Customer Name"
        placeholder="Customer Name"
        onChange={handleChange}
        name="customerName"
      />
      <CFormInput
        type="number"
        id="floatingInput"
        floatingClassName="mb-3"
        floatingLabel="Loan Amount"
        placeholder="Loan Amount"
        onChange={handleChange}
        name="amount"
      />
      <CFormInput
        type="number"
        id="floatingInput"
        floatingClassName="mb-3"
        floatingLabel="Interest Rate"
        placeholder="Interest Rate"
        onChange={handleChange}
        style={{marginBottom:"10px"}}
        name="interestRate"
      />
      <CFormInput
        type="date"
        id="floatingInput"
        floatingClassName="mb-3"
        floatingLabel="Start Date"
        placeholder="Start Date"
        onChange={handleChange}
        name="startDate"

        
      />
     <div className="d-grid gap-2">
      <CButton color="primary" onClick={handleSubmit}>Create Loan</CButton>
        </div>
      

        </form>
    </div>
  )
}

export default CreateLoan