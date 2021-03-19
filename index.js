const express = require('express')

//Inicializacion

const app = express();

//Settings

app.set('port',3000);

// Start Server

app.listen(app.get('port'),()=>{

    console.log('Server on port',app.get('port'));
    
})