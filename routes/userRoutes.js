const express = require('express');
const userController = require('../controller/userController');
const {signup, login} = userController;
const userAuth = require('../middleware/user_auth');

const router = require('express').Router();

router.post('/signup', userAuth.saveUser, signup);

router.post('/login', login);

module.exports = router;