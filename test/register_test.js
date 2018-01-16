var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();
var token = '';

chai.use(chaiHttp);

describe('register api functions', function() {
	
	
	it('should register', function(done) {
		let user = {'username' : 'henk',
					'password': '123'};
		
		chai.request(server)
			.post('/api/register')
			.send(user)
			.end(function(error, result) {
				result.should.have.status(200);
				result.should.be.json;
				result.body.should.be.an('object');
				done();
			});
	});
	
	
	it('should not register the same name twice', function(done) {
		let user = {'username' : 'henk',
					'password': '123'};
		
		chai.request(server)
			.post('/api/register')
			.send(user)
			.end(function(error, result) {
				result.should.have.status(404);
				result.should.be.json;
				result.body.should.be.an('object');
				result.body.should.have.property('error');
				done();
			});
	});
});