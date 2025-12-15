const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const authSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password should have a minimum length of 8 letters'],
        validate: {
            validator: function(password) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(password);
            },
            message: function(props) {
                const password = props.value;
                const errors = [];
                if (!/(?=.*[a-z])/.test(password)) {
                    errors.push('lowercase letter');
                }
                if (!/(?=.*[A-Z])/.test(password)) {
                    errors.push('uppercase letter');
                }
                if (!/(?=.*\d)/.test(password)) {
                    errors.push('number');
                }
                if (!/(?=.*[^A-Za-z0-9])/.test(password)) {
                    errors.push('special character');
                }
                return `Password must contain at least one ${errors.join(', ')}.`;
            }
        }
    },
    seed: {
        type: Number
    },
    designation: {
        type: String,
        required: true,
        lowercase: true,
        match: [/^(official|management)$/, 'Designation is not valid']
    }
});

authSchema.pre('save', async function() {
    const password = this.password;
    const offset = Math.floor(Math.random() * 100) + 1;
    this.seed = offset;
    let result = "";
    for(let i = 0; i < password.length; i++) {
        const newASCII = password.charCodeAt(i) + offset;
        result += String.fromCharCode(newASCII);
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(result, salt);
});

authSchema.statics.login = async function( userid, password ) {
    const user = await this.findOne({ userid });
    if(user == null) throw Error('Incorrect userId');
    const offset = user.seed;
    let seededPassword = "";
    for(let i = 0; i < password.length; i++) {
        const newASCII = password.charCodeAt(i) + offset;
        seededPassword += String.fromCharCode(newASCII);
    }
    const auth = await bcrypt.compare(seededPassword, user.password);
    if (auth) return user;
    throw Error('Incorrect Password');
}

module.exports = mongoose.model('LoginDetail', authSchema);