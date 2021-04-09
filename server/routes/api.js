const express = require('express');
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');
const router = express.Router();

// ################## USER ROUTES ##################
// GET ALL USERS ** New feature router for admin testing/page
router.get('/allUsers', userController.getAllUsers, (req, res) => {
	res.status(200).json(res.locals);
});

// GET A SPECIFIC USER BY USERNAME
router.get('/user', userController.getUser, (req, res) => {
	res.status(200).json(res.locals.user);
});

// ADD NEW USER TO DATABASE
router.post('/signup', userController.addUser, (req, res) => {
	res.redirect('/');
	// res.status(200).json('Your account has been successfully added.');
});

// UPDATE USER INFO
router.put('/updateUser', userController.updateUserInfo, (req, res) => {
	res.status(200).json(res.locals.user);
});

// VERIFY USER INFORMATION FROM DB
router.post('/verifyUser', userController.verifyUser, (req, res) => {
	res.redirect('/');
	// res.status(200).json(res.locals);
});

// CHECK SESSION **  New feature for testing if express-session is working properly
router.get('/checkSession', (req, res) => {
	res.status(200).json(req.session.auth);
});

// LOGOUT USER AND DELETE SESSION **  New feature for logging out and deleting a user's session information. Redirects to homepage after succesful logout.
router.get('/logout', userController.logout, (req, res) => {
	// if (res.locals) {
	// 	return res.status(400).json(res.locals);
	// }
	res.redirect('/');
});

// ################## PRODUCT ROUTES ##################
// ADD NEW PRODUCTS
router.post('/product', productController.addProducts, (req, res) => {
	res.status(200).json(res.locals);
});

// GET ALL PRODUCTS
router.get('/allProducts', productController.getProducts, (req, res) => {
	res.status(200).json(res.locals);
});

// GET ALL ITEMS THAT PERTAIN TO THE SEARCHED NAME OF ITEM
router.post(
	'/productSearch',
	productController.getSearchedProducts,
	(req, res) => {
		res.status(200).json(res.locals);
	}
);

// GET FIRST 8 IMAGES
router.get('/topProducts', productController.getTopProducts, (req, res) => {
	res.status(200).json(res.locals);
});

// GET CATEGORY LIST
router.get('/categoryList', productController.getCategoryList, (req, res) => {
	res.status(200).json(res.locals);
});

// GET SPECIFIC CATEGORY PRODUCTS
router.get(
	'/categoryProducts',
	productController.categoryProducts,
	(req, res) => {
		res.status(200).json(res.locals);
	}
);

// ============ !!!DANGER DANGER DANGER!!! ============
// DELETE ALL PRODUCS FROM DATABASE
router.delete('/product', productController.deleteProducts, (req, res) => {
	res.status(200).json('database cleaned!');
});

module.exports = router;
