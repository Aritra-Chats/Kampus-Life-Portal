const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MentorListSchema = new Schema ({
    mentor: {
        type: Schema.Types.ObjectId,
        ref: 'TeacherList',
        required: true,
        unique: true
    },
    mentee: {
        type: [Schema.Types.ObjectId],
        ref: 'StudentList',
        required: true
    }
});

module.exports = mongoose.model('MentorList', MentorListSchema);