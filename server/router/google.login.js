const router = require('express').Router();
const {OAuth2Client} = require('google-auth-library')
const {User} = require('../module/User')

const client = new OAuth2Client('270521151776-ebm0n7oahpn7c4ta978uie6udr6o1ejc.apps.googleusercontent.com')

router.post('/', (req, res) => {
    const {tokenId} = req.body

    client.verifyIdToken({idToken: tokenId, audience: '270521151776-ebm0n7oahpn7c4ta978uie6udr6o1ejc.apps.googleusercontent.com'}).then(response => {
        const {email_verified, name, email} = response.payload

        if (email_verified) {
            User.findOne({email}).exec((err, user) => {
                if (err) {
                    return res.status(400).json({
                        message: 'Something went wrong...'
                    })
                } else {
                    if (user) {
                        const token = user.generateAuthToken();

                        res
                          .status(200)
                          .send({ message: "Logged in successfully", token: token, user: user }); 
                    } else {
                        let password = email + process.env.JWT

                        let newUser = new User({
                            name,
                            email,
                            password
                        })

                        newUser.save((err, data) => {
                            if (err) {
                                return res.status(400).json({
                                    message: 'Something went wrong...'
                                })
                            }

                        const token = data.generateAuthToken();

                        res
                          .status(200)
                          .send({ message: "Logged in successfully", token: token, user: newUser }); 
                        })
                    }
                }
            })
        }
    })
})

module.exports = router