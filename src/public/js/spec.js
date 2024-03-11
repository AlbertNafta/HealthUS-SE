function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.addEventListener('DOMContentLoaded', async () => {
    let username = ''
    const sessionID = getCookie('sessionID');

    if (sessionID !== undefined) {
        const data = await fetch('/getUsn', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionID}`
            }
        });
        const response = await data.json();
        username = response.session.user.username;

        const data1 = await fetch('/getHosIDbyUsn?getAllField=true', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username })
        })
        const response1 = await data1.json();
        const pickedID = response1.data.hospitalID;

        const data2 = await fetch('/getSpecbyHosID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pickedID })
        })
        const response2 = await data2.json();

        const block = $('#spec-item');
        // clear block
        block.innerHTML = '';
        response2.items.forEach(function (specialist, index) {
            const item = $(`
            <div class="item border-bottom py-3">
                <div class="row justify-content-between align-items-center">
                    <div class="col-auto">
                        <div class="item-label" id="spec-name"><strong>${specialist.specName}</strong></div>
                        <div class="item-data" id="spec-des">${specialist.specDescription}</div>
                    </div>
                    <div class="col text-end">
                        <a class="btn-sm app-btn-secondary" href="#">Edit</a>
                        <form action="specialist/delete/${response1.data.hospitalID}/${specialist.specName}?_method=DELETE" method="post"><button type="submit" class="btn-sm app-btn-secondary"><a class="btn-sm app-btn-secondary">Delete</a></button></form>
                    </div>
                </div>
            </div>
            `)
            block.append(item);
        })

        const hos_id = $("#hos-id");
        const hos_name = $("#hos-name");
        const hos_locat = $("#hos-locat");
        const hos_phone = $("#hos-phone");
        const hos_email = $("#hos-email");
        const hos_web = $("#hos-web");
        const create_new = $("#create-new");

        hos_id.text(response1.data.hospitalID);
        hos_name.text(response1.data.name);
        hos_locat.text(response1.data.location);
        hos_phone.text(response1.data.contactNumber);
        hos_email.text(response1.data.email);
        hos_web.attr('href', response1.data.website);
        create_new.attr('href', `/hospital/specialist/add/${response1.data.hospitalID}`);
    }
});