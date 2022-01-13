const mongoose = require("mongoose");
const struct = mongoose.Schema({
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,

    },
    gender: {
        type: String,
    },
    city: {
        type: String
    }
})


const result = mongoose.model("crud", struct);

module.exports = result;
