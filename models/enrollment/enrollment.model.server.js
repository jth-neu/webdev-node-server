var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
    'EnrollmentModel',
    enrollmentSchema
);

function enrollStudentInSection(studentId, sectionId) {
    var enrollment = {
        student: studentId,
        section: sectionId
    };
    return enrollmentModel.create(enrollment);
}

function withdrawStudentFromSection(studentId, sectionId) {
    var enrollment = {
        student: studentId,
        section: sectionId
    };
    return enrollmentModel.find(enrollment).remove().exec();
}

function findSectionsForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec();
}

function findStudentsForSection(sectionId) {
    return enrollmentModel
        .find({section: sectionId})
        .populate('student')
        .exec();
}

module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findStudentsForSection: findStudentsForSection,
    findSectionsForStudent: findSectionsForStudent,
    withdrawStudentFromSection: withdrawStudentFromSection
};