import { saveNewIndication, getLastIndication, loader } from "../apiData/data.js";
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
                                    <th>Потребител</th>
                                    <th>Тел.№</th>
                                    <th>Бележка</th>
                                    <th>Ел.№</th>
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
        <input class="name" .value=${item.name} disabled/>
    </td>
    <td>
        <input class="phone" .value=${item.phone} disabled/> 
    </td>
    <td>
        <input class="note" .value=${item.note} disabled/> 
    </td>
    <td>
        <input class="elN" .value=${item.elN} disabled/>
    </td>
    <td>
        <input class="old" .value=${item.new} disabled/>
    </td>
    <td>
        <input class="new" .value=${item.new}/>
    </td>
</tr>`;

export async function reportingPage(ctx) {
    ctx.render(loader());
    const items = await getLastIndication();
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
        await saveNewIndication(newdata);
        ctx.page.redirect('/indications');
    }
}