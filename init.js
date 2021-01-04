function addEventListeners() {
    document.querySelector('.navigation').addEventListener('click', navigateHandler);
}

function navigateHandler(e) {
    e.preventDefault();

    if (!e.target.classList.contains('nav-link')) {
        return;
    }

    let url = new URL(e.target.href);

    history.pushState({}, '', url.pathname);

    router(url.pathname.slice(1));
}

addEventListeners();