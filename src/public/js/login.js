$(document).ready(function () {
    const loginBtn = $('#loginBtn');
    
    loginBtn.on('click', function (e) {
        e.preventDefault();

        const username = $('#username').val();
        const password = $('#password').val();

        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }

        // post data to server
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => {
            if (res.redirected && res.status === 200) {
                window.location.href = res.url;
            }
            else {
                alert('Username or password is incorrect');
                throw new Error('Username or password is incorrect');
            }
        })
    });
});
