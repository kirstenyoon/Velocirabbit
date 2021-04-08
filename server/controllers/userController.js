const bcrypt = require('bcryptjs');
const models = require('../models/sickBayModels');

const userController = {};

/*
Copied the userSchema here for reference:

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  access_id: { type: String, required: true },
  hashed_id: { type: String, required: true },
});
*/

// ADD USER TO DATABASE:
// userController.addUser = (req, res, next) => {
//   const { username, password } = req.body;
//   const salt = bcrypt.genSaltSync(10);
//   const hash = bcrypt.hashSync(password, salt);
//   models.User.create({ username, password: hash },
//     (err) => {
//       if (err) return next({ log: err, message: 'userController.addUser failed' });
//       return next();
//     });
// };

// ADD USER TO DATABASE (modified based on updated schema):
userController.addUser = (req, res, next) => {
  const { username, password, email, access_id, hashed_id } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);
  const usernameHash = bcrypt.hashSync(username, salt);
  models.User.create({ username, password: passwordHash, email, access_id, hashed_id: usernameHash },
    (err) => {
      if (err) return next({ log: err, message: 'userController.addUser failed' });
      return next();
    });
};

// GET ALL USERS FROM DATABASE ** New feature meant for admin testing/page
userController.getAllUsers = (req, res, next) => {
  models.User.find({})
    .then((data) => {
      res.locals = data;
      next();
    })
    .catch((err) => next({
      log: err,
      message: { err: 'userController.getAllUsers failed.' },
    }));
};

// VERIFY USER INFORMATION IN DB ** New feature creates a session for the user with identifying information: access_id and username
userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  models.User.findOne({ username },
    (err, user) => {
      if (err) return next({ log: err, message: 'userController.verifyUser failed' });
      if (user === null) {
        res.locals = 'The username and password you entered did not match our records. Please double-check and try again.';
        return next();
      }
      const verified = bcrypt.compareSync(password, user.password);
      if (verified) {
        req.session.auth = { username: user.username, access_id: user.access_id }
        res.locals = 'You have been successfully logged in. Welcome Back!';
      } else {
        res.locals = 'The username and password you entered did not match our records. Please double-check and try again.';
      }
      return next();
    });
}

userController.logout = (req, res, next) => {
  req.session.destroy(function (err) {
    if(err) {
      return next(err);
    }
    next();
  })
}

module.exports = userController;
