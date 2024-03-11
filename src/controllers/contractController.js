const Contracts = require("../models/contracts")

exports.createContracts = async(req, res) =>{
    const newContracts = new Contracts({
        hospitalName: req.body.hospitalName,
        content: req.body.content,
        contractEmail: req.body.contractEmail
    })
    newContracts.save()
    console.log(req.body);
    res.redirect('/contract-us')
}

exports.listContract = async (req, res) => {
    const contract = await Contracts.find()
    res.render('contractList', {contract})
}

exports.updateContract = async(req, res) => {
    try{
        const contract = await Contracts.findOne({_id: req.params.id})
        res.render('updateContract', {contract})
    } catch (error){console.log(error)}
}

exports.updateContractlPost = async(req, res) => {
    try{
        await Contracts.findByIdAndUpdate(req.params.id,{
            hospitalName: req.body.hospitalName,
            content: req.body.content,
            contractEmail: req.body.contractEmail
        })
        res.redirect('/admin/contract')
    } catch{}
}

exports.deleteContract = async(req, res) => {
    try{
        await Contracts.deleteOne({_id: req.params.id});
        res.redirect('/admin/contract')
    } catch(error){}
}