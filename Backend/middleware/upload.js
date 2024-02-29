const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		let ext = path.extname(file.originalname);
		// console.log(file.originalname);
		cb(
			null,
			file.filename +
				"-" +
				Date.now() +
				"-" +
				Math.round(Math.random() * 1e9) +
				ext,
		);
	},
});

// const upload = multer({
// 	storage: storage,
// 	fileFilter: (req, file, cb) => {
// 		if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
// 			cb(null, true);
// 		} else {
// 			console.log("Only png and jpg format supported!");
// 			cb(null, false);
// 		}
// 	},
// 	limits: {
// 		fieldSize: 1024 * 1024 * 2,
// 	},
// });
const upload = multer({
	storage: storage,
	fileFilter: (req, files, cb) => {
		// if (files.mimetype === "image/png" || files.mimetype === "image/jpg") {
		cb(null, true);
		// } else {
		// 	console.log("Only png and jpg format supported!");
		// 	cb(null, false);
		// }
	},
	limits: {
		fieldSize: 1024 * 1024 * 2,
	},
});
//completed---------
module.exports = upload;
