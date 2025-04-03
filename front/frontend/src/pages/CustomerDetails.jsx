import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';

const CustomerDetails = () => {
  const { customerId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
  useEffect(() => {

    const fetchData = async () => {
      console.log('Customer ID:', customerId);
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/admin/super-admin/getCustomerDetails`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            customerId: customerId,
          },
        })
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchData();
  }, [customerId]);
 
  const handleDetails = (loanId)=>{
    navigate(`/loan-details/${loanId}`)

  }
  if (loading) return <div>Loading...</div>;

  return (
    <div className="m-4">
      <h2>Customer Details</h2>
      <p><strong>Name:</strong> {data.name || 'N/A'}</p>
      <p><strong>Branch:</strong> {data.branch || 'N/A'}</p>

      <h3>Loans</h3>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Loan ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
            <CTableHeaderCell scope="col">Gold Weight</CTableHeaderCell>
            <CTableHeaderCell scope="col">Tenure</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.loans && data.loans.length > 0 ? (
            data.loans.map((loan, idx) => (
              <CTableRow key={idx} onClick={()=>{handleDetails(loan._id)}}>
                <CTableDataCell>{loan._id}</CTableDataCell>
                <CTableDataCell>{loan.amount}</CTableDataCell>
                <CTableDataCell>{loan.goldWeight}</CTableDataCell>
                <CTableDataCell>{loan.tenure}</CTableDataCell>
                <CTableDataCell>{loan.status}</CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="5" className="text-center">
                No loans found for this customer.
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
         

    </div>
  );
};

export default CustomerDetails;