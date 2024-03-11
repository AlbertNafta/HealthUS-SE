const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    image: String,
    publishedDate: Date
});

const News = mongoose.model("news", NewsSchema);
module.exports = News;
