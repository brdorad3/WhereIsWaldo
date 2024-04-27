const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const character = new Schema({
    name: {
        type: String,
        required: true
    }, 
    x: {
        type: Number,
        required: true
    },
    y: {
        type: String,
        required: true
    }
}, { collection: 'character' })
module.exports = mongoose.model("Character", character)