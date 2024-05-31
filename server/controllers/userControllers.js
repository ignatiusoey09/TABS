const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'});
}

const loginUser = async (req, res) => {
    //extracting request body fields
    let body  = req.body;
    let email_field = body["email"];
    let pass_field = body["password"];

    try {
        //query users collection via User static method
        const user = await User.login(email_field, pass_field);
        const token = createToken(user._id);
        res.status(200).json({user, token});

    } catch (e) {
        //invalid credentials/ non-existent user/ error querying database
        console.log(e);
        res.status(400).json({error: e.message});
    }
}

const registerUser = async (req, res) => {
    //extracting request body fields
    let body = req.body;
    let email_field = body["email"];
    let pass_field = body["password"];

    try {
        //query users collection via User static method
        const user = await User.register(email_field, pass_field);
        res.status(200).json({email: email_field, user: user});

    } catch (e) {
        res.status(400).json({error: e.message});
    }
    
}

module.exports = { loginUser, registerUser }