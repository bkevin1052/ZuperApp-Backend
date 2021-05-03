let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url = 'http://localhost:2021';
// const url = 'http://18.207.236.58:3000';

describe('Lista :', ()=>{
    it('should be correct createlist', (done) => {
        chai.request(url)
        .post('/api/lists/createlist')
        .send({username: 'bkevin1052',name: 'bkevin1052',description:'Pruebas'})
        .end( (err, res) =>{
            expect(res.body.mensaje).to.equals('Lista registrada correctamente!');
            done(); 
        });
    });
});

describe('Lista :', ()=>{
    it('should be correct editlist', (done) => {
        chai.request(url)
        .post('/api/lists/editlist')
        .send({username: 'bkevin1052',name: 'bkevin1052',description:'Pruebas',items:[]})
        .end( (err, res) =>{
            expect(res.body.mensaje).to.equals('Lista actualizada correctamente!');
            done(); 
        });
    });
});