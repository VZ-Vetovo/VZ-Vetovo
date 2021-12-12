import { register } from "../apiData/data.js";
import { html } from "../lib.js";

const registerTempl = (onSubmit) => html`
`;

export function registerPage(ctx) {
    ctx.render(registerTempl(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        const username = formData.get('username').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repeatPass = formData.get('repeatPass').trim();

        if (email == '' || password == '' || username == '') {
            return alert("Fill all fields!");
        }
        if (password != repeatPass) {
            return alert("Password don\'t match!");
        }

        await register(username, email, password);
        ctx.updateNav();
        ctx.page.redirect('/all');
    }
}
