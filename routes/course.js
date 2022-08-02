var express = require('express');
var router = express.Router();
var students = require('../models/student.js');
var courses = require('../models/course.js');

// /course get request
router.get('/', function (req, res, next) {
	
	courses.listCourses().then(data => {
  		res.render('course/index', { data });
	});
});

// /course/create get request
router.get('/create', function (req, res, next) {
	
    res.render('course/create', { });

});

// /course/create post request
router.post('/create', function (req, res, next) {
	
	courses.getNewId().then(data => {
		req.body.id = data.id + 1;
		courses.addCourse(req.body).then(result => {
			res.redirect('/course');
		});

	});

});

// delete request 
router.get('/delete/:id', function (req, res, next) {
	courses.removeCourse(req.params.id).then(response => {
    res.redirect('/course');

	})

});
	
// /course/update/:id get request
router.get('/update/:id', function (req, res, next) {
  courses.getCourseById(req.params.id).then(data => {
    res.render('course/update', { title: 'Update', data });
  });

});

// /course/update put request
router.post('/update', function (req, res, next) {
	courses.modifyCourse(req.body.id, req.body).then(out => {
		res.redirect('/course');
	});

});


module.exports = router;

