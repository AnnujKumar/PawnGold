const loanModel = require("../../models/loanModel");

const getAllLoans = async (startDate, endDate) => {
    try {
        // Fetch loans directly from the loanModel
        const allLoans = await loanModel.find({
            createdAt: {
                $gte: new Date(startDate), // Filter loans created on or after startDate
                $lte: new Date(endDate)   // Filter loans created on or before endDate
            }
        });
        return allLoans; // Returns an array of loans within the specified interval
    } catch (err) {
        console.error("Error fetching loans:", err);
        throw err;
    }
};

const getTotalLoanCount = (loans)=>{
    return loans.length;
}

const getLoanAmountIssued  = (loans)=>{
    return loans.reduce((total, loan) => total + loan.amount, 0);
}

const totalPrincipalCollected = (loans)=>{
    return loans.reduce((total, loan) => total + loan.totalPrincipalCollected, 0);
}
const totalInterestCollected = (loans) => {
    return loans.reduce((total, loan) => { // Default to 0 if undefined or null
        return total + loan.totalInterestCollected;
    }, 0);
}

const getDashboardData = async(startDate,endDate)=>{
    try{
        const loans = await getAllLoans(startDate,endDate);
        const totalLoanCount = getTotalLoanCount(loans);
        const totalLoanAmount = getLoanAmountIssued(loans);
        const totalPrincipal = totalPrincipalCollected(loans);
        const totalInterest = totalInterestCollected(loans);
        return {totalLoanCount,totalLoanAmount,totalPrincipal,totalInterest,loans};
    }catch(err){
        console.error("Error fetching dashboard data:",err);
        throw err;
    }
}

module.exports = { getDashboardData };