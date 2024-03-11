const Appointment = require('../models/appointments');

exports.addAppointment = async (req, res) => {
    const newApp = req.body.id;

    const lastRec = await Appointment.find().sort({appointmentID: -1}).limit(1);
    
    let lastID = Number(lastRec[0].appointmentID.slice(3,7));
    
    let newID = (lastID + 1).toString();
    const len = newID.length;
    
    for(let i = 1; i <= 4 - len; i++){
        newID = '0'  + newID;
    }
    
    newID = 'apm' + newID;
    
    await Appointment.create({
        appointmentID: newID,
        patientID: newApp[6],
        profileID: newApp[0],
        hospitalID: newApp[1],
        doctorID: newApp[3],
        specialist: newApp[2],
        date: newApp[4],
        time: newApp[5]
    });

    res.redirect('/');
    
}
exports.listAppointment = async (req, res) => {
    const appointment = await Appointment.find()
    res.render('admin_appointment', {appointment})
}

exports.createAppointment = async(req, res) =>{
    const {appointmentID, patientID, profileID, hospitalID,doctorID,specialist, date, time } = req.body;

    // Check if the username already exists
    const existingAppointment = await Appointment.findOne({ appointmentID });
    let errorMessage = ''; // Initialize errorMessage

    if (existingAppointment) {
        errorMessage = 'Appointment ID already exists. Please choose a different ID.';
        res.render('addAppointment', {
            errorMessage: errorMessage, // Pass errorMessage to the view
            appointmentID: appointmentID,
            patientID: patientID,
            profileID: profileID,
            hospitalID: hospitalID,
            doctorID: doctorID,
            specialist: specialist,
            date: date,
            time: time
        });
    } else {
        try {
            await Appointment.create({
                appointmentID,
                patientID,
                profileID,
                hospitalID,
                doctorID,
                specialist,
                date,
                time
            });

            // Redirect to a success page or the account listing page
            res.redirect('/admin/appointment');
        } catch (error) {
            console.error('Error creating appointment:', error);
            // Render an error page or handle the error as needed
        }
    }
}

exports.updateAppointment = async(req, res) => {
    try{
        const appointment = await Appointment.findOne({_id: req.params.id})
        res.render('updateAppointment', {appointment})
    } catch (error){console.log(error)}
}

exports.updateAppointmentPost = async(req, res) => {
    try{
        await Appointment.findByIdAndUpdate(req.params.id,{
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role
        })
        res.redirect('/admin/appointment')
    } catch{}
}

exports.deleteAppointment = async(req, res) => {
    try{
        await Appointment.deleteOne({_id: req.params.id});
        res.redirect('/admin/appointment')
    } catch(error){}
}

exports.getAppbyHosID = async (req, res) => {
    hosID = req.body.hosID;
    const appoint = await Appointment.find({hospitalID: hosID});
    // console.log(specialists);
    res.json({
        items: appoint
    });
}
