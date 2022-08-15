require('dotenv').config();
const router = require('express').Router();
const { validationResult } = require('express-validator');
const { User } = require('../module/User');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);

router.put('/', (req, res) => {
    const { email } = req.body;

    const error = validationResult(req)

    if (!error.isEmpty()) {
        const firstError = error.array().map(err => err.msg)[0]

        return res.status(422).json({
            error: firstError
        })
    } else {
        User.findOne(
            {
            email
            },
            (err, user) => {
                if (err || user) {
                    return res.status(400).json({
                        error: 'User with that email does not exist'
                    })
                }

                const token = jwt.sign(
                    {
                        _id: user._id,
                    },
                    process.env.JWT,
                    {
                        expiresIn: '7d'
                    }
                )

                const emailData = {
                    from: process.env.EMAIL_FROM,
                    to: email,
                    subject: `Password Reset link`,
                    html: `
                              <h1>Please use the following link to reset your password</h1>
                              <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                              <hr />
                              <p>This email may contain sensetive information</p>
                              <p>${process.env.CLIENT_URL}</p>
                        `
                };

                return user.updateOne(
                    {
                        resetPasswordLink: token
                    },

                    (err, success) => {
                        if (err) {
                            console.log('RESET PASSWORD LINK ERROR', err);
                            return res.status(400).json({
                                error:
                                'Database connection error on user password forgot request'
                            });
                        } else {
                            sgMail
                            .send(emailData)
                            .then(sent => {
                                console.log('SIGNUP EMAIL SENT', sent)
                                return res.json({
                                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                                  });
                            })
                            .catch(err => {
                                return res.json({
                                    message: err.message
                                  });
                            })
                        }
                    }
                )
            }
        )
    }
})

module.exports = router
