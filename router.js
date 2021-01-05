const routes = {
    'home': 'home-template',
    'login': 'login-form-template',
    'register': 'register-form-template',
    'create': 'add-movie-template'
};

const router = (path) => {
    let app = document.getElementById('app');

    switch (path) {
        case 'logout':
            authService.logout();
            navigate('home');
            return;
    }

    let template = Handlebars.compile(document.getElementById(routes[path]).innerHTML);

    let authData = authService.getData();

    app.innerHTML = template(authData);
};

const navigate = (path) => {
    history.pushState({}, '', path);

    router(path);
}