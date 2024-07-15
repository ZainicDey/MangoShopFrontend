const handleLogin = (event) => {
    event.preventDefault();
    const form = document.getElementById('login-form');
    const formData = new FormData(form); // Fixed typo: FormData is case-sensitive

    const loginFormData = {
        username: formData.get('username'),
        password: formData.get('password')
    };

    fetch('https://mangoshopbd.onrender.com/login/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginFormData)
    })
    .then((res) => {
        if (!res.ok) {
            return res.json().then((errorData) => {
                throw new Error(errorData.message || 'Login failed');
            });
        }
        return res.json();
    })
    .then((data) => {
        console.log(data);
        if (data.token) {
            // Assuming you have a way to check if the token is active
            // For now, we'll assume the token is valid and log in the user
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userId", data.user_id);
            window.location.href = 'index.html';
        } else {
            alert('Token is not active. Please verify your email.');
            throw new Error('Token not received or not active');
        }
    })
    .catch((error) => {
        alert('Login failed. Please try again later or verify your email.');
        console.error('Error:', error);
    });
};
const handleRegister = (event) => {
    event.preventDefault();
    const form = document.getElementById('signup-form');
    const formData = new FormData(form);

    const registrationData = {
        username: formData.get('username'),
        password: formData.get('password'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        email: formData.get('email'),
        confirm_password: formData.get('password1')
    };

    fetch('https://mangoshopbd.onrender.com/register/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registrationData)
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Registration failed');
        }
        return res.json();
    })
    .then((data) => {
        console.log(data);
        alert("Check your email for verification!");
        window.location.href = 'index.html';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Registration failed. Please try again later.');
    });
};
