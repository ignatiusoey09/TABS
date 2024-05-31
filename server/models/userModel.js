const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.register = async function(email_field, password_field) {

    //check if email already exists in 'users' collection
    const exists = await this.findOne({email: email_field});
    if (exists) {
        throw Error("Email already in use");
    }

    //hashing the password with salt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password_field, salt);

    const user = this.create({email: email_field, password: hash});

    return user;
}

module.exports = mongoose.model('User', userSchema);