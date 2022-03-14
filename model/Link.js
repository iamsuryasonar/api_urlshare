const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    description:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
module.exports = mongoose.model('Link', linkSchema)
