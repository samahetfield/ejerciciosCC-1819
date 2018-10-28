var request = require('supertest'),
	app = require('../app.js');

	describe( "PUT demo-app", function() {
		it('should create', function (done) {
		request(app)
			.put('/demo-app/3/1')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200,done);
		});
	});
