module.exports = function (app) {

    app.post('/api/course/:courseId/section', createSection);
    app.delete('/api/section/:sectionId', deleteSection);
    app.put('/api/section/:sectionId', updateSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse)

    app.get('/api/student/section', findSectionsForStudent)
    app.get('/api/section/:sectionId/student', findStudentsForSection)

    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function findSectionsForCourse(req, res) {
        var courseId = req.params['courseId'];
        sectionModel
            .findSectionsForCourse(courseId)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function createSection(req, res) {
        var section = req.body;
        sectionModel
            .createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }


    function findSectionsForStudent(req, res) {
        var user = req.session['currentUser'];
        enrollmentModel
            .findSectionsForStudent(user._id)
            .then(function (enrollments) {
                res.json(enrollments);
            })
    }

    function findStudentsForSection(req, res) {
        enrollmentModel
            .findStudentsForSection(req.params.sectionId)
            .then(function (enrollments) {
                res.json(enrollments);
            })
    }

    function deleteSection(req, res) {
        var sectionId = req.params['sectionId'];
        sectionModel
            .deleteSection(sectionId)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function updateSection(req, res) {
        var section = req.body;
        sectionModel
            .updateSection(section)
            .then(function (section) {
                res.json(section);
            })
    }
};