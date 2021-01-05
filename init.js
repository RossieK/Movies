function addEventListeners() {
    let navigationTemplate = Handlebars.compile(document.getElementById('navigation-template').innerHTML);
    Handlebars.registerPartial('navigationPartial', navigationTemplate);

    navigate('home');
}

function navigateHandler(e) {
    e.preventDefault();

    if (!e.target.classList.contains('nav-link')) {
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

addEventListeners();