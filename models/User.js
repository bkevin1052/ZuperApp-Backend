const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    id: { type: Int, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone:{ type: String, required: true }
});

module.exports = model('User', UserSchema);