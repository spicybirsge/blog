const mongoose = require("mongoose");

const blogPosts = mongoose.Schema({
    _id: String,
    title: String,
    description: String,
    content: String,
    views: Array,
    createdAt: Number,
    lastEdited: Number
})

module.exports = mongoose.model("BlogPosts", blogPosts)