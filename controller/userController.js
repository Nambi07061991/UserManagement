const bcrypt = require('bcrypt');
const db = require('../models');
const jwt = require('jsonwebtoken');

const User = db.User;
const Roles = db.roles;

const signup = async (req, res) => {
    try {
        const {userName, email, password, role} = req.body;
        const roleName = req.body.role
        // console.log(roleName, 'from req.body');
        const roles = await Roles.findOne({
            where :{
                role : roleName
            }
        })
        console.log(roles, 'rom role table'); 
// var roles_id =roles.dataValues.id
//         // if(roles){
//         //     roles_id= roles.dataValues.id
//         // }

//         console.log(roles.dataValues.id,roles_id, 'from role table');

// return res.send(JSON.stringify(roles))
        const data = {
            userName,
            email,
            password : await bcrypt.hash(password, 10),
            roleId : await roles.dataValues.id,
        };

        const user = await User.create(data);

        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge : 1 * 24 * 60 * 60, httpOnly : true});
            console.log("user", user);
            console.log(token);
            return res.status(201).json(user);
        }else{
            return res.status(409).json("Details are InCorrect");
        }
    }catch(err){
        console.log(err);
        return res.json(`Error: ${err}`);
    }
};

const login = async (req, res) => {
    try{
        console.log(req.query.email);
        const email = req.query.email;
        const password = req.query.password;
        console.log(req.query.password);

        let user = await User.findOne({
            where : {
                email : email
            }
        });

        if (user){
            const isUserSame = await bcrypt.compare(password, user.password);
            if (isUserSame){
                let token = jwt.sign({id : user.id}, process.env.secretKey,{
                    expiresIn : 1 * 24 * 60 * 60 * 1000,
                })
                res.cookie("jwt", token, { maxAge : 1 * 24 * 60 * 60, httpOnly : true });
                // console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                return res.status(201).json(user);
            }else{
                return res.status(401).json("Authentication Failed");
            }
        }else{
            return res.status(401).json("Authendication Failed");
        }
    }catch(err){
        console.log(err)
        return res.json(`Error: ${err}`);
    }
};

module.exports = {
    signup,
    login,
};