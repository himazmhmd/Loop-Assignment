const Student = require('../models/studentModel');

exports.addStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};


// Update student by ID
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }
        res.send(student);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Delete student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }
        res.send({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Get all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.send(students);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();

        const studentData = students.map(student => {
            const totalMarks = student.calculateTotalMarks();
            const percentage = student.calculatePercentage();
            return {
                _id: student._id,
                name: student.name,
                standard: student.standard,
                totalMarks,
                percentage,
                subjects: student.subjects
            };
        });

        res.send(studentData);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.getTopRankers = async (req, res) => {
    try {
        const students = await Student.find();

        const rankedStudents = students.map(student => {
            return {
                _id: student._id,
                name: student.name,
                standard: student.standard,
                totalMarks: student.calculateTotalMarks(),
                percentage: student.calculatePercentage(),
                subjects: student.subjects
            };
        }).sort((a, b) => b.percentage - a.percentage).slice(0, 3); // Sort and get top 3

        res.send(rankedStudents);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
exports.getStudentsByGrade = async (req, res) => {
    try {
        const students = await Student.find();

        const gradedStudents = students.map(student => {
            const percentage = student.calculatePercentage();
            let grade = '';

            if (percentage > 80) {
                grade = 'A';
            } else if (percentage > 60) {
                grade = 'B';
            } else if (percentage > 35) {
                grade = 'C';
            } else {
                grade = 'D';
            }

            return {
                _id: student._id,
                name: student.name,
                standard: student.standard,
                totalMarks: student.calculateTotalMarks(),
                percentage,
                grade,
                subjects: student.subjects
            };
        }).sort((a, b) => a.grade.localeCompare(b.grade)); // Sort by grade

        res.send(gradedStudents);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
