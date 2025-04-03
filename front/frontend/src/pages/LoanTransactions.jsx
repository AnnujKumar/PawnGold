import React, { useEffect, useState } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoanTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { loanId } = useParams(); // Extract loanId from URL
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (!loanId) {
      console.error('Loan ID is undefined');
      return;
    }

    console.log('Fetching transactions for Loan ID:', loanId);

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/admin/super-admin/getLoanTransactions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
          loanId: loanId,
        },
      })
      .then((response) => {
        console.log('Loan Transactions:', response.data);
        setTransactions(response.data); // Update transactions state with fetched data
        setLoading(false); // Set loading to false
      })
      .catch((err) => {
        console.error('Error fetching loan transactions:', err);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, [loanId]);

  if (loading) return <div>Loading...</div>;

  if (!transactions.length) return <div>No transactions available for this loan.</div>; // Handle case where transactions are empty

  return (
    <div>
      <h2>Loan Transactions</h2>
      <CTable striped hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Transaction ID</CTableHeaderCell>
            <CTableHeaderCell>Amount</CTableHeaderCell>
            <CTableHeaderCell>Interest Paid</CTableHeaderCell>
            <CTableHeaderCell>Principal Paid</CTableHeaderCell>
            <CTableHeaderCell>Transaction Date</CTableHeaderCell>
            <CTableHeaderCell>Reference Number</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {transactions.map((transaction) => (
            <CTableRow key={transaction.transactionId}>
              <CTableDataCell>{transaction.transactionId}</CTableDataCell>
              <CTableDataCell>{transaction.amount}</CTableDataCell>
              <CTableDataCell>{transaction.interestPaid}</CTableDataCell>
              <CTableDataCell>{transaction.principalPaid}</CTableDataCell>
              <CTableDataCell>{new Date(transaction.transactionDate).toLocaleString()}</CTableDataCell>
              <CTableDataCell>{transaction.referenceNumber}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CButton color="secondary" onClick={() => navigate(-1)}>
        Back to Loan Details
      </CButton>
    </div>
  );
};

export default LoanTransactions ;