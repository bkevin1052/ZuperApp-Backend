const { Router } =  require('express');
const router = Router();

const path = require('path');
const { unlink } = require('fs-extra');

const List = require('../models/List');

router.post('/createlist', async (req, res) => {

    var username = req.body.username;
    var namelist = req.body.name;
    var description = req.body.description;
    const newList = new List({ username, namelist, description});
    console.log(newList)
    await newList.save();
    res.json({token: '', username: username,mensaje: "Lista registrada correctamente!",codigo: '100'});
    res.end();
});

router.post('/editlist', async (req, res) => {

    let doc = await List.findOneAndUpdate({username:req.body.username,namelist:req.body.name }, {namelist:req.body.name, description:req.body.description,items:req.body.items});
    res.json({token: '', username: req.body.username,mensaje: "Lista actualizada correctamente!",codigo: '100'});
    res.end();
});

router.post('/getlists', async (req, res) => {

    const lists = await List.find({username:req.body.username});
    res.json(lists);
    res.end();
});


module.exports = router;