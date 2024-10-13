const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectName: { type: String, required: true },
    marks: {
        type: Number,
        required: true,
        min: [0, 'Marks must be at least 0'],
        max: [100, 'Marks must be at most 100']
    }
});

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    standard: {
        type: Number,
        required: true,
        min: [1, 'Standard must be at least 1'],
        max: [12, 'Standard must be less than or equal to 12']
    },
    subjects: {
        type: [subjectSchema],
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: 'A student must have at least one subject'
        }
    }
});

studentSchema.methods.calculateTotalMarks = function () {
    return this.subjects.reduce((sum, subject) => sum + subject.marks, 0);
};

studentSchema.methods.calculatePercentage = function () {
    const totalMarks = this.calculateTotalMarks();
    return (totalMarks / (this.subjects.length * 100)) * 100;
};

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
