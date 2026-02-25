const express= require('express');
const router= express.Router();
const authMiddleware= require('../middlewares/auth.middleware')
const AccountController= require('../controllers/account.controller')


router.post('/create', authMiddleware.auth_verify, AccountController.createAccount)



/**
 * - GET /api/accounts/
 * - Get all accounts of the logged-in user
 * - Protected Route
 */
router.get("/", authMiddleware.auth_verify, AccountController.getUserAccountsController)

/**
 * - GET /api/accounts/balance/:accountId
 */
router.get("/balance/:accountId", authMiddleware.auth_verify, AccountController.getAccountBalanceController)




module.exports= router;