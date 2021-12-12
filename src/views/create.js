import { createNew, getAll, loader } from "../apiData/data.js";
import { html } from "../lib.js";

const createTempl = (data, onSave) => html`
<div id="container">
    <div id="exercise">
        <h1>Ново Отчитане:</h1>
        <div class="wrapper">
            <div class="card-wrapper">
                <div class="row">
                    <div class="col-md-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Ел.№</th>
                                    <th>Потребител</th>
                                    <th>Тел.№</th>
                                    <th>Бележка</th>
                                    <th>Старо</th>
                                    <th>Ново</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${Object.values(data.units).map(card)}
                            </tbody>
                        </table>
                        <button @click=${onSave}>Запази Промените</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

const card = (item) => html`
<tr>
    <td>
        <input class="elN" .value=${item.elN}/>
    </td>
    <td>
        <input class="name" .value=${item.name}/>
    </td>
    <td>
        <input class="phone" .value=${item.phone}/> 
    </td>
    <td>
        <input class="note" .value=${item.note}/> 
    </td>
    <td>
        <input class="old" .value=${item.paid ? item.new : item.old}/>
    </td>
    <td>
        <input class="new" .value=${item.new}/>
    </td>
</tr>`;

export async function createPage(ctx) {
    ctx.render(loader());
    const items = await getAll();
    const data = items.results[0];

    ctx.render(createTempl(data, onSave));

    async function onSave() {
        const rows = document.querySelectorAll('tbody tr');
        const newdata = {
            units: {}
        }
        let num = 0;
        rows.forEach(r => {
            const vals = r.querySelectorAll('input');
            num ++;
            newdata.units[num] = {};
            newdata.units[num].paid = false;
            vals.forEach(v => {
                newdata.units[num][v.className] = v.value
            });
        });
        ctx.render(loader());
        await createNew(newdata);
        ctx.page.redirect('/indications');
    }
}