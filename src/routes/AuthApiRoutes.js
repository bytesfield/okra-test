const express = require('express');
const AuthController = require('../app/http/controllers/auth/AuthController');
const { asyncHandler } = require('../utils/helpers');

const router = express.Router();

router.post('/login', asyncHandler(AuthController.loginUser));


module.exports = router;