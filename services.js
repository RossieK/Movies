const apiKey = "AIzaSyBj-frJh6hhHh4s7yVBR6QvewPBSZ5e8OM";

const authService = {
    login(email, password) {
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('auth', JSON.stringify(data));
            });
    }
}