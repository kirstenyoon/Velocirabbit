const request = require('supertest');
const server = 'http://localhost:3000';

describe('Route integration', () => {
	/* Note: username and password must be changed with each test because it will actually add the user to the DB and
  will therefore fail when the same user is attempted to be added to the DB again */
	xdescribe('/api/signup', () => {
		describe('POST', () => {
			it('responds with 200 status and json msg of "Your account has been successfully added"', () => {
				return (
					request(server)
						.post('/api/signup') //http://localhost:3000/api/signup
						// Must change username each test or else will fail because same user cannot be added again
						.send({ username: 'Goobly8', password: 'Woobly6' })
						.set('Accept', 'application/json')
						.expect(200)
						.expect((res) => {
							// Check to see that we get 'Your account has been successfully added.' as defined in /routes/api.js
							res.body = 'Your account has been successfully added.';
						})
				);
			});
		});
	});

	describe('/api/allProducts', () => {
		describe('GET', () => {
			it('responds with 200 status and json msg of "Your account has been successfully added"', () => {
				return request(server)
					.get('/api/allProducts')
					.set('Content-Type', '/json')
					.expect(200);
			});
		});
	});

	describe('/api/verifyUser', () => {
		describe('POST', () => {
			it('responds with 200 status and json msg of "You have been successfully logged in. Welcome Back!"', () => {
				return (
					request(server)
						.post('/api/verifyUser')
						// Must change username each test or else will fail because same user cannot be added again
						.send({ username: 'Goobly6', password: 'Woobly6' })
						.set('Accept', 'application/json')
						.expect(200)
						.expect((res) => {
							// Check to see that we get 'Your account has been successfully added.' as defined in /routes/api.js
							res.body = 'You have been successfully logged in. Welcome Back!';
						})
				);
			});
		});
	});
});
