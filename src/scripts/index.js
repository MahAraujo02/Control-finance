import { valuesCategory, insertedValues } from "./valuesDatabase.js";
import { newValue } from "./modal.js";

export function renderTransactionList(transactions = []) {
  const main = document.querySelector("#app");
  main.innerHTML = "";

  const total = transactions.reduce((acc, item) => acc + parseFloat(item.value), 0).toFixed(2);
  
  transactions.forEach((item) => {
    main.insertAdjacentHTML(
      "beforeend",
      `
        <div class="item_list">
          <div class="align_item_list">
            <h3 class="item_value">R$ ${item.value}</h3>
            <div class="align_category_and_remove">
              <span class="item_category">${valuesCategory[item.categoryID]}</span>
              <i data-id="${item.id}" class="fa-solid fa-trash remove_button"></i>
            </div>
          </div>
        </div>
      `
    );
  });
  
  document.querySelector('#soma').innerHTML = `R$ ${total}`;
  attachRemoveEvents();
}

function filterTransactionsByCategory(categoryID) {
  const filteredTransactions = insertedValues.filter((item) => item.categoryID === categoryID);
  renderTransactionList(filteredTransactions);
}

document.querySelector('#entradas').addEventListener('click', () => filterTransactionsByCategory(0));
document.querySelector('#saidas').addEventListener('click', () => filterTransactionsByCategory(1));
document.querySelector('#todos').addEventListener('click', () => renderTransactionList(insertedValues));

function attachRemoveEvents() {
  document.querySelectorAll('.remove_button').forEach((button) => {
    button.addEventListener('click', function () {
      const itemId = parseInt(button.getAttribute('data-id'));
      const index = insertedValues.findIndex((elem) => elem.id === itemId);

      if (index !== -1) {
        insertedValues.splice(index, 1);
        renderTransactionList(insertedValues);
      }
    });
  });
}

renderTransactionList(insertedValues);
newValue();
