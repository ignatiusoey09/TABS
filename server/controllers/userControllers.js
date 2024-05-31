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

module.exports = { loginUser, }