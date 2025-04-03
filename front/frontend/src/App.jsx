import React from 'react'
import {Routes,Route} from "react-router-dom"
import LoanHomePage from "./pages/LoanHomePage"
import CreateLoan from "./pages/CreateLoan"
import LoanDetailsPage from "./pages/LoanDetailsPage"
import LoginPage from "./pages/LoginPage"
import '@coreui/coreui/dist/css/coreui.min.css'
import Home from "./pages/Home"
import CustomerList from "./pages/CustomerList"
import CustomerDetails from "./pages/CustomerDetails"
import LoanDetails from "./pages/LoanDetailsPage"
import LoanTransactions from "./pages/LoanTransactions"
const   App = () => {
  return (
    <Routes>
      <Route path="/customer-list" element ={<CustomerList/>}/>
      <Route path="/customer-details/:customerId" element = {<CustomerDetails />}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/loans" element={<LoanHomePage/>}/>
        <Route path="/create-loan" element={<CreateLoan/>}/>
        <Route path="/loan-details/:loanId" element={<LoanDetails/>}/>
        <Route path="/loanTransactions/:loanId" element={<LoanTransactions/>}/>
    </Routes>
  )
}
export default App