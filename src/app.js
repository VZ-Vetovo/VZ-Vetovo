import { getUserData, logout } from "./apiData/data.js";
import { page, render } from "./lib.js";
import { unitsPage } from "./views/indications.js";
import { homePage } from "./views/home.js";
import { postsPage } from "./views/posts.js";
import { reportingPage } from "./views/reporting.js";
import { loginPage } from "./views/login.js";
import { editPage } from "./views/edit.js";

const root = document.querySelector('main');
const navBtns = document.querySelectorAll('nav div a')
document.querySelector('#logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/indications', unitsPage);
page('/forum', postsPage);
page('/reporting', reportingPage);
page('/edit', editPage);


updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content => render(content, root));
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const user = getUserData();
    if (user) {
        [...navBtns].map(b => b.className.includes('user') ? b.style.display = 'inline-block' : b.style.display = 'none');
    } else {
        [...navBtns].map(b => b.className.includes('guest') ? b.style.display = 'inline-block' : b.style.display = 'none');
    }
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}
