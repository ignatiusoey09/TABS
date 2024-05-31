const User = require("../models/userModel");

const loginUser = async (req, res) => {
    let body  = req.body;
    let email_field = body["email"];
    let pass_field = body["password"];

    console.log(pass_field);

    try {
        const result = await User.findOne({email: email_field, password: pass_field});

        if (result != null) {
            res.json({login_success: true});
        } else {
            res.json({login_success: false});
        }

    } catch (e) {
        console.log("error querying database (User)")
        console.log(e);
    }
}

const registerUser = async (req, res) => {
    let body = req.body;
    let email_field = body["email"];
    let pass_field = body["password"];
    console.log(body);

    try {
        const user = await User.register(email_field, pass_field);
        res.status(200).json({email: email_field, user: user});

    } catch (e) {
        res.status(400).json({error: "email already in use"});
    }
    
}

module.exports = { loginUser, registerUser }