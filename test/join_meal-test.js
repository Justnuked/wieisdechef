var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();
var token = '';

chai.use(chaiHttp);

describe('joinmeal API funtionalities', function() {
	
		before(function(done){
		let	login = {
			username : 'sjef',
			password : '123'
		}
		chai.request(server)
			.post('/api/login')
			.send(login)
			.end(function(error,	result){
				result.should.have.status(200);
				result.should.be.json;
				result.should.be.an('object');
				
				token = result.body.token;
				done();
			});
		
	});
	
	it('should not participate in dinner without dinnerID', function(done) {
		let participate = {
			dinnerid: null,
			studentid: 1
		}
		chai.request(server)
			.post('/api/session/joinmeal')
			.send(participate)
			.set('X-Access-Token', token)
			.end(function(error, result) {
				result.should.have.status(404);
				result.should.be.json;
				result.body.should.be.an('object');
				result.body.should.have.property('error');
				done();
			});
	});
	
	it('should not participate in dinner without studentid', function(done) {
		let participate = {
			dinnerid: 1,
			studentid: null
		}
		chai.request(server)
			.post('/api/session/joinmeal')
			.send(participate)
			.set('X-Access-Token', token)
			.end(function(error, result) {
				result.should.have.status(404);
				result.should.be.json;
				result.body.should.be.an('object');
				result.body.should.have.property('error');
				done();
			});
	});
});