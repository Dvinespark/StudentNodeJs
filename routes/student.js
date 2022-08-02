var express = require('express');
var router = express.Router();
var students = require('../models/student.js');
var courses = require('../models/course.js');

// /student get request
router.get('/', function (req, res, next) {
	
	let course_options = {};
	courses.listCourses().then(course_data => {
		course_options = course_data;
	});
	students.listStudents().then(data => {
		
		console.log(data.length);
  		res.render('student/index', { title: 'Express', data });
	});
});

// /create get request
router.get('/create', function (req, res, next) {
	
	let course_options = {};
	courses.listCourses().then(course_data => {
		course_options = course_data;
  		res.render('student/create', { title: 'Express', course_options });
	});

});

// create student post request
router.post('/create', function (req, res, next) {
	
	students.getNewId().then(data => {
		console.log(data.id + 1);
		req.body.id = data.id + 1;
		students.addStudent(req.body).then(result => {
			res.redirect('/student');
		});

	});

});

// delete request 
router.get('/delete/:id', function (req, res, next) {
	students.removeStudent(req.params.id).then(response => {
		res.redirect('/student');
	})

});
	
// update student get request
router.get('/update/:id', function (req, res, next) {
	let data = {};
	let course_options = {};
	students.getStudentById(req.params.id).then(out => {
		data = out;
		courses.listCourses().then(course_data => {
			course_options = course_data;
  			res.render('student/update', { title: 'Update', data, course_options });
		});
	})

});

// update student post request
router.post('/update', function (req, res, next) {
	students.modifyStudent(req.body.id, req.body).then(out => {
		res.redirect('/student');
	});

});


module.exports = router;
