const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {

    const { authorization } = req.headers;

    //check if jwt is included in request
    if (!authorization) {
        return res.status(401).json({error: "Access Denied"});
    }

    //format: "Bearer {jwt}"
    const token = authorization.split(" ")[1];

    try {
        //jwt payload contains user id
        const {_id} = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({_id}).select(['email', 'role']);
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({error: "Access Denied"});
    }
}

module.exports = requireAuth;