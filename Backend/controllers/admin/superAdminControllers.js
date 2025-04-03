const {superAdminRegisterValidation,superAdminLoginValidation} = require('../../validation/adminValidation/superAdminValidation');
const Admin = require('../../models/adminModel');
const branchModel = require("../../models/branchModel");
const loanModel = require("../../models/loanModel");
const customerModel = require("../../models/customerModel");	
const transactionModel = require("../../models/transactionSchema"); // Import the Transaction model
const {getDashboardData} = require("../../services/superAdminServices/superAdminDashboard");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");

const registerSuperAdmin = async (req, res) => {
    try {
      const { error } = superAdminRegisterValidation.validateAsync(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const admin = new Admin(req.body);
      await admin.save();
      const token = await admin.generateAuthToken();
      res.cookie("token",token);
      res.status(201).send({ admin, token });
    } catch (err) {
      res.status(400).json({err});
    }
  }
const loginSuperAdmin = async (req, res) => {
    try {
      const { error } = superAdminLoginValidation.validateAsync(req.body);
      if (error) {    
        return res.status(400).json({ error: error.details[0].message }); 
      }
      const { email, password } = req.body;
      const admin = await Admin.findOne({email:email});

      if (!admin) {
        return res.status(401).json({ error: 'Invalid login credentials' });
      }
      const isMatch = await admin.comparePassword(password);
      if(!isMatch){
        return res.status(401).json({ error: 'Invalid login credentials' });
      }
      const token = await admin.generateAuthToken();
      res.cookie("token",token);
      console.log(token)
      res.status(200).json({ admin, token });
    } catch (err) {
      res.status(400).json({err});
    }
  }

const logoutSuperAdmin = async (req, res) => {
   
    try {
      const token = req.cookies.token || req.headers.authorization.split(" ")[1];
      if(!token){
        return res.status(401).json({error:"You are not logged in"});
      }
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(verified._id);
      if(!admin){
        return res.status(401).json({error:"You are not logged in"});
      }
      res.clearCookie("token");
      res.status(200).json({message:"Logged out successfully"});
    } catch (err) {
      console.log(err)
      res.status(400).json({err:err});
    }
  }

const getSuperAdminData = async (req, res) => {


  try{
      const year = new Date().getFullYear();
      const month = new Date().getMonth()
      const startDate = new Date(year,0,1);
      const endDate = new Date(year,month,31)
      const dashboardData = await getDashboardData(startDate,endDate);
      console.log(dashboardData)
      res.status(200).json(dashboardData);
  }
  catch(err){
    console.log(err)
    res.status(400).json({err:err});
  }
}

const getCustomerList = async(req,res)=>{
try{
    const customers = await customerModel.find({}).populate("branch").populate("loans")
    //console.log(customers)
    const data = customers.map((customer)=>{
      console.log(customer)
      return{
        customerId:customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        branch: customer.branch?customer.branch.name:"",
        loans:customer.loans
    }
  
}
)
    res.status(200).json(data);
}
catch(err){
    console.log(err)
    res.status(400).json({err:err});
}
}

const getCustomerDetails = async(req,res)=>{
  const customerId = req.query.customerId;
  if(!customerId){
    console.log("No Customer Id")
    return res.status(400).json({error:"Customer ID is required"});
  }
  try{
    const customer = await customerModel.findById(customerId).populate("branch").populate("loans")
    if(!customer){
      return res.status(404).json({error:"Customer not found"});
    }
    const data = {
      customerId:customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        branch: customer.branch?customer.branch.name:"",
        loans:customer.loans
    }
    res.status(200).json(data);
  }
  catch(err){
    console.log(err)
    res.status(400).json({err:err});
  }
}

const getLoanDetails = async (req, res) => {
  console.log("arrived here")
  const loanId = req.query.loanId;
  if (!loanId) {
    console.log("No Loan Id");
    return res.status(400).json({ error: "Loan ID is required" });
  }
  try {
    const loan = await loanModel.findById(loanId).populate("branch");
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    const data = {
      loanId: loan._id,
      customerName: loan.customerName,
      branch: loan.branch ? loan.branch.name : "No branch assigned",
      amount: loan.amountLeft,
      gold_weight: loan.gold_weight, // Assuming this field exists in the loan model
      tenure: loan.tenure,
      status: loan.status,
    };
    console.log(data)
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

const getLoanTransactions = async (req, res) => {
  const loanId = req.query.loanId;
  console.log(loanId);
  if (!loanId) {
    console.log("No Loan Id");
    return res.status(400).json({ error: "Loan ID is required" });
  }
  try {
    // Convert loanId to ObjectId

    // Find transactions that belong to the given loanId
    const transactions = await transactionModel
      .find({ loanId:loanId})
      .populate("customerId")
      .populate("branchId");

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: "No transactions found for this loan" });
    }

    // Format the transactions for the response
    const data = transactions.map((transaction) => ({
      transactionId: transaction._id,
      amount: transaction.amount,
      interestPaid: transaction.interestPaid,
      principalPaid: transaction.principalPaid,
      transactionDate: transaction.transactionDate,
      referenceNumber: transaction.referenceNumber || "N/A",
    }));
    console.log(data);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err });
  }
};

module.exports.getLoanTransactions  = getLoanTransactions
module.exports.getLoanDetails = getLoanDetails;
module.exports.getCustomerDetails = getCustomerDetails;
module.exports.getCustomerList = getCustomerList;
module.exports.getSuperAdminData = getSuperAdminData;
module.exports.loginSuperAdmin = loginSuperAdmin;
module.exports.registerSuperAdmin = registerSuperAdmin;   
module.exports.logoutSuperAdmin = logoutSuperAdmin;
module.exports.getLoanTransactions = getLoanTransactions;