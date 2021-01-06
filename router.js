const routes = {
    'home': 'home-template',
    'login': 'login-form-template',
    'register': 'register-form-template',
    'create': 'add-movie-template'
};

const router = async(path) => {
    let app = document.getElementById('app');
    let templateData = authService.getData();

    switch (path) {
        case 'home':
            templateData.movies = await movieService.getAll();
            break;
        case 'logout':
            authService.logout();
            navigate('home');
            return;
    }

    let template = Handlebars.compile(document.getElementById(routes[path]).innerHTML);

    app.innerHTML = template(templateData);
};

const navigate = (path) => {
    history.pushState({}, '', path);

    router(path);
}