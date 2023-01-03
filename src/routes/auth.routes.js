require("../models/User");
const express = require('express');
const UserCtrl = require('../controllers/auth.controllers')

const router = express.Router();

router.post( '/register', UserCtrl.register);
router.post( '/login', UserCtrl.login );

module.exports = router;
