````
# pawnGold Backend Models

This document provides an overview of the Mongoose models used in the pawnGold backend application. Each model represents a different entity in the application and defines the schema for that entity.

## Models

### Customer Model

**File:** `customerModel.js`

The `Customer` model represents a customer in the application. It includes fields for personal information, KYC status, documents, loans, and authentication.

#### Schema Fields:
- `fullName`: String, required
- `email`: String, required, unique
- `phone`: String, required, unique
- `kycStatus`: String, enum ["pending", "verified", "rejected"], default "pending"
- `documents`: Object
  - `aadharNumber`: String, unique
  - `panNumber`: String, unique
  - `uploadedFiles`: Array of Strings (URLs of uploaded documents)
- `loans`: Array of ObjectIds, references `Loan`
- `password`: String, required
- `createdAt`: Date, default Date.now

#### Methods:
- `comparePassword(candidatePassword)`: Compares the provided password with the hashed password.
- `generateAuthToken()`: Generates a JWT token for authentication.

#### Middleware:
- `pre('save')`: Hashes the password before saving the customer.

### Admin Model

**File:** `adminModel.js`

The `Admin` model represents an admin user in the application. It includes fields for personal information, role, branch, and authentication.

#### Schema Fields:
- `name`: String, required
- `email`: String, required, unique
- `password`: String, required
- `role`: String, enum ["super_admin", "owner", "branch_head", "staff"], required
- `branch`: ObjectId, references `Branch`
- `createdAt`: Date, default Date.now

#### Methods:
- `comparePassword(candidatePassword)`: Compares the provided password with the hashed password.
- `generateAuthToken()`: Generates a JWT token for authentication.

#### Middleware:
- `pre('save')`: Hashes the password before saving the admin.

### Branch Model

**File:** `branchModel.js`

The `Branch` model represents a branch in the application. It includes fields for branch information, staff, customers, and financial metrics.

#### Schema Fields:
- `name`: String, required
- `location`: String, required
- `owner`: ObjectId, references `User`
- `branchHead`: ObjectId, references `User`
- `staff`: Array of ObjectIds, references `User`
- `customers`: Array of ObjectIds, references `Customer`
- `totalGold`: Number, default 0
- `totalLoanApproved`: Number, default 0
- `totalInterestCollected`: Number, default 0
- `createdAt`: Date, default Date.now

### Loan Model

**File:** `loanModel.js`

The `Loan` model represents a loan in the application. It includes fields for loan details, customer, branch, and financial metrics.

#### Schema Fields:
- `customerName`: String, required
- `customerEmail`: String, required
- `customerPhone`: String, required
- `customer`: ObjectId, references `Customer`, required
- `branch`: ObjectId, references `Branch`
- `amount`: Number, required
- `interestRate`: Number, required
- `tenure`: Number, required
- `status`: String, enum ["pending", "approved", "rejected", "closed"], default "pending"
- `approvedBy`: ObjectId, references `User`
- `amountPaid`: Number, default 0
- `amountLeft`: Number, required
- `gold_weight`: Number, required
- `valuation`: Number, required
- `interest_collected`: Number, default 0
- `createdAt`: Date, default Date.now

#### Middleware:
- `pre('save')`: Calculates the amount left before saving the loan.

### Transaction Model

**File:** `transactionSchema.js`

The `Transaction` model represents a transaction in the application. It includes fields for transaction details, loan, customer, branch, and payment information.

#### Schema Fields:
- `loanId`: ObjectId, references `Loan`, required
- `customerId`: ObjectId, references `Customer`, required
- `branchId`: ObjectId, references `Branch`, required
- `amount`: Number, required
- `interestPaid`: Number, default 0
- `principalPaid`: Number, default 0
- `transactionType`: String, enum ["EMI Payment", "Full Payment"], required
- `paymentMethod`: String, enum ["Cash", "UPI", "Bank Transfer", "Card"], required
- `transactionDate`: Date, default Date.now

## Usage

Each model is defined using Mongoose and can be imported and used in other parts of the application to interact with the MongoDB database.

Example:
```javascript
const Customer = require('./models/customerModel');
const Admin = require('./models/adminModel');
const Branch = require('./models/branchModel');
const Loan = require('./models/loanModel');
const Transaction = require('./models/transactionSchema');
````
