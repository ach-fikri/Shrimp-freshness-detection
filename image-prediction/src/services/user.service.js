const {User} = require('../models/user.model');
const {Token} = require('../models/token.model');
const bcrypt = require("bcrypt");
const {validate} = require('../validations/validation');
const {loginValidation, registerValidation} = require('../validations/user.validation');
const {ResponseError} = require('../error/response.error');
const {sendEmail} = require('../utils/email');
const {messageTemplate} = require('../utils/email.template');
const {generateToken, generateResetPasswordToken, verifyResetPasswordToken} = require('../utils/jwt.token');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const register = async (users) => {
     const data = validate(registerValidation, users);
     const user = await User.findOne({email: data.email});
     if (user) {
          throw new ResponseError(400, false, 'User already exists');
     }
     const hashPassword = await bcrypt.hash(data.password, 11);
     const newUser = new User({
          name: data.name,
          email: data.email,
          password: hashPassword
     });
     const result = await newUser.save();
}

const login = async (users) => {
     const data = validate(loginValidation, users);
     const user = await User.findOne({email: data.email});
     if (!user) {
          throw new ResponseError(404, false, 'User not found');
     }
     const validPassword = await bcrypt.compare(data.password, user.password);
     if (!validPassword) {
          throw new ResponseError(401, false, 'Invalid password');
     }
     const alreadyToken = await Token.findOne({user_id: user._id})
     if (alreadyToken) {
          const t = await generateToken(
               {
                    id: user._id,
                    name: user.name,
                    email: user.email
               });
          const result = await Token.findOneAndUpdate({_id: alreadyToken._id}, {token: t}, {new: true});
          return result.token;
     }
     const token = await generateToken({
          id: user._id,
          name: user.name,
          email: user.email
     });
     const newToken = new Token({
          token: token,
          user_id: user._id
     });
     const result = await newToken.save()
     return result.token;
}

const logout = async (id) => {
     const result = await Token.deleteOne({user_id: id});
     if (!result.deletedCount) {
          throw new ResponseError(404, false, 'Token not found');
     }
     return true
}

const forgotPassword = async (email) => {
    const user = await User.findOne({email: email});
    if (!user) {
        throw new ResponseError(404, false, 'User not found');
    }
    const token = await generateResetPasswordToken({
        id: user._id,
        email: user.email
    });
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    const message = messageTemplate(resetLink);
    await sendEmail(email, 'Reset password',message );
    return true
}


const resetPassword = async (token, password) => {
    const t = await verifyResetPasswordToken(token);
    const user_id = t.id;
    const hashPassword = await bcrypt.hash(password, 11);
    const result = await User.findOneAndUpdate({_id: user_id}, {password: hashPassword}, {new: true});
    if (!result) {
        throw new ResponseError(404, false, 'User not found');
    }
    return true
}

const profile = async (id) => {
    const result = await User.findOne({_id: id});
    if (!result) {
        throw new ResponseError(404, false, 'User not found');
    }
    return result
}

const updateProfile = async (id, data) => {
    if (data.password) {
        const hashPassword = await bcrypt.hash(data.password, 11);
        data.password = hashPassword;
    }
    const result = await User.findOneAndUpdate({_id: id}, data, {new: true});
    if (!result) {
        throw new ResponseError(404, false, 'User not found');
    }
    return result
}
module.exports = {
     login,
     register,
     logout,
     forgotPassword,
     resetPassword,
     profile,
     updateProfile
}