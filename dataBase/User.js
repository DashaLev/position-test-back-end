const { Schema, model } = require('mongoose');
const { userTypes } = require('../configs');

const userSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8,
        select:false
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(userTypes)
    }
}, { timestamps: true} );

module.exports = model('user', userSchema);
