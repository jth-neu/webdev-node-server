module.exports = function (app) {

    app.post('/api/section/:sectionId/enrollment',
        enrollStudentInSection);
    app.delete('/api/section/:sectionId/withdraw',
        withdrawStudentFromSection);

    var enrollmentModel = require('../models/enrollment/enrollment.model.server');
    var sectionModel = require('../models/section/section.model.server');

    function enrollStudentInSection(req, res) {
        var user = req.session['currentUser'];
        var sectionId = req.params.sectionId;
        var enrollment = {};
        enrollmentModel
            .enrollStudentInSection(
                user._id,
                sectionId)
            .then(function (_enrollment) {
                enrollment = _enrollment;
                return sectionModel.decrementSectionSeats(sectionId);
            })
            .then(function () {
                res.json(enrollment);
            })
    }

    function withdrawStudentFromSection(req, res) {
        var user = req.session['currentUser'];
        var sectionId = req.params.sectionId;
        var enrollment = {};
        enrollmentModel
            .withdrawStudentFromSection(
                user._id,
                sectionId
            ).then(function (_enrollment) {
                enrollment=_enrollment
                return sectionModel.incrementSectionSeats(sectionId);
            })
            .then(function () {
                res.json(enrollment)
            })
    }
};