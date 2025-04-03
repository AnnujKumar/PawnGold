import React,{useEffect,useState} from 'react'
import {CButton} from '@coreui/react'
import {useParams,useNavigate} from 'react-router-dom'
import axios from "axios"
const LoanDetailsPage = () => {
  const [loan, setData] = useState(null);
  const {loanId} = useParams();
  const [loading, setloading] = useState(true)
  const navigate = useNavigate()
  useEffect(()=>{
    console.log(loanId)
    axios.get(`${import.meta.env.VITE_BASE_URL}/admin/super-admin/getLoanDetails`,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      },
      params:{
        loanId:loanId
      }
    }).then(response=>{
      console.log(response.data)
      setData(response.data)
      setloading(false)
    }).catch(err=>{
      console.log(err)
    })
  },[loanId])
  if(loading) return <div>Loading...</div>
  else
  return (
      <div>
         <h2>Loan Details</h2>
        <p><strong>Loan ID:</strong> {loan.loanId}</p>
        <p><strong>Customer Name:</strong> {loan.customerName}</p>
        <p><strong>Branch:</strong> {loan.branch}</p>
        <p><strong>Amount:</strong> {loan.amount}</p>
        <p><strong>Gold Weight:</strong> {loan.gold_weight}</p>
        <p><strong>Tenure:</strong> {loan.tenure}</p>
        <p><strong>Status:</strong> {loan.status}</p>
        <CButton color="primary" onClick={()=>{navigate(`/loanTransactions/${loan.loanId}`)}}>Show transactions</CButton>
      </div>
  )
}

export default LoanDetailsPage