const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 500,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
});

module.exports = mongoose.model("User", userSchema);

// The mongoose.model() function of the mongoose module is used to create
// a collection of a particular database of MongoDB.

// collection name will become lowercase and add plural when created
// for example, User becomes users and Random becomes randoms
// but randoms will remain randoms and users will remain users (confusing yup)

// Syntax:
// mongoose.model(<Collectionname>, <CollectionSchema>)

// link: [{
//     url:{
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 255,

//     },
//     description:{
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 255,
//     },
//     title: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength: 255,
//     }
// }]
