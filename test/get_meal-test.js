var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();

chai.use(chaiHttp);

describe('getmeal API functionalities', function() {
	
	before(function(done){
		let login = {
			username : 'sjef',
			password : '123'
		}
		chai.request(server)
			.post('/api/login')
			.send(login)
			.end(function(error, result){
				result.should.have.status(200);
				result.should.be.json;
				result.should.be.an('object');
    
				token = result.body.token;
				done();
			});
  
	});
	
	it('should successfully get a meal', function(done) {
		chai.request(server)
			.get('/api/session/getmeal?id=1')
			.set('X-Access-Token', token)
			.end(function(error, result) {
				result.should.have.status(200);
				result.should.be.json;
				result.body.should.be.an('object');
				done();
			});
	});
	
	it('should give an error when no id is given', function(done) {
		chai.request(server)
			.get('/api/session/getmeal')
			.set('X-Access-Token', token)
			.end(function(error, result) {
				result.should.have.status(404);
				result.should.be.json;
				result.body.should.be.an('object');
				result.body.should.have.property('error')
				done();
			});
	});
});