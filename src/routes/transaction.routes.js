const express= require('express')
const transactionRouter= express.Router();
const authMiddleware= require('../middlewares/auth.middleware')
const transactionController= require("../controllers/transaction.controller")

transactionRouter.post("/", authMiddleware.auth_verify, transactionController.createTransaction )

transactionRouter.post("/system/initial-funds", authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundsTransaction)
module.exports= transactionRouter