let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url = 'http://localhost:2021';

describe('Password :', ()=>{
    it('should be correct', (done) => {
        chai.request(url)
        .post('/api/updatePassword')
        .send({email: 'bkevin1052@gmail.com'})
        .end( (err, res) =>{
            expect(res.body.mensaje).to.equals('Por favor revisar su correo electrónico, si no sale en principal también revisar Spam.');
            done(); 
        });
    });
});

describe('Password :', ()=>{
    it('should be fail', (done) => {
        chai.request(url)
        .post('/api/updatePassword')
        .send({email: 'bkevin10532@gmail.com'})
        .end( (err, res) =>{
            expect(res.body.mensaje).to.equals('No se encuentra el correo ingresado, ingresar nuevamente.');
            done(); 
        });
    });
});