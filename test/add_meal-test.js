var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();

chai.use(chaiHttp);

describe('addmeal API functionalities', function() {
	
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
	
	it('should not post to addmeal without a meal name', function(done) {
		let meal = {
			name: null,
			price: 1,
			maxPeople: 6
		}
		chai.request(server)
			.post('/api/session/addmeal')
			.set('X-Access-Token', token)
			.send(meal)
			.end(function(error, result) {
				result.should.have.status(404);
				result.should.be.json;
				result.body.should.be.an('object');
				result.body.should.have.property('error');
				done();
			});
	});
	
	it('should not post to addmeal without a meal price', function(done) {
		let meal = {
			name: 'pizza',
			price: null,
			maxPeople: 6
		}
		chai.request(server)
			.post('/api/session/addmeal')
			.set('X-Access-Token', token)
			.send(meal)
			.end(function(error, result) {
				result.should.have.status(404);
				result.should.be.json;
				result.body.should.be.an('object');
				result.body.should.have.property('error');
				done();
			});
	});
	
	it('should not post to addmeal without max people filled in', function(done) {
		let meal = {
			name: 'pizza',
			price: 6,
			maxPeople: null
		}
		chai.request(server)
			.post('/api/session/addmeal')
			.set('X-Access-Token', token)
			.send(meal)
			.end(function(error, result) {
				result.should.have.status(404);
				result.should.be.json;
				result.body.should.be.an('object');
				result.body.should.have.property('error');
				done();
			});
	});
});