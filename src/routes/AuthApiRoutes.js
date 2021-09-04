const express = require('express');
const AuthController = require('../app/http/controllers/auth/AuthController');

const router = express.Router();

router.post('/login', AuthController.loginUser);


module.exports = router;