import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';

const CustomerList = () => {
const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);    
    const showDetails = (customerId)=>{
        
        navigate(`/customer-details/${customerId}`);
    }
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/admin/super-admin/getCustomerList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })                                                                     
      .then((response) => {
        setData(response.data); // Set the fetched data
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="m-4">
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Customer Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Number of Loans</CTableHeaderCell>
            <CTableHeaderCell scope="col">Branch</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((customer, idx) => {
            return(
            <CTableRow key={idx} onClick={()=>{    
                showDetails(customer.customerId)
            }}>
              <CTableDataCell>{customer.name}</CTableDataCell>
              <CTableDataCell>{customer.loans.length}</CTableDataCell>
              <CTableDataCell>{customer.branch}</CTableDataCell>
            </CTableRow>
          )}
        )}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default CustomerList;