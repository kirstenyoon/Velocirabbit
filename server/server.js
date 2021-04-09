const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv').config();
const api = require('./routes/api');
const app = express();
const PORT = process.env.PORT || 3000;

// Since fetch was unable with an endpoint, used cors to fetch with an entire url
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This will immediately create a session with null value. It will be sent to the client when they access our site
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		name: 'sickbay-cookie',
		cookie: {
			httpOnly: true,
			maxAge: 1 * 60 * 60 * 24 * 1000, // if not defined then session will be destroyed on condition i.e. exiting browser
		},
	})
);

// Endpoint for all defined routes and controllers
app.use('/api', api);

// Catch-all endpoint for non-existing routes
app.use((req, res, next) => {
	res.status(404).send('Page does not exist.');
});

// Error handler
const defaultErr = {
	log: 'Express error handler caught unknown middleware error',
	status: 400,
	message: { err: 'An error occurred' },
};

// Global error handler
app.use((err, req, res, next) => {
	const errorObj = Object.assign(defaultErr, err);
	res.status(errorObj.status).json(errorObj.message);
});

// Listen on PORT
app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
