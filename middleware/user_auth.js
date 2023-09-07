const express = require('express');
const db = require('../models');
const roles = require('../models/roles');

const User = db.User;
const Roles = db.roles;

const saveUser = async(req, res, next) => {
    try {
        const username = await User.findOne({
            where : {
                userName : req.body.userName,
            },
        });
        if(username) {
            return res.status(409).json("UserName Already In Use");
        }

        const emailCheck = await User.findOne({
            where : {
                email : req.body.email,
            },
        });
        if(emailCheck) {
            return res.status(409).json("Email Already In Use");
        }
        const roleName = await Roles.findOne({
            where : {
                role : req.body.role
            }
        })
        if(roleName==null) {
            return res.status(409).json("Kindly Provide Role Name");
        }
        next();
    }catch(err) {
        console.log(err);
        return res.json(`Error: ${err}`);
    }
};

module.exports = {
    saveUser,
};