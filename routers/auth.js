const express = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const authRouter = express.Router();
//SIGN UP
authRouter.post("/api/signup", async (req, res) => {
    try {
        //get data from client 
        const { name, email, password } = req.body;

        //post data to the user
        //and return data to the user 
        // console.log('res.body :>> ', res.body);
        const existingUer = await User.findOne({ name, email });
        if (existingUer) {
            return res.status(400).json( 'Da ton tai tai khoan nay' );
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
        // console.log(e.errors['email'].message);
        return res.status(500).json(e.errors['email'].message);
    }
});


authRouter.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json( "Nao!Tinh an gian a!Luc lai tri oc di anh ban" );
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(400).json("Ong anh suy giam tri nho nua r!Bam quen mat khau cho nhanh" );
        }
        const token = jwt.sign({ id: user._id }, "passwordKey");
        res.json({ token, ...user._doc });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message });
    }
})


module.exports = authRouter;