const transactionModel = require("../../models/transactionSchema");

const getReports = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Please provide start and end Date" });
  }

  try {
    const start = (new Date(startDate))
    const end = (new Date(endDate))
    console.log(start , end)
    const transactions = await transactionModel.aggregate([
      {
        $match: {
          transactionDate: { $gte: start }
        }
      },
      {
        $group: {
          _id: null,
          totalTransactions: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
          totalInterestCollected: { $sum: "$interestPaid" },
          totalPrincipalCollected: { $sum: "$principalPaid" },
          transactions: { $push: "$$ROOT" }
        }
      }
    ])
console.log(transactions)
    if (transactions.length === 0) {
      return res.status(200).json({
        transactions: [],
        totalTransactions: 0,
        totalAmount: 0,
        totalInterestCollected: 0,
        totalPrincipalCollected: 0
      });
    }

    const data = transactions[0];

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return res.status(500).json({ message: "Error fetching reports" });
  }
};

module.exports = { getReports };