const express = require('express');
const router = express.Router();

// controllers
import {register,login,logout, currentUser, sendTestEmail} from '../controllers/auth.js'
//middleware
import { requireSignin } from '../middlewares/index.js';

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/current-user', requireSignin, currentUser),
router.get('/send-email', sendTestEmail)

module.exports = router;