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

        //removing password and id for security
        const user_response = {id:user._id, email:user.email, name: user.name, role:user.role};
        const token = createToken(user._id);

        res.status(200).json({user:user_response, token});

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
    let name_field = body["name"];

    try {
        //query users collection via User static method
        const user = await User.register(email_field, pass_field, name_field);
        res.status(200).json({email: email_field, user: user});

    } catch (e) {
        res.status(400).json({error: e.message});
    }
    
}

const getUsers = async (req, res) => {
    const users = await User.find({})

    res.status(200).json(users)
}

module.exports = { loginUser, registerUser, getUsers }