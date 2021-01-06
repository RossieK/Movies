function addEventListeners() {
    let navigationTemplate = Handlebars.compile(document.getElementById('navigation-template').innerHTML);
    Handlebars.registerPartial('navigationPartial', navigationTemplate);

    let movieCardTemplate = Handlebars.compile(document.getElementById('movie-card-template').innerHTML);
    Handlebars.registerPartial('moviePartial', movieCardTemplate);

    navigate('home');
}

function navigateHandler(e) {
    e.preventDefault();

    if (e.target.tagName != "A") {
        return;
    }

    let url = new URL(e.target.href);

    navigate(url.pathname.slice(1))
}

function onLoginSubmit(e) {
    e.preventDefault();

    let formData = new FormData(document.forms['login-form']);

    let email = formData.get('email');
    let password = formData.get('password');

    authService.login(email, password)
        .then(data => {
            navigate('home');
        });
}

function onRegisterSubmit(e) {
    e.preventDefault();

    let formData = new FormData(document.forms['register-form']);

    let email = formData.get('email');
    let password = formData.get('password');
    let rePassword = formData.get('repeatPassword');

    if (password === rePassword) {
        authService.register(email, password)
            .then(data => {
                navigate('home');
            });
    }
}

function onAddMovieSubmit(e) {
    e.preventDefault();

    let formData = new FormData(document.forms['create-form']);

    let title = formData.get('title');
    let description = formData.get('description');
    let imageUrl = formData.get('imageUrl');

    movieService.add({ title, description, imageUrl })
        .then(res => {
            navigate('home');
        });
}

function deleteMovie(e) {
    e.preventDefault();

    let id = e.target.dataset.id;

    movieService.deleteMovie(id)
        .then(res => {
            navigate('home');
        });
}

addEventListeners();