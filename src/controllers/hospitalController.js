const Hospital = require('../models/hospitals');

exports.getHospitalList = async (req, res) => {
    // return all hospitals
    const data = await Hospital.find();
    const result = data.slice(0, 5);
    const limit = 5;
    const totalPages = parseInt(data.length / limit) + 1;

    return res.render('hospitalList', { items: result, totalPages: totalPages });
}

exports.getAllHospital = async (req, res) => {
    const hospitals = await Hospital.find();
    res.json({
        items: hospitals
    });
}

exports.getSpecbyHosID = async (req, res) => {
    hosID = req.body.pickedID;
    const hospital = await Hospital.find({hospitalID: hosID});
    const specialists = hospital[0].specialists;
    // console.log(specialists);
    res.json({
        items: specialists
    });
}


exports.getHospitalListbyQuery = async (req, res) => {
    const page = req.query.page || 1; 
    const keyword = req.query.keyword || '';
    const order = req.query.order || 'asc';
    const limit = 5;

    if (page == 0) {
        const num = req.query.limit;
        const data = await Hospital.find().limit(num);
        res.json({
            items: data
        });
    }

    else {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        const data = await Hospital.find({ name: { $regex: keyword, $options: 'i' } }).sort({ name: order });
        const result = data.slice(startIndex, endIndex);
        
        const totalPages = parseInt(data.length / limit) + 1;
        // console.log(totalPages);
    
        res.json({
            items: result,
            totalPages: totalPages
        });
    
        // return res.render('hospitalList', { items: data, totalPages: totalPages });
    }
    
}
exports.listHospital = async (req, res) => {
    const hospital = await Hospital.find()
    res.render('hospital', {hospital})
}

exports.createHospital = async(req, res) =>{
    const {username, hospitalID, name, location,city,contactNumber, email, website, description, specialist, avatar } = req.body;

    // Check if the username already exists
    const existingUsername = await Hospital.findOne({ username });
    const existingHospitalID = await Hospital.findOne({ hospitalID });
    let errorMessage1 = ''; // Initialize errorMessage
    let errorMessage2 = '';
    if (existingUsername) {
        errorMessage1 = 'Username already exists. Please choose a different one.';
        res.render('addHospital', {
            errorMessage1: errorMessage1, // Pass errorMessage to the view
            username: username,
            hospitalID: hospitalID,
            name: name,
            location: location,
            city: city,
            contactNumber: contactNumber,
            email: email,
            website: website,
            description: description,
            specialist: specialist,
            avatar: avatar
        });
    } else if (existingHospitalID){
        errorMessage2 = 'Hospital ID already exists. Please choose a different ID.';
        res.render('addHospital', {
            errorMessage2: errorMessage2, // Pass errorMessage to the view
            username: username,
            hospitalID: hospitalID,
            name: name,
            location: location,
            city: city,
            contactNumber: contactNumber,
            email: email,
            website: website,
            description: description,
            specialist: specialist,
            avatar: avatar
        });
    } else {
        try {
            await Hospital.create({
            username,
            hospitalID,
            name,
            location,
            city,
            contactNumber,
            email,
            website,
            description,
            specialist,
            avatar
            });

            // Redirect to a success page or the account listing page
            res.redirect('/admin/hospital');
        } catch (error) {
            console.error('Error creating hospital:', error);
            // Render an error page or handle the error as needed
        }
    }
}

exports.updateHospital = async(req, res) => {
    try{
        const hospital = await Hospital.findOne({_id: req.params.id})
        res.render('updateHospital', {hospital})
    } catch (error){console.log(error)}
}

exports.updateHospitalPost = async(req, res) => {
    try{
        await Hospital.findByIdAndUpdate(req.params.id,{
            username: req.body.username,
            hospitalID: req.body.hospitalID,
            name: req.body.name,
            location: req.body.location,
            city: req.body.city,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            website: req.body.website,
            description: req.body.description,
            specialist: req.body.specialist,
            avatar: req.body.avatar
        })
        res.redirect('/admin/hospital')
    } catch{}
}

exports.deleteHospital = async(req, res) => {
    try{
        await Hospital.deleteOne({_id: req.params.id});
        res.redirect('/admin/hospital')
    } catch(error){}
}

exports.getIDbyUsername = async (req, res) => {
    const username = req.body.username;
    let getAll = null
    if (req.query.getAllField !== undefined) {
        getAll = req.query.getAllField;
    }

    await Hospital
    .findOne({username: username})
    .then(result => {
        if (getAll !== null) {
            res.json({
                data: result
            });
        }
        else {
            res.json({
                id: result.hospitalID
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Error retrieving Account ID with username=" + username
        });
    });
}

exports.createSpecialist = async (req, res) => {
    const hospitalID = req.params.id;

    // append new specialist to the array of hospital 
    const new_specialist = {
        specName: req.body.specName,
        specDescription: req.body.specDescription
    }

    await Hospital.findOneAndUpdate({hospitalID: hospitalID}, {$push: {specialists: new_specialist}}, {new: true})
    .then(data => {
        res.redirect('/hospital/specialist')
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the specialist."
        });
    });
}

exports.updateSpecialist = async (req, res) => {
    const hospitalID = req.params.id;
    const specID = req.params.specID;

    // update specialist
    const new_specialist = {
        specName: req.body.specName,
        specDescription: req.body.specDescription
    }

    await Hospital.findOneAndUpdate({hospitalID: hospitalID, "specialists._id": specID}, {$set: {"specialists.$": new_specialist}}, {new: true})
    .then(data => {
        res.redirect('/hospital/specialist')
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the specialist."
        });
    });
}

exports.deleteSpecialist = async (req, res) => {
    const hospitalID = req.params.id;
    const specName = req.params.specName;

    // delete only the specialist with specName
    await Hospital.findOneAndUpdate({hospitalID: hospitalID}, {$pull: {specialists: {specName: specName}}}, {new: true})
    .then(data => {
        res.redirect('/hospital/specialist')
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the specialist."
        });
    });
}
