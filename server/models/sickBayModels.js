const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// const { MONGO_URI } = process.env;
const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oxti2.mongodb.net/sickBayDB?retryWrites=true&w=majority`;

mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: 'sickBay',
	})
	.then(() => console.log('Connected to Mongo DB.'))
	.catch((err) => console.log(err));

const { Schema } = mongoose;

const productSchema = new Schema({
	Title: { type: String, required: true },
	Description: String,
	Category: String,
	ImageURL: String,
	Price: Number,
	Quantity: Number,
});

const Product = mongoose.model('product', productSchema);

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	access_id: { default: '0', type: String, required: true },
	hashed_id: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = {
	Product,
	User,
};
