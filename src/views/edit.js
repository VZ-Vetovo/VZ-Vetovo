import { getLastIndication, loader, updateThisIndication, _price, _tax } from "../apiData/data.js";
import { html, render } from "../lib.js";
import { download, toCsv } from "./download.js";

const editTempl = (data, onSave, onNew, onExport, kilowats, momentSum, totalSum) => html`
<div id="container">
    <div id="exercise">
        <h1>Отчетен период: ${data.createdAt.split('T')[0]}</h1>

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
                                    <th>Разлика</th>
                                    <th>Сума</th>
                                    <th>Платено</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                ${Object.values(data.units).map(card)}
                                <div></div>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Наличнoст КАСА:</th>
                                    <th>${momentSum.toFixed(2)}лв.</th>
                                    <th></th>
                                    <th></th>
                                    <th>Общо:</th>
                                    <th>${kilowats}кВ</th>
                                    <th>${totalSum.toFixed(2)}лв.</th>
                                </tr>
                            </tfoot>
                        </table>
                        <button @click=${onSave}>Запази Промените</button>
                        <button @click=${onNew}>Добави нов абонат</button>
                        <button @click=${onExport}>Свали Данни</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>`;

const card = (item) => html`
<tr class=${item.paid ? "paid" : "unpaid"}>
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
        <input class="old" .value=${item.old}/>
    </td>
    <td>
        <input class="new" .value=${item.new}/>
    </td>
    <td>
        ${Number(item.new) - Number(item.old)}
    </td>
    <td>
        ${item.elN == '99'
            ? ((Number(item.new) - Number(item.old)) * _price).toFixed(2)
            : ((Number(item.new) - Number(item.old)) * _price + _tax).toFixed(2)}
    </td>
    <td>
        ${item.paid
            ? html`<input class="check" type="checkbox" checked/>`
            : html`<input class="check" type="checkbox"/>`}
        
    </td>
</tr>`;

export async function editPage(ctx) {
    ctx.render(loader());
    const items = await getLastIndication();
    const data = items.results[0];

    let kilowats = 0;
    let momentSum = 0;
    let totalSum = 0;
    Object.values(data.units).forEach(v => {
        if (v.elN != '99') {
            const difference = Number(v.new) - Number(v.old);
            if(v.paid) {
                momentSum += difference * _price + _tax;
            }
            totalSum += difference * _price + _tax;
            kilowats += difference;
        }
    })

    ctx.render(editTempl(data, onSave, onNew, onExport, kilowats, momentSum, totalSum));

    async function onSave() {
        const rows = document.querySelectorAll('tbody tr');
        const newdata = {
            units: {}
        }
        let num = 0;
        rows.forEach(r => {
            const vals = r.querySelectorAll('input');
            num ++;
            newdata.units[num] = {}
            newdata.units[num].paid = r.querySelector('.check').checked
            vals.forEach(v => {
                newdata.units[num][v.className] = v.value
            })
        })
        ctx.render(loader());
        await updateThisIndication(newdata, data.objectId);
        ctx.page.redirect(`/indications`);
    }

    function onNew() {
        const tabl = document.querySelector('tbody');
        const newRow = card({});
        render(newRow, tabl);
    }

    function onExport() {
        const table = document.querySelector('table');
        const csv = toCsv(table);
        download(csv, 'download.csv');
    }
}