const Doctor = require("../models/doctors")
const Hospital = require("../models/hospitals")
exports.listDoctor = async (req, res) => {
    const doctor = await Doctor.find()
    res.render('doctor', {doctor})
}

exports.createDoctor = async(req, res) =>{
    
    const info = req.body.newInfo;
    const hosID = req.body.pickedID;

    const lastRec = await Doctor.find().sort({doctorID: -1}).limit(1);
    
    let lastID = Number(lastRec[0].doctorID.slice(3,7));
    
    let newID = (lastID + 1).toString();
    const len = newID.length;
    
    for(let i = 1; i <= 4 - len; i++){
        newID = '0'  + newID;
    }
    
    newID = 'doc' + newID;
    
    birthDay = new Date(info[5]);

    let schedule = info[7].split(",").map(Number);

    await Doctor.create({
        doctorID: newID,
        name: info[0],
        hospitalID: hosID,
        specialist: info[8],
        phone: info[4],
        birth: birthDay,
        gender: info[1],
        email: info[3],
        yearExp: info[2],
        description: info[6],
        schedule: schedule,
    });

    res.redirect('/hospital/doctor')
}

exports.updateDoctorGet = async(req, res) => {
    // console.log(req.params.id);
    try{
        const doctor = await Doctor.findOne({doctorID: req.params.id})

        const hospital = await Hospital.findOne({hospitalID: doctor.hospitalID})

        const specialists = Object.values(hospital.specialists)[0];

        // console.log(specialists[0]);
        // console.log(typeof specialists[0]);
        res.render('hos_updateDoctor', {doctor, specialists})
    } catch (error){console.log(error)}
}

exports.updateDoctorPost = async(req, res) => {
    // console.log(req.body.name);
    // console.log(req.body.specialist);
    // console.log(req.body.phone);
    // console.log(req.body.birth);
    // console.log(req.body.gender);
    // console.log(req.body.email);
    // console.log(req.body.yearExp);
    // console.log(req.body.description);
    // console.log(req.body.schedule);

    const birthDay = new Date (req.body.birth);

    let schedule = req.body.schedule.split(",").map(Number);

    try{
        await Doctor.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            specialist: req.body.specialist,
            phone: req.body.phone,
            birth: birthDay,
            gender: req.body.gender,
            email: req.body.email,
            yearExp: req.body.yearExp,
            description: req.body.description,
            schedule: schedule,
        })
        res.redirect('/hospital/doctor')
    } catch{}
}

exports.deleteDoctor = async(req, res) => {
    try{
        await Doctor.deleteOne({_id: req.params.id});
        res.redirect('/hospital/doctor')
    } catch(error){}
}

exports.getDocbySpec = async (req, res) => {
    hosID = req.body.hospitalID;
    spec = req.body.pickedID;

    const data = await Doctor.find({hospitalID: hosID, specialist: spec});
    res.json({
        items: data
    });
}

exports.getScheofDoc = async (req, res) => {
    docID = req.body.pickedID;

    const data = await Doctor.find({doctorID: docID});

    res.json({
        items: data[0].schedule
    });
}

exports.getDocbyHosID = async (req, res) => {
    hosID = req.body.hosID;
    // console.log(hosID);
    const data = await Doctor.find({hospitalID: hosID});

    // console.log(data);    
    res.json({
        docs: data
    })
}