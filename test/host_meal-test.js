var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();

chai.use(chaiHttp);

describe('hostmeal API functionalities', function() {
	
	it('should not post to hostmeal without a chefID', function(done) {
		let dinner = {
			chefID: "NULL",
			mealID: 1,
			date: "2018-02-21 18:00:00"
		}
		chai.request(server)
			.post('/api/session/hostmeal')
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
			mealID: "NULL",
			date: "2018-02-21 18:00:00"
		}
		chai.request(server)
			.post('/api/session/hostmeal')
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
			date: "NULL"
		}
		chai.request(server)
			.post('/api/session/hostmeal')
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