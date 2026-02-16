const form = document.getElementById("expenseForm");
const list = document.getElementById("list");
const totalDisplay = document.getElementById("total");
const search = document.getElementById("search");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function save() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function render(data = expenses) {
  list.innerHTML = "";
  let total = 0;

  data.forEach((exp, index) => {
    total += Number(exp.amount);

    const li = document.createElement("li");
    li.innerHTML = `
      ${exp.title} - ₹${exp.amount} (${exp.category})
      <span class="delete" onclick="removeExpense(${index})">X</span>
    `;
    list.appendChild(li);
  });

  totalDisplay.textContent = total;
}

function removeExpense(i) {
  expenses.splice(i,1);
  save();
  render();
}

form.addEventListener("submit", e=>{
  e.preventDefault();

  const expense = {
    title: form.title.value,
    amount: form.amount.value,
    category: form.category.value
  };

  expenses.push(expense);
  save();
  render();
  form.reset();
});

search.addEventListener("input", ()=>{
  const value = search.value.toLowerCase();
  const filtered = expenses.filter(e =>
    e.title.toLowerCase().includes(value)
  );
  render(filtered);
});

render();
