const express = require("express");
const Projectsmodels = require("../models/ProjectModels");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/", async (req, res) => {
	const id = req.query._id;
	let querry = {};
	if (id) {
		querry._id = id;
	}
	if (req.user.userID) {
		querry.userId = req.user.userID;
	}
	try {
		const data = await Projectsmodels.find(querry);
		res.status(200).send({ data: data });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});
router.get("/search", async (req, res) => {
	const { q, sortBy, page, limit } = req.query;
	const query = {};
	if (q) {
		query.title = new RegExp(q, "i");
	}
	try {
		const data = await Projectsmodels.find(query)
			.sort(sortBy || "title")
			.skip((page - 1) * limit)
			.limit(parseInt(limit));
		res.send(data);
	} catch (error) {
		res.status(500).send(error);
	}
});
const cpUpload = upload.fields([
	{ name: "image", maxCount: 1 },
	{ name: "techStach", maxCount: 20 },
]);
router.post("/post", cpUpload, async (req, res) => {
	// console.log(req.body);
	const project = {
		image: req.body.image || "",
		title: req.body.title || "",
		github: req.body.github || "",
		demo: req.body.demo || "",
		projectType: req.body.projectType || "",
		des: req.body.des || "",
		techStach: [],
	};
	// console.log(req.files);
	if (req.files.techStach) {
		let path = "";
		req.files.techStach.forEach(function (files, index, arr) {
			path = path + files.path + ",";
		});
		path = path.substring(0, path.lastIndexOf(","));
		// console.log(path);
		project.techStach = path.split(",");
	}
	if (req.files.image) project.image = req.files.image[0].path;
	console.log(project);
	try {
		const exist = await Projectsmodels.findOne({ title: project.title });
		if (exist)
			res
				.status(200)
				.send({ project: exist, msg: "Project is already exist!😒" });
		const data = await Projectsmodels.create(project);
		res.status(200).send({ data: data, msg: "Project stored in database😊" });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});
router.patch("/update/:id", cpUpload, async (req, res) => {
	const project = req.body;
	// console.log(req.body, "hello");
	// if (req.files.techStach) {
	// 	let path = "";
	// 	req.files.techStach.forEach(function (files, index, arr) {
	// 		path = path + files.path + ",";
	// 	});
	// 	path = path.substring(0, path.lastIndexOf(","));
	// 	// console.log(path);
	// 	project.techStach = path.split(",");
	// }
	// console.log(req.files.image[0].path)
	// if (req.files.image) project.image = req.files.image[0].path;
	// console.log(project);
	try {
		const exist = await Projectsmodels.findById({ _id: req.params.id });
		if (!exist) {
			res.status(400).send("Project is not avilable!🤷‍♂️");
		}
		const data = await Projectsmodels.findByIdAndUpdate(
			{ _id: req.params.id },
			project,
			{ new: true },
		);
		res.status(200).send({ data: data });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});
router.delete("/delete/:id", async (req, res) => {
	id = req.params.id;
	try {
		const exist = await Projectsmodels.findById({ _id: id });
		if (!exist) {
			res.status(400).send("Project is not avilable!🤷‍♂️");
		}
		const data = await Projectsmodels.findByIdAndDelete({ _id: id });
		res.status(200).send({ msg: "Project is deleted. ✔" });
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

module.exports = router;
