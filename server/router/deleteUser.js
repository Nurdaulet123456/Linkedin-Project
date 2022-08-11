const router = require('express').Router();
const { User } = require('../module/User')

router.post('/', async (req, res) => {
    const { _id } = req?.body

    await User.findByIdAndDelete(_id, (err) => {
        if (err) throw err
    })

    res.status(200).send({message: 'Success'})
})

module.exports = router;