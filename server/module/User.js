const mongoose = require('mongoose');
const joi = require('joi')
const joiPasswordComplexity = require('joi-password-complexity')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
})

userSchema.methods.generateAuthToken = function () {
    const jwtToken = jwt.sign({_id: this._id}, process.env.JWT,{expiresIn: '7d'})

    return jwtToken
}

const User = mongoose.model('user', userSchema);

const valideteUser = (data) => {
    const schema = joi.object({
        username: joi.string().required().label('Your username'),
        email: joi.string().email().required().label('Your email'),
        password: joiPasswordComplexity().required().label('Your password'),
    })

    return schema.validate(data)
}

module.exports = {User, valideteUser};