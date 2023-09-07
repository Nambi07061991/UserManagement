const express = require('express');
const roleController = require('../controller/roleController');
const {createRole} = roleController;

const router = require("express").Router();

router.post('/createRole', createRole);

module.exports = router;