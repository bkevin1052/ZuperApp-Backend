const nodemailer = require('nodemailer');


module.exports = (correo,lista) =>{

    var transporter = nodemailer.createTransport({

        service : 'gmail',
        auth :{
            user:'zuperappserviceapplication@gmail.com',
            pass: 'Zuper2021'
        }


    });



const mailOptions = {
    from: 'Zuper APP',
    to: correo, //formulario.email, // Cambia esta parte por el destinatario
    subject: 'Lista de compras Zuper App',
    html:
    
    '<p><img class="center" style="display: block; margin-left: auto; margin-right: auto;" src="https://raw.githubusercontent.com/bkevin1052/ZuperApp/master/ZuperApp/icons/ZuperApp.png" alt="" width="150" height="150" /></p>'+
    '<h1 style="color: #5e9ca0; text-align: center;">Lista de compras</h1>'+
    '<p>&nbsp;</p>'+
    '<ol style="list-style: none; font-size: 14px; line-height: 32px; font-weight: bold;">'+
    '<li style="clear: both;"><h3>'+lista+'</h3></li>'+
    '</ol>'+
    '<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>'+
    '<p><strong>Si tienes alg&uacute;n problema puedes comunicarte directamente a nuestro correo electr&oacute;nico:&nbsp;&nbsp;zuperappserviceapplication@gmail.com</strong></p>'    
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
        console.log(err)
        else
        console.log(info);
        });
}

