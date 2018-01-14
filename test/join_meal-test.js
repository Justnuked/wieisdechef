var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var chould = chai.should();

chai.use(chaiHttp);

describe('joinmeal API funtionalities', function() {
	
	it('should not participate in dinner without dinnerID', function(done) {
		let participate = {
			dinnerid: "NULL",
			studentid: 1
		}
		chai.request(server)
			.post('/api/session/joinmeal')
			.send(participate)
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
			studentid: "NULL"
		}
		chai.request(server)
			.post('/api/session/joinmeal')
			.send(participate)
			.end(function(error, result) {
				result.should.have.status(404);
				result.should.be.json;
				result.body.should.be.an('object');
				result.body.should.have.property('error');
				done();
			});
	});
});