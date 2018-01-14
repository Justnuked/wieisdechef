var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();
var token = '';

chai.use(chaiHttp);

describe('overview API functionalities', function() {
	
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
	
	it('should respond when I have a token', function(done) {
		chai.request(server)
			.get('/api/session/overview')
			.set('X-Access-Token', token)
			.end(function(error, result) {
				result.should.have.status(200);
				result.should.be.json;
				result.body.should.be.an('array');
				done();
			});
	});
	
		it('should not respond when I dont have a token', function(done) {
		chai.request(server)
			.get('/api/session/overview')
			.end(function(error, result) {
				result.should.have.status(401);
				result.should.be.json;
				result.body.should.be.an('object');
				result.body.should.have.property('error');
				done();
			});
	});
});