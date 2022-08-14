const router = require('express').Router();
const {OAuth2Client} = require('google-auth-library')
const {User} = require('../module/User')
const jwt = require('jsonwebtoken')

const client = new OAuth2Client('270521151776-ebm0n7oahpn7c4ta978uie6udr6o1ejc.apps.googleusercontent.com')

router.post('/', (req, res) => {
    const {idToken} = req.body

    client.verifyIdToken({idToken, audience: '270521151776-ebm0n7oahpn7c4ta978uie6udr6o1ejc.apps.googleusercontent.com'})
          .then(response => {

        const { email_verified, name, email } = response.payload;

        if (email_verified) {
            User.findOne({email}).exec((err, user) => {
                if (user) {
                    const token = jwt.sign({_id: user._id}, process.env.JWT, {
                        expiresIn: '7d'
                    })

                    const { _id, name, email } = user;
                    
                    return res.json({
                        token, 
                        user: { _id, name, email }
                    });
                } else {
                    let password = email + process.env.JWT

                    user = new User({name, email, password});

                    user.save((err, data) => {
                        if (err) {
                            console.log('ERROR GOOGLE LOGIN ON USER SAVE', err)
                            return res.status(400).json({
                                error: 'User signup failed with google' 
                            })
                        }

                        const token = jwt.sign(
                            { _id: data._id },
                            process.env.JWT,
                            { expiresIn: '7d' }
                        )

                        const { _id, name, email } = data

                        return res.json({
                            token,
                            user: { _id, name, email }
                        })
                    })
                }
            })
        } else {
            return res.status(400).json({
                error: 'Google login failed. Try again'
            })
        }
})

})

module.exports = router