var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();

chai.use(chaiHttp);

describe('hostmeal API functionalities', function() {
	
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
	
	it('should not post to hostmeal without a chefID', function(done) {
		let dinner = {
			chefID: null,
			mealID: 1,
			date: "2018-02-21 18:00:00"
		}
		chai.request(server)
			.post('/api/session/hostmeal')
			.set('X-Access-Token', token)
			.send(dinner)
			.end(function(error, result) {
				result.should.have.status(404);
				result.should.be.json;
				result.body.should.be.an('object');
				result.body.should.have.property('error');
				done();
			});
	});
	
	it('should not post to hostmeal without a mealID', function(done) {
		let dinner = {
			chefID: 1,
			mealID: null,
			date: "2018-02-21 18:00:00"
		}
		chai.request(server)
			.post('/api/session/hostmeal')
			.set('X-Access-Token', token)
			.send(dinner)
			.end(function(error, result) {
				result.should.have.status(404);
				result.should.be.json;
				result.body.should.be.an('object');
				result.body.should.have.property('error');
				done();
			});
	});
	
	it('should not post to hostmeal without a date', function(done) {
		let dinner = {
			chefID: 1,
			mealID: 1,
			date: null
		}
		chai.request(server)
			.post('/api/session/hostmeal')
			.set('X-Access-Token', token)
			.send(dinner)
			.end(function(error, result) {
				result.should.have.status(404);
				result.should.be.json;
				result.body.should.be.an('object');
				result.body.should.have.property('error');
				done();
			});
	});
});