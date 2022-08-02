const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/LambtonCollege";

const courseSchema = new mongoose.Schema({
	id: Number,
	title: String,

});

mongoose.connect(url).catch(error => {
	console.log(error);
});

mongoose.connection.on('error', err => {
	console.log('Error occurred.');
})

const Course = mongoose.model('Course', courseSchema);


let  listCourses = () => {
	return mongoose.connect(url)
		.then((db) => {
			const data = Course.find({});
			return data;
		});
}


let addCourse = (course) => {
	return mongoose.connect(url)
	.then((db) => {
		return new Course(course).save();
	});

}

let removeCourse = (id) => {
	return mongoose.connect(url)
		.then((db) => {
			const data = Course.remove({ id: id }, (err) => {
				return false;
			});
			return true;
		});
}

let modifyCourse = (id, new_data) => {
	return mongoose.connect(url)
		.then((db) => {
			const data = Course.updateOne({ id: id }, {
				title: new_data.title,
			},
			{upsert: true});
			return data;
		});
}

let  getNewId = () => {
	return mongoose.connect(url)
		.then((db) => {
			const data = Course.findOne().sort({ id: -1 }).limit(1);
			return data;
		});
}


let  getCourseById = (id) => {
	return mongoose.connect(url)
		.then((db) => {
			const data = Course.findOne({id: id});
			return data;
		});
}

module.exports = {
	addCourse,
	listCourses,
	removeCourse,
	modifyCourse,
	getNewId,
	getCourseById
}