import { getLastIndication, _tax, _price, loader } from "../apiData/data.js";
import { html } from "../lib.js";

const allTempl = (data) => html`
<div id="container">
    <div id="exercise">
        <h1>Отчетени показания до: ${data.createdAt.split('T')[0]}</h1>
        <div class="wrapper">
            <div class="card-wrapper">
                <div class="row">
                    <div class="col-md-12">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Ел.№</th>
                                    <th>Потребител</th>
                                    <th>Старо</th>
                                    <th>Ново</th>
                                    <th>Разлика</th>
                                    <th>Сума</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${Object.values(data.units).map(card)}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th colspan="4">За информация Н.Георгиева: 0885805644</th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th class="paid">Платено</th>
                                    <th></th>
                                    <th></th>
                                    <th class="unpaid">Неплатено</th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

const card = (item) => html`
<tr class=${item.paid ? "paid" : "unpaid"}>
    <td>
        <p>${item.elN}</p>
    </td>
    <td>
        <p>${item.name}</p>
    </td>
    <td>
        <p>${item.old}</p>
    </td>
    <td>
        <p>${item.new}</p>
    </td>
    <td>
        <p>${Number(item.new) - Number(item.old)}</p>
    </td>
    <td>
        <p>${((Number(item.new) - Number(item.old)) * _price + _tax).toFixed(2)}</p>
    </td>
</tr>`;

export async function unitsPage(ctx) {
    ctx.render(loader());
    const items = await getLastIndication();
    const data = items.results[0];

    ctx.render(allTempl(data));
}