function addEventListeners() {
    let navigationTemplate = Handlebars.compile(document.getElementById('navigation-template').innerHTML);
    Handlebars.registerPartial('navigationPartial', navigationTemplate);

    let movieCardTemplate = Handlebars.compile(document.getElementById('movie-card-template').innerHTML);
    Handlebars.registerPartial('moviePartial', movieCardTemplate);

    navigate('home');
}

function showNotification(message, type) {
    let sectionElement;

    switch (type) {
        case 'error':
            sectionElement = document.getElementById('errorBoxSection');
            break;
        default:
            sectionElement = document.getElementById('successBoxSection');
            break;
    }

    sectionElement.firstElementChild.innerText = message;
    sectionElement.style.display = 'block';

    setTimeout(() => {
        sectionElement.style.display = 'none';
    }, 3000);
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

    if (email == "" || password == "") {
        showNotification('There should be no empty field', 'error');
    } else {
        authService.login(email, password)
            .then(data => {
                if (data.error) {
                    showNotification(data.error.message, 'error');
                    return;
                } else {
                    showNotification('Succesfully logged in.');
                    navigate('home');
                }
            })
            .catch(err => console.error(err));
    }
}

function onRegisterSubmit(e) {
    e.preventDefault();

    let formData = new FormData(document.forms['register-form']);

    let email = formData.get('email');
    let password = formData.get('password');
    let rePassword = formData.get('repeatPassword');

    if (email == "" || password == "" || rePassword == "") {
        showNotification('There should be no empty field', 'error');
    } else if (password.length < 6) {
        showNotification('The password should be at least 6 characters long.', 'error');
    } else if (password !== rePassword) {
        showNotification('The passwords should match.', 'error');
    } else {
        authService.register(email, password)
            .then(data => {
                if (data.error) {
                    showNotification(data.error.message, 'error');
                    return;
                } else {
                    showNotification('Registration successful.');
                    navigate('home');
                }
            });
    }
}

function onAddMovieSubmit(e) {
    e.preventDefault();

    let formData = new FormData(document.forms['create-form']);

    let title = formData.get('title');
    let description = formData.get('description');
    let imageUrl = formData.get('imageUrl');

    let { email } = authService.getData();

    if (title == "" || description == "" || imageUrl == "") {
        showNotification('There should be no empty field', 'error');
    } else {
        movieService.add({ creator: email, title, description, imageUrl })
            .then(res => {
                showNotification('Movie successfully created.');
                navigate('home');
            });
    }
}

function deleteMovie(e) {
    e.preventDefault();

    let id = e.target.dataset.id;

    movieService.deleteMovie(id)
        .then(res => {
            showNotification('Movie successfully deleted.');
            navigate('home');
        });
}

function onEditMovieSubmit(e, id) {
    e.preventDefault();

    let formData = new FormData(document.forms['edit-movie-form']);

    let title = formData.get('title');
    let description = formData.get('description');
    let imageUrl = formData.get('imageUrl');

    if (title == "" || description == "" || imageUrl == "") {
        showNotification('There should be no empty field', 'error');
    } else {
        movieService.editMovie(id, {
                title,
                description,
                imageUrl
            })
            .then(res => {
                showNotification('Movie successfully edited.');
                navigate(`details/${id}`);
            });
    }
}

function onMovieLike(e, id) {
    e.preventDefault();

    let { email } = authService.getData();

    movieService.likeMovie(id, email)
        .then(res => {
            showNotification('Movie successfully liked.');
            navigate(`details/${id}`);
        })
}

function onMovieSearchSubmit(e) {
    e.preventDefault();

    let formData = new FormData(document.forms['search-movie-form']);

    let searchText = formData.get('search-text');

    navigate(`home?search=${searchText}`);
}

addEventListeners();