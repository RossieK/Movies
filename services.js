const apiKey = "AIzaSyBj-frJh6hhHh4s7yVBR6QvewPBSZ5e8OM";
const databaseUrl = "https://movies-83512-default-rtdb.firebaseio.com";

const request = async(url, method, info) => {
    let options = {
        method
    };

    if (info) {
        Object.assign(options, {
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        });
    }

    let response = await fetch(url, options);

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
    },

    async getAll(searchText) {
        let res = await request(`${databaseUrl}/movies.json`, 'GET');
        return Object.keys(res).map(key => ({ key, ...res[key] })).filter(x => !searchText || searchText == x.title);
    },

    async getOne(id) {
        let res = await request(`${databaseUrl}/movies/${id}.json`, 'GET');
        let { email } = authService.getData();
        let likes = res.likes ? Object.values(res.likes) : [];
        let alreadyLiked = res.likes ? Object.values(res.likes).some(x => x.creator == email) : false;
        return Object.assign(res, { isOwn: res.creator == email, alreadyLiked, likes: likes.length });
    },

    async deleteMovie(id) {
        let res = await request(`${databaseUrl}/movies/${id}.json`, 'DELETE');
        return res;
    },

    async editMovie(id, movie) {
        let res = await request(`${databaseUrl}/movies/${id}.json`, 'PATCH', movie);
        return res;
    },

    async likeMovie(id, creator) {
        let res = await request(`${databaseUrl}/movies/${id}/likes.json`, 'POST', { creator });
        return res;
    }
}