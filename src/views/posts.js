import { getPosts, loader, newPost } from "../apiData/data.js";
import { html } from "../lib.js";

const postTempl = (posts, onPub) => html`
<div id="container">
    <div id="exercise">
        <h1>ОБЯВИ, МНЕНИЯ и КОМЕНТАРИ.</h1>
        <div class="wrapper">
            <div class="card-wrapper">
                <p>Текст: 
                    <input id="content" class="post"/>
                </p>
                <p>Автор: 
                    <input id="author"/>
                </p>
                <button @click=${onPub}>Публикувай</button>
            </div>
            ${posts.length == 0
                ? html`Въведете първият коментар!`
                : posts.map(card)}
        </div>
    </div>
</div>`;

const card = (item) => html`
<div class="card-wrapper">
    <p>${item.content}</p>
    <p>Автор: ${item.author}</p>
</div>`;

export async function postsPage(ctx) {
    ctx.render(loader());

    const items = await getPosts();
    const posts = items.results
    ctx.render(postTempl(posts, onPub));

    async function onPub() {
        const content = document.querySelector('#content').value.trim();
        const author = document.querySelector('#author').value.trim();

        if (content == '' || author == '') {
            return alert('Попълни полетата, преди публикация!')
        }

        const data = { content, author};

        await newPost(data);
        document.querySelector('#content').value = '';
        document.querySelector('#author').value = '';

        ctx.page.redirect(`/forum`);
    }
}