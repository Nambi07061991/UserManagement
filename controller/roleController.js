const db = require('../models');

const role = db.roles;

const createRole = async (req, res) =>{
    try{
        const data = req.body;
        await role.create(data)
        return res.status(200).json({
            code: 200,
            message: `Role Created Successfully`,
            data: data,
          })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            code: 400,
            message: `Error: ${err}`,
            data: null,
          })
    }
}

module.exports = {
    createRole
};