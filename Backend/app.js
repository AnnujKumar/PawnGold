require('dotenv').config();	
const express = require('express');
const superAdminRoutes = require('./routes/adminRoutes/superAdminRoutes');
const ownerAdminRoutes = require('./routes/adminRoutes/ownerAdminRoutes');
const branchHeadRoutes = require('./routes/adminRoutes/branchHeadRoutes');
const staffRoutes = require('./routes/adminRoutes/staffRoutes');
const branchRoutes = require('./routes/branchRoutes/branchRoutes');
const loanRoutes = require("./routes/loanRoutes/loanRoutes"); 
const userRoutes = require('./routes/userRoutes/userRoutes');
const transactionRoutes = require("./routes/transactionRoutes/transactionRoutes");  
const adminReportRoutes = require("./routes/reports/adminReportRoutes");
const app = express();
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const cors = require("cors")
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use("/admin/super-admin", superAdminRoutes);
app.use("/admin/owner-admin", ownerAdminRoutes);
app.use("/admin/branch-head", branchHeadRoutes);
app.use("/admin/staff", staffRoutes);
app.use("/branch", branchRoutes);
app.use("/loan",loanRoutes)
app.use("/user",userRoutes)
app.use("/transaction",transactionRoutes)
app.use("/admin-reports",adminReportRoutes)
// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
});

module.exports = app;