$(document).ready(function(){
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const sessionID = getCookie('sessionID');
    console.log('sid: ', sessionID);

    let username = '';
    let pickedID = '';

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
                pickedID = data.id;
                console.log('user_id: ', pickedID);
                return fetch('/hospital/getSpecofHos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ pickedID })
                })
                    .then(res => res.json())
                    .then(data => {
                        $('#floatingSelectSpec').empty();
                        const block = $('#floatingSelectSpec');
                        block.append($(`<option selected>Choose doctor's specialist</option>`));
                        data.items.forEach(function(spec){
                            const doc = $(`
                                <option value="${spec.specName}">${spec.specName}</option>
                            `);
                            block.append(doc);
                        })
                        
                    })
            });
            
    })
    .catch(err => console.log(err));

    $("#submit-new").click(function () {
        var newInfo = []
        newInfo.push($("#inputUsername").val());
        newInfo.push($("#floatingSelectGender").val());
        newInfo.push($("#inputYear").val());
        newInfo.push($("#inputEmailAddress").val());
        newInfo.push($("#inputPhone").val());
        newInfo.push($("#inputBirthday").val());
        newInfo.push($("#inputDes").val());
        newInfo.push($("#inputSchedule").val());
        newInfo.push($("#floatingSelectSpec").val());
        // console.log(newInfo);

        fetch('/hospital/addNewDoctor', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({newInfo, pickedID})
        })
        .then(res => {
            if (res.redirected && res.status === 200) {
                window.location.href = res.url;
            }
        })
        console.log("clicked");
    });
})