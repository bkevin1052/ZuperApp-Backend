const { Router } =  require('express');
const router = Router();

const path = require('path');
const { unlink } = require('fs-extra');



const User = require('../models/User');

router.get('/', async (req, res) => {
    const users = await User.find().sort('-_id');
    res.json(users);
});

router.post('/', async (req, res) => {
    const { username, password, email,name,surname,phone} = req.body;
    const newUser = new User({ username, password, email,name,surname,phone});
    console.log(newUser)
    await newUser.save();
    res.json({'message': 'User Saved'});
});




module.exports = router;