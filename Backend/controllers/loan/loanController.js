const loanModel = require("../../models/loanModel");
const adminModel = require("../../models/adminModel")
const customerModel = require("../../models/customerModel")
const branchModel = require("../../models/branchModel")
const createLoan = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      branch,        
      amount,
      amountLeft,
      interestRate,
      tenure,
      gold_weight,
      valuation,
      approvedBy
    } = req.body;
    console.log("came here")
    const isValidCustomer = await customerModel.findOne({email:customerEmail})
    if(!isValidCustomer){
      return res.status(400).json({message:"Invalid Customer"})
    }
    const isValidBranch = await branchModel.findOne
    ({name:branch})
    if(!isValidBranch){
      return res.status(400).json({message:"Invalid Branch"})
    }
    const customer = isValidCustomer._id;
    const isValidStaff = await adminModel.findOne({email:approvedBy})
    if(!isValidStaff){
      return res.status(400).json({message:"Invalid Staff"})
    }


    // Create new loan document
    const loan = new loanModel({
      customerName,
      customerEmail,
      customerPhone,
      customer:isValidCustomer,
      branch:isValidBranch,
      approvedBy:isValidStaff,
      amount,
      interestRate,
      tenure,
      gold_weight,
      valuation,
      amountLeft
      // amountPaid defaults to 0, and amountLeft will be calculated via pre-save middleware
    });

    // Save the loan document to the database
    await loan.save();
    await isValidCustomer.loans.push(loan)
    await isValidCustomer.save()
    await isValidBranch.loans.push(loan)
    await isValidBranch.save()
    await isValidStaff.loans.push(loan)
    await isValidStaff.save()


    res.status(200).json({
      message: "Loan created successfully",
      loan,
    });
  } catch (error) {
    console.error("Error creating loan:", error);
    res.status(500).json({ error: error.message });
  }
};


const approveLoan = async (req, res) => {
  try {
    const { loanId } = req.query;
    if(!loanId){
      return res.status(400).json({message:"Invalid Loan"})
    }
    const loan = await loanModel.findByIdAndUpdate(loanId,{status:"approved"},{new:true}).populate("customer").populate("branch").populate("approvedBy");
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    const isValidCustomer = await customerModel
    .findById(loan.customer._id)  
    const isValidBranch = await branchModel
      .findById(loan.branch._id)
        if (!isValidCustomer) {
          return res.status(404).json({ message: "Customer not found" });
        }
        if (!isValidBranch) {
          return res.status(404).json({ message: "Branch not found" });
        }
    await isValidCustomer.approvedLoans.push(loan)
    await isValidCustomer.save()
    await isValidBranch.approvedLoans.push(loan)
    await isValidBranch.save()
      res.status(200).json({
        message: "Loan approved successfully",
        loan,
      });
  }
  catch(error){ 
    console.error("Error approving loan:", error);
    res.status(500).json({ error: error.message });
  }
}


const rejectLoan = async (req, res) => {
  try {
    const { loanId } = req.query;

    // Find the loan by ID and update its status to 'rejected'
    const loan = await loanModel.findByIdAndUpdate(
      loanId,
      { status: "rejected" },
      { new: true }
    ).populate("customer").populate("branch").populate("approvedBy");

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    const isValidCustomer = await customerModel.findById(loan.customer._id);
    const isValidBranch = await branchModel.findById(loan.branch._id);

    if (!isValidCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    if (!isValidBranch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    await isValidCustomer.rejectedLoans.push(loan);
    await isValidCustomer.save();
    await isValidBranch.rejectedLoans.push(loan);
    await isValidBranch.save();

    res.status(200).json({
      message: "Loan rejected successfully",
      loan,
    });
  } catch (error) {
    console.error("Error rejecting loan:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports.approveLoan = approveLoan;
module.exports.createLoan = createLoan;
module.exports.rejectLoan = rejectLoan;