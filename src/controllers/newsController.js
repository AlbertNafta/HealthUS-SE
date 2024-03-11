const News = require('../models/news');

exports.getLastestNews = async(req, res) => {
    try {
        const limit = req.query.limit || 3;
        const news = await News.find().sort({ publishedDate: -1 }).limit(limit);
        res.json({
            news: news,
        });
    } catch (err) {
        throw new Error('Failed to retrieve news from database');
    }
}

exports.listNews = async (req, res) => {
    const newdata = await News.find()
    res.render('CRUDnews', {newdata})
}

exports.createNews = async(req, res) =>{
    await News.create({
        username: req.body.username,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        image: req.body.image,
        publishedDate: req.body.publishedDate
    });
    res.redirect('/admin/news')
}

exports.updateNews = async(req, res) => {
    try{
        const oneNews = await News.findOne({_id: req.params.id})
        res.render('updateNews', {oneNews})
    } catch (error){console.log(error)}
}

exports.updateNewslPost = async(req, res) => {
    try{
        await News.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            author: req.body.author,
            content: req.body.content,
            image: req.body.image,
            publishedDate: req.body.publishedDate
        })
        res.redirect('/admin/news')
    } catch{}
}

exports.deleteNews = async(req, res) => {
    try{
        await News.deleteOne({_id: req.params.id});
        res.redirect('/admin/news')
    } catch(error){}
}