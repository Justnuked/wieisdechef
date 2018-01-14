var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();

chai.use(chaiHttp);

describe('allmeals API functionalities', function() {
	
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
	
	it('should successfully get all meals', function(done) {
		chai.request(server)
			.get('/api/session/allmeals')
			.set('X-Access-Token', token)
			.end(function(error, result) {
				result.should.have.status(200);
				result.should.be.json;
				result.body.should.be.an('array');
				done();
			});
	});
});