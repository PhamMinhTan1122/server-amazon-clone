const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const authRouter = express.Router();
//SIGN UP
authRouter.post("/api/signup", async (req, res) => {
    try {
        //get data from client 
        const {name,email,password} = req.body;

        //post data to the user
        //and return data to the user 
        // console.log('res.body :>> ', res.body);
        const existingUer = await User.findOne({ name, email });
        if (existingUer) {
            return res.status(400).json({ msg: 'User with same email already exists!' });

        }
        
        const hashPassword = await bcrypt.hash(password, 8);
        // const salt =  bcrypt.genSalt(8);
        // const hashpassword =  bcrypt.hash(password, salt);
            
        let user = new User({
            name: name,
            email: email,
            password: hashPassword,
        });
        user = await user.save();
        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json({error: e.message});
    }
})
module.exports = authRouter;