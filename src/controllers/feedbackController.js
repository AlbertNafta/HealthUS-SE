const Feedback = require("../models/feedbacks")

exports.listFeedback = async (req, res) => {
    const feedback = await Feedback.find()
    res.render('feedback', {feedback})
}

exports.createFeedback = async(req, res) =>{
    await Feedback.create({
        hospitalID: req.body.hospitalID,
        patientID: req.body.patientID,
        content: req.body.content,
        date: req.body.date
    });
    res.redirect('/admin/feedback')
}

exports.updateFeedback = async(req, res) => {
    try{
        const feedback = await Feedback.findOne({_id: req.params.id})
        res.render('updateFeedback', {feedback})
    } catch (error){console.log(error)}
}

exports.updateFeedbackPost = async(req, res) => {
    try{
        await Feedback.findByIdAndUpdate(req.params.id,{
            hospitalID: req.body.hospitalID,
            patientID: req.body.patientID,
            content: req.body.content,
            date: req.body.date
        })
        res.redirect('/admin/feedback')
    } catch{}
}

exports.deleteFeedback = async(req, res) => {
    try{
        await Feedback.deleteOne({_id: req.params.id});
        res.redirect('/admin/feedback')
    } catch(error){}
}