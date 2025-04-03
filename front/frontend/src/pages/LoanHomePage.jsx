import {
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CButton,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import React, { useContext, useState,useEffect } from 'react'
import SuperAdminContext from '../contexts/superAdminContext'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import LoanDetailsPage from './LoanDetailsPage'
import {useNavigate} from "react-router-dom"


const LoanHomePage = () => {
  const { superAdminData,setSuperAdminData } = useContext(SuperAdminContext);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [selectedLoan, setSelectedLoan] = useState(null)
  const navigate  = useNavigate()
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/admin/super-admin/getSuperAdminData`)
      .then((response) => {
        console.log('Fetched Data:', response.data);
        setSuperAdminData(response.data); // Update context with fetched data
        console.log('Updated Context:', superAdminData); // Check if context is updated
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log('Error:', err);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  if (loading) {
    // Show a loading spinner or message while data is being fetched
    return <div>Loading...</div>;
  }

   // State to track selected loan
  console.log(superAdminData)
  const handleDetails = (loanId)=>{
    navigate(`/loan-details/${loanId}`)

  }
  return (
    <div className="m-10">
      {selectedLoan ? (
        // Render LoanDetails component if a loan is selected
        <LoanDetails loan={selectedLoan} onBack={handleBack} />
      ) : (
        // Render the table if no loan is selected
        <>
          <CRow>
            <CCol>
              <CNavItem>
                
                  <CButton color="primary" onClick={()=>{
                    navigate("/create-loan")
                  }}>Create New Loan</CButton>
                
              </CNavItem>
            </CCol>
          </CRow>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Loan ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Customer</CTableHeaderCell>
                <CTableHeaderCell scope="col">Branch</CTableHeaderCell>
                <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                <CTableHeaderCell scope="col">Gold</CTableHeaderCell>
                <CTableHeaderCell scope="col">Tenure</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {superAdminData.loans.map((loan, idx) => (
                <CTableRow
                  active
                  key={idx}
                  onClick={() => handleDetails(loan._id)} // Handle row click
                  style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
                >
                  <CTableHeaderCell scope="row">{loan._id}</CTableHeaderCell>
                  <CTableDataCell>{loan.customerName}</CTableDataCell>
                  <CTableDataCell>{loan.branch}</CTableDataCell>
                  <CTableDataCell>{loan.amount}</CTableDataCell>
                  <CTableDataCell>{loan.gold_weight}</CTableDataCell>
                  <CTableDataCell>{loan.tenure}</CTableDataCell>
                  <CTableDataCell>{loan.status}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </>
      )}
    </div>
  )
}

export default LoanHomePage