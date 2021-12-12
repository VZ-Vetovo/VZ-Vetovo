import { html } from "../lib.js";

const homeTempl = () => html`
<div>
    <img class="wrapper" src="images/vilna.jpg">
</div>`;

export function homePage(ctx) {
    ctx.render(homeTempl());
    ctx.updateNav;
}


