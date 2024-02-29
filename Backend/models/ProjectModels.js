const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	image: { type: String, require: true },
	title: { type: String, require: true },
	github: { type: String, require: true },
	demo: { type: String, require: true },
	projectType: { type: String, require: true },
	des: { type: String, require: true },
	techStach: { type: Array },
});

const Projectsmodels = mongoose.model("Projects", schema);

module.exports = Projectsmodels;
