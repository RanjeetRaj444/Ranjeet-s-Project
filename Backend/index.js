const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes/ProjectsRoutes");
require("dotenv").config();
const app = express();
app.use(cors());

app.use(express.json());

app.use("/projects", router);

app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT, async () => {
	try {
		await mongoose.connect(process.env.DATA_BASE_URL);
		console.log("database connected");
	} catch (err) {
		console.log({ error: err.message });
	}
	console.log("App is listening on port ", process.env.PORT);
});
