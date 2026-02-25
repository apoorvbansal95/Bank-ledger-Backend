# Bank-ledger-Backend
🏦 Bank Ledger API

A basic double-entry bank ledger REST API built with Node.js, Express, and MongoDB. Supports user management, account creation, and financial transactions with balance tracking.


bank-ledger/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Account.js            # Account schema
│   │   └── Transaction.js        # Transaction schema
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── accountController.js
│   │   └── transactionController.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── accountRoutes.js
│   │   └── transactionRoutes.js
│   ├── middleware/
│   │   └── auth.js               # JWT middleware
│   └── app.js
├── .env
├── package.json
└── README.md
