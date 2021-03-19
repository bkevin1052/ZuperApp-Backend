const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

//Inicializacion
const app = express();

//Settings
app.set('port',3000);

//Middlewares
app.use(morgan('dev'));

const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename(req,file,cb){
        cb(null,new Date().getTime()+ path.extname(file.originalname));
    }
})

app.use(multer({storage}).single('image'));

app.use(express.urlencoded({extended:false}));

app.use(express.json());

//Rutas

app.use(require('./route/login'));

// Start Server
app.listen(app.get('port'),()=>{

    console.log('Server on port',app.get('port'));
    
})