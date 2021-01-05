const apiKey = "AIzaSyBj-frJh6hhHh4s7yVBR6QvewPBSZ5e8OM";
const databaseUrl = "https://movies-83512-default-rtdb.firebaseio.com";

const request = async(url, method, info) => {
    let response = await fetch(url, {
        method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(info)
    });

    let data = await response.json();

    return data;
};

const authService = {
    async login(email, password) {
        let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        let data = await response.json();

        localStorage.setItem('auth', JSON.stringify(data));

        return data;
    },

    async register(email, password) {
        let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        let data = await response.json();

        localStorage.setItem('auth', JSON.stringify(data));

        return data;
    },

    getData() {
        try {
            let data = JSON.parse(localStorage.getItem('auth'));

            return {
                isAuthenticated: Boolean(data.idToken),
                email: data.email
            };
        } catch (error) {
            return {
                isAuthenticated: false,
                email: ""
            }
        }

    },

    logout() {
        localStorage.setItem('auth', '');
    }
};

const movieService = {
    async add(movieData) {
        let res = await request(`${databaseUrl}/movies.json`, 'POST', movieData);
        return res;
    }
}