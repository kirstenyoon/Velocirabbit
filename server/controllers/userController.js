const bcrypt = require('bcryptjs');
const models = require('../models/sickBayModels');

const userController = {};

// ADD USER TO DATABASE (modified based on updated schema):
userController.addUser = (req, res, next) => {
	const { username, password, email, access_id, hashed_id } = req.body;
	const salt = bcrypt.genSaltSync(10);
	const passwordHash = bcrypt.hashSync(password, salt);
	const usernameHash = bcrypt.hashSync(username, salt);
	models.User.create(
		{
			username,
			password: passwordHash,
			email: 'c@gmail.com',
			access_id: '1',
			hashed_id: usernameHash,
		},
		(err) => {
			if (err)
				return next({ log: err, message: 'userController.addUser failed' });
			return next();
		}
	);
};

// GET USER BY USERNAME
userController.getUser = (req, res, next) => {
	const { username } = req.body;
	models.User.findOne({ username })
		.then((data) => {
			res.locals.user = data.username;
			next();
		})
		.catch((err) =>
			next({
				log: err,
				message: { err: 'userController.getUser failed.' },
			})
		);
};

// UPDATE USER INFO IN DATABASE
userController.updateUserInfo = (req, res, next) => {
	// can update only password & email
	const { access_id, email } = req.body;
	// check if the username matches with an existing username using _id:
	const condition = { _id: req.params.id };
	user
		.update(condition, { access_id: access_id, email: email })
		.then((data) => {
			if (!data)
				// fix this
				// return res.status(404).end();
				next();
		})
		.catch((err) =>
			next({
				log: err,
				message: { err: 'userController.getUser failed.' },
			})
		);
};

// GET ALL USERS FROM DATABASE ** New feature meant for admin testing/page
userController.getAllUsers = (req, res, next) => {
	models.User.find({})
		.then((data) => {
			res.locals = data;
			next();
		})
		.catch((err) =>
			next({
				log: err,
				message: { err: 'userController.getAllUsers failed.' },
			})
		);
};

// VERIFY USER INFORMATION IN DB ** New feature creates a session for the user with identifying information: access_id and username
userController.verifyUser = (req, res, next) => {
	const { username, password } = req.body;
	models.User.findOne({ username }, (err, user) => {
		if (err)
			return next({ log: err, message: 'userController.verifyUser failed' });
		if (user === null) {
			res.locals =
				'The username and password you entered did not match our records. Please double-check and try again.';
			return next();
		}
		const verified = bcrypt.compareSync(password, user.password);
		if (verified) {
			req.session.auth = { username: user.username, access_id: user.access_id };
			res.locals = 'You have been successfully logged in. Welcome Back!';
		} else {
			res.locals =
				'The username and password you entered did not match our records. Please double-check and try again.';
		}
		return next();
	});
};

// LOGOUT USER ** New feature that logs a user out by destroying the user's session that contains user information.
userController.logout = (req, res, next) => {
	req.session.destroy(function (err) {
		if (err) {
			res.locals =
				'There was a problem with logging out. Please check that you are logged in.';
			return next();
		}
		next();
	});
};

module.exports = userController;
