function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.addEventListener('DOMContentLoaded', async () => {
    const sessionID = getCookie('sessionID');
    console.log(localStorage.getItem('username'));
    if (localStorage.getItem('username') === null && sessionID !== undefined) {
        let username = '';

        try {
            const res1 = await fetch('/getUsn', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionID}`
                }
            });

            const data1 = await res1.json();
            if (data1.status === 404) {
                username = '';
            }
            else {
                username = data1.session.user.username;
            }

            console.log(username);

            const admin_name = document.getElementById('username');
            if (username !== '') {
                localStorage.setItem('username', username);
                admin_name.innerText = username;
            }
            else {
                localStorage.setItem('username', null);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    if (sessionID !== undefined) {
        document.querySelector('#username').innerText = localStorage.getItem('username');
    }
});

// if logout button is shown, add event listener to it
document.querySelector('#logout-btn').addEventListener('click', async () => {
    const sessionID = getCookie('sessionID');
    if (sessionID) {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sessionID })
            });
        } catch (error) {
            console.error('Logout error:', error);
        }

        // remove username from localStorage
        localStorage.clear();
        // delete sessionID in cookie
        document.cookie = "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
})