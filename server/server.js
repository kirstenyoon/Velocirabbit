const express = require('express');

const app = express();
// require in cors
const cors = require('cors');
const api = require('./routes/api');
// ** New feature require
// require express-session to store user verification information in a session that will be sent in a cookie
// const session = require('express-session');

// Since fetch was unable with an endpoint, used cors to fetch with an entire url
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ** New feature for creating a session
// This will immediately create a session with null value. It will be sent to the client when they access our site
// app.use(session({
// 	secret: 'wooblify', // secret taken from ----- to be implemented!
// 	cookie: {
// 		httpOnly: true, // make it http only
// 		// maxAge: 1 * 60 * 60 * 24 * 1000 // max age of 2 hours, if this is not set then the session will be destroyed on a condition like exiting the browser
// 	}
// }))

app.use('/api', api);

// error handler
const defaultErr = {
	log: 'Express error handler caught unknown middleware error',
	status: 400,
	message: { err: 'An error occurred' },
};

app.use((req, res, next) => {
	res.status(404).send('Nothing to see here.');
});

// global error handler
app.use((err, req, res, next) => {
	const errorObj = Object.assign(defaultErr, err);
	res.status(errorObj.status).json(errorObj.message);
});

// listen to port 3000
app.listen(3000, () => console.log('Server Running'));
