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

// ADD USER TO DATABASE (modified based on updated schema):
userController.addUser = (req, res, next) => {
  const { username, password, email, access_id, hashed_id } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  models.User.create({ username, password: hash, email, access_id, hashed_id },
    (err) => {
      if (err) return next({ log: err, message: 'userController.addUser failed' });
      return next();
    });
};

// VERIFY USER INFORMATION IN DB
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
      if (verified) res.locals = 'You have been successfully logged in. Welcome Back!';
      else res.locals = 'The username and password you entered did not match our records. Please double-check and try again.';
      return next();
    });
}

module.exports = userController;
