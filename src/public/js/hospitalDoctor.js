$(document).ready(function(){
    
    function formatSchedule(scheduleArray) {
        const days = {
            2: "Monday",
            3: "Tuesday",
            4: "Wednesday",
            5: "Thursday",
            6: "Friday",
            7: "Saturday"
        };
    
        const shifts = {
            1: "7:30-9:30",
            2: "9:30-11:30",
            3: "13:30-15:30",
            4: "15:30-17:30"
        };
    
        const formattedSchedule = {};
        const schedule = [];
        scheduleArray.forEach(entry => {
            const day = days[Math.floor(entry / 10)];
            const shift = shifts[entry % 10];
    
            if (!formattedSchedule[day]) {
                formattedSchedule[day] = [];
            }
    
            formattedSchedule[day].push(shift);
        });
        
        for (const day in formattedSchedule) {
            const formattedShifts = formattedSchedule[day].join(', ');
            schedule.push(`${day}: ${formattedShifts}`);
        }

        return schedule;
    }

    function generateDoctor(data){
        $('.list-doctor').empty();
        data.forEach(function(doctor){

            let D = new Date(doctor.birth);
            const options = {month: 'numeric', day: 'numeric', year: 'numeric'};
            D = D.toLocaleString('en-US', options);

            let G = 'Male'
            if(doctor.gender == 1)
                G = 'Female'

            formattedSche = formatSchedule(doctor.schedule);    
            console.log(formattedSche[0]);  

            const block = $('.list-doctor');

            const doc = $(`
            <tr>
                <th scope="row" style="min-width: 90px;">${doctor.doctorID}</th>
                <td style="min-width: 200px;">${doctor.name}</td>
                <td style="min-width: 100px;">${doctor.hospitalID}</td>
                <td style="min-width: 150px;">${doctor.specialist}</td>
                <td style="min-width: 150px;">${doctor.phone}</td>
                <td>${D}</td>
                <td>${G}</td>
                <td style="min-width: 200px;">${doctor.email}</td>
                <td>${doctor.yearExp} years</td>
                <td style="min-width: 300px;">${doctor.description}</td>
                <td><img src="${doctor.avatar}" style="max-width: 100px; max-height: 100px;"></td>
                <td style="min-width: 400px;">
                    <p style="margin: 0;">${formattedSche[0]}</p>
                    <p style="margin: 0;">${formattedSche[1]}</p>
                    <p style="margin: 0;">${formattedSche[2]}</p>
                    <p style="margin: 0;">${formattedSche[3]}</p>
                    <p style="margin: 0;">${formattedSche[4]}</p>
                    <p style="margin: 0;">${formattedSche[5]}</p>
                </td>
                <td style="min-width: 100px;">
                    <a href="doctor/update/${doctor.doctorID}" class="text-success">
                        <i class="fa-solid fa-pen icon"></i>
                    </a>
                    <a href="doctor/delete/${doctor._id}" class="text-success">
                        <i class="fa-solid fa-trash" style="color: #ff0000;"></i>
                    </a>
                    
                </td>
            </tr>
                
            `);
            block.append(doc);
        })
    }
{/* <form action="doctor/delete/${doctor._id}?_method=DELETE" method="post">
                        <button type="submit" class="btn">
                            <i class="fa-solid fa-trash" style="color: #ff0000;"></i>
                        </button>
                    </form> */}
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const sessionID = getCookie('sessionID');
    console.log('sid: ', sessionID);

    let username = '';
    let user_id = '';

    // Get username asynchronously
    fetch('/getUsn', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionID}`
        }
    })
    .then(res => res.json())
    .then(data => {
        username = data.session.user.username;
        console.log('username: ', username);

        // Get user_id / patID using the retrieved username
        return fetch('/getHosIDbyUsn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        })
            .then(res => res.json())
            .then(data => {
                hosID = data.id;
                console.log('user_id: ', hosID);
                return fetch('/getDocofHos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ hosID })
                })
                    .then(res => res.json())
                    .then(data => {
                        generateDoctor(data.docs);
                    })
            });
            
    })
    .catch(err => console.log(err));


})