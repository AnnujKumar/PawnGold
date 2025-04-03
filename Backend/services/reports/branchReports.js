const branchModel =    require("../../models/branchModel")
const branchReports = require("../../models/reports/branchReports")
const transactionModel = require("../../models/transactionSchema");
const getData = async(branchId)=>{
    const data = {};
    const branch = await branchModel.findById(branchId);
    data.customerDetails = branch.customers.length;
    data.staffDetails = branch.staff.length;
}