var prevScrollpos = window.scrollY;
window.onscroll = function () {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("container-navbar").style.top = "0";
        document.getElementById("navbarsExampleDefault").style.top = "0";
        document.querySelector('.offcanvas-collapse').style.top = "90.74px"
    } else {
        document.getElementById("container-navbar").style.top = "-100%";
        document.getElementById("navbarsExampleDefault").style.top = "-100%";
        document.querySelector('.offcanvas-collapse').style.top = "90.74px"
    }
    prevScrollpos = currentScrollPos;
}
document.querySelector('#navbarSideCollapse').addEventListener('click', function () {
    document.querySelector('.offcanvas-collapse').classList.toggle('open')
})

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.addEventListener('DOMContentLoaded', async () => {
    const sessionID = getCookie('sessionID');
    console.log(sessionID);
    if (document.querySelector('#logout-btn').style.display === 'none' && sessionID !== undefined) {
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

            const admin_name = document.getElementById('admin_name');
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
        document.querySelector('#login-btn').style.display = 'none'
        document.querySelector('#signup-btn').style.display = 'none'
        // unhide username and logout button
        document.querySelector('#username').style.display = 'block'
        document.querySelector('#username').innerText = localStorage.getItem('username');
        document.querySelector('#logout-btn').style.display = 'block'
    }
});

// if logout button is shown, add event listener to it
document.querySelector('#logout-btn').addEventListener('click', async () => {
    if (document.querySelector('#logout-btn').style.display !== 'none') {
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

            // hide username and logout button
            document.querySelector('#username').style.display = 'none'
            document.querySelector('#logout-btn').style.display = 'none'


            // unhide login and signup button
            document.querySelector('#login-btn').style.display = 'block'
            document.querySelector('#signup-btn').style.display = 'block'

            // remove username from localStorage
            localStorage.setItem('username', null);
            // delete sessionID in cookie
            document.cookie = "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            // reload page
            location.reload();
        }
    }
})
