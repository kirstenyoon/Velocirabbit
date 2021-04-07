const express = require("express");

const app = express();
// require in cors
const cors = require("cors");
const api = require("./routes/api");

// Since fetch was unable with an endpoint, used cors to fetch with an entire url
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

// error handler
const defaultErr = {
	log: "Express error handler caught unknown middleware error",
	status: 400,
	message: { err: "An error occurred" },
};

app.use((req, res, next) => {
	res.status(404).send("Nothing to see here.");
});

// global error handler
app.use((err, req, res, next) => {
	const errorObj = Object.assign(defaultErr, err);
	res.status(errorObj.status).json(errorObj.message);
});

// listen to port 3000
module.exports = app.listen(3000, () => console.log("Server Running"));
