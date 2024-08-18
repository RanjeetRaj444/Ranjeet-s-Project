const { Router } = require("express");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = Router();

userRouter.post("/register", async (req, res) => {
	try {
		const email = req.body.email;
		const user = await UserModel.findOne({ email });
		if (user) {
			res.status(400).json({ message: "user already registered" });
		} else {
			bcrypt.hash(req.body.password, 10, async (error, hash) => {
				try {
					if (hash) {
						const newUser = new UserModel({
							...req.body,
							password: hash,
						});
						await newUser.save();
						res.status(200).json({ message: "user register sucessFully" });
					}
				} catch (error) {
					res.status(200).send({ message: error.message });
				}
			});
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

userRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);

	try {
		const user = await UserModel.findOne({ email });
		if (user) {
			bcrypt.compare(password, user.password, (error, result) => {
				if (result) {
					let token = jwt.sign({ userID: user._id }, "studyBuddy");
					res
						.status(200)
						.json({ message: "user logged in Sucessfully", token, user });
				} else {
					res.status(202).json({ message: "Incorrect Password" });
				}
			});
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = userRouter;
