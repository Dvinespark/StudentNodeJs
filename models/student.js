const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/LambtonCollege";

const studentSchema = new mongoose.Schema({
	id: Number,
	firstname: String,
	lastname: String,
	semester: String,
	courses: [{ type: String }]

});

mongoose.connect(url).catch(error => {
	console.log(error);
});

mongoose.connection.on('error', err => {
	console.log('Error occurred.');
})

const Student = mongoose.model('Student', studentSchema);

// add student
let addStudent = (student) => {
	return mongoose.connect(url)
	.then((db) => {
		return new Student(student).save();
	});

}

// get all students
let  listStudents = () => {
	return mongoose.connect(url)
		.then((db) => {
			const data = Student.find({});
			return data;
		});
}

// delete student from database
let removeStudent = (id) => {
	return mongoose.connect(url)
		.then((db) => {
			const data = Student.findOneAndRemove({ id: id }, (err) => {
				console.log(err);
				return false;
			});
			return true;
		});
}

// update student
let modifyStudent = (id, new_data) => {
	return mongoose.connect(url)
		.then((db) => {
			const data = Student.updateOne({ id: id }, {
				firstname: new_data.firstname,
				lastname: new_data.lastname,
				semester: new_data.semester,
				courses: new_data.courses
			},
			{upsert: true});
			return data;
		});
}

// setting id for new insertion
let  getNewId = () => {
	return mongoose.connect(url)
		.then((db) => {
			const data = Student.findOne().sort({ id: -1 }).limit(1);
			return data;
		});
}

// get student by id
let  getStudentById = (id) => {
	return mongoose.connect(url)
		.then((db) => {
			const data = Student.findOne({id: id});
			return data;
		});
}

module.exports = {
	addStudent,
	listStudents,
	removeStudent,
	modifyStudent,
	getNewId,
	getStudentById
}