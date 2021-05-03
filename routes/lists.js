const { Router } =  require('express');
const router = Router();

const path = require('path');
const { unlink } = require('fs-extra');

const List = require('../models/List');
const Product = require('../models/Product');
const ConfigCorreoLista = require('../correo/ConfigCorreoLista');

createlist = router.post('/createlist', async (req, res) => {

    var username = req.body.username;
    var namelist = req.body.name;
    var description = req.body.description;
    const newList = new List({ username, namelist, description});
    console.log(newList)
    await newList.save();
    res.json({token: '', username: username,mensaje: "Lista registrada correctamente!",codigo: '100'});
    res.end();
});

editlist = router.post('/editlist', async (req, res) => {

    let doc = await List.findOneAndUpdate({username:req.body.username,namelist:req.body.name }, {namelist:req.body.name, description:req.body.description,items:req.body.items});
    res.json({token: '', username: req.body.username,mensaje: "Lista actualizada correctamente!",codigo: '100'});
    res.end();
});

getlists = router.post('/getlists', async (req, res) => {

    const lists = await List.find({username:req.body.username});
    res.json(lists);
    res.end();
});

getitems = router.post('/getitems', async (req, res) => {

    var x = req.body._id;
    List.findById(x, function (err, items) {
        if (err){
            console.log(err);
        }
        else{
            console.log(items)
            res.json(items);
            res.end();
        }
    });
});

deletelist = router.post('/deletelist', async (req, res) => {

    var x = req.body._id;
    List.deleteOne({_id:x},function (err) {
        if (err){
            console.log(err);
        }
        else{
            res.json({token: '', username:'',mensaje: "Lista eliminada correctamente!",codigo: '100'});
            res.end();
        }
    });
});


getproducts = router.get('/getproducts', async (req, res) => {

    const products = await Product.find().sort('-_id');
    res.json(products);
});


additems = router.post('/additems', async (req, res) => {

    var name = req.body.name;
    var description = req.body.description;
    var price = req.body.price;
    var x = req.body.id;
    const list = await List.findOne({_id:x});
    const newProduct = new Product({ name, description, price});
    list.products.push(newProduct)
    console.log(list)
    let doc = await List.findOneAndUpdate({_id:x}, {products:list.products});
    res.json({token: '', username: '',mensaje: "Producto agregado correctamente.",codigo: '100'});
    res.end()
});


sendlist = router.post('/sendlist', async (req, res) => {

    var email = req.body.email;
    var x = req.body.id;
    const list = await List.findOne({_id:x});

    let body  = ''

    for(i in list.products){

            body += 'name:' + list.products[i].name + '\ndescription:' + list.products[i].description + '\nprice:' + list.products[i].price;
    }

    if(list){

        ConfigCorreoLista(email,body);
        res.json({token: '', username: '',mensaje: "Lista enviada correctamente.",codigo: '100'});

    }else{

        res.json({token: '', username: '',mensaje: "Erro al enviar lista.",codigo: '201'});
    }
    res.end()
});




module.exports = router;