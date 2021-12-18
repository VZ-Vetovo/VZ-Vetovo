import { getTaxes, loader, updateTaxes } from "../apiData/data.js";
import { html } from "../lib.js";

const taxTempl = (taxes, onSave) => html`
<div id="container">
    <div id="exercise">
        <h1>Въведете нови цени:</h1>
        <div class="wrapper">
            <div class="card-wrapper">
                <p>Абонаментна такса: 
                    <input id="tax" class="elN" .value=${taxes.tax}/>
                </p>
            </div>
            <div class="card-wrapper">
                <p>Цена за киловат/час: 
                    <input id="kWprice" class="elN" .value=${taxes.kWprice}/>
                </p>
            </div>
            <button @click=${onSave}>Запиши</button>
        </div>
    </div>
</div>`;

export async function taxPage(ctx) {
    ctx.render(loader());

    const data = await getTaxes();
    const taxes = data.results[0];

    ctx.render(taxTempl(taxes, onSave));

    async function onSave() {
        const tax = document.querySelector('#tax').value.trim();
        const kWprice = document.querySelector('#kWprice').value.trim();

        if (Number(tax) >= 0 && Number(kWprice) > 0) {
            const newdata = {
                tax: Number(tax),
                kWprice: Number(kWprice)
            }
           
            ctx.render(loader());
            await updateTaxes(newdata, taxes.objectId);
            ctx.page.redirect('/edit');

        } else {
            alert('Невалидни данни!')
        }
    }

}