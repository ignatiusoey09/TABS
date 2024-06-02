const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

//defines a schema for the users collection
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

//static method for user registration
userSchema.statics.register = async function(email_field, password_field) {

    //check if email already exists in 'users' collection
    const exists = await this.findOne({email: email_field});
    if (exists) {
        throw Error("Email already in use");
    }

    //hashing the password with salt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password_field, salt);

    //adds new document to the users collection
    const user = this.create({email: email_field, password: hash, role: "student"});

    return user;
}

//static method for user login
userSchema.statics.login = async function(email_field, password_field) {

    //check if user exists in database
    const user = await this.findOne({email: email_field});
    if (!user) {
        throw Error("Invalid email or password");
    }

    //compare the hashes of the input password, and the password found in database
    const match = await bcrypt.compare(password_field, user.password);

    if (!match) {
        throw Error("Invalid email or password");
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);