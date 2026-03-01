const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MentorListSchema = new Schema ({
    Mentor: {
        type: Schema.Types.ObjectId,
        ref: 'TeacherList',
        required: true,
        unique: true
    },
    Mentee: {
        type: [Schema.Types.ObjectId],
        ref: 'StudentList',
        required: true
    }
});

module.exports = mongoose.model('MentorList', MentorListSchema);