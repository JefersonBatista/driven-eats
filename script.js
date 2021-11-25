let dish,
  drink,
  dessert = null;

function selectDish(selectedDish) {
  // If a dish is already selected, remove the current selection
  if (dish) {
    dish.classList.remove("selected");
  }

  // Select the new dish
  dish = selectedDish;
  selectedDish.classList.add("selected");

  // Check if order is complete
  isOrderComplete();
}

function selectDrink(selectedDrink) {
  // If a drink is already selected, remove the current selection
  if (drink) {
    drink.classList.remove("selected");
  }

  // Select the new drink
  drink = selectedDrink;
  selectedDrink.classList.add("selected");

  // Check if order is complete
  isOrderComplete();
}

function selectDessert(selectedDessert) {
  // If a dessert is already selected, remove the current selection
  if (dessert) {
    dessert.classList.remove("selected");
  }

  // Select the new dessert
  dessert = selectedDessert;
  selectedDessert.classList.add("selected");

  // Check if order is complete
  isOrderComplete();
}

function isOrderComplete() {
  // If a dish, a drink and a dessert are all seletected, the order can be finished
  if (dish && drink && dessert) {
    const orderButton = document.querySelector(".send-order button");
    orderButton.classList.add("enable");
    orderButton.innerHTML = "Fechar pedido";
  }
}

function sendOrder() {
  const userName = prompt("Qual é o seu nome?");
  const userAddress = prompt("Qual é o seu endereço?");

  const dishName = getItemName(dish);
  const drinkName = getItemName(drink);
  const dessertName = getItemName(dessert);
  const total =
    getItemPrice(dish) + getItemPrice(drink) + getItemPrice(dessert);
  const totalText = getValueText(total);

  let msgBuilder = "Olá, gostaria de fazer o pedido:\n";
  msgBuilder += "- Prato: " + dishName + "\n";
  msgBuilder += "- Bebida: " + drinkName + "\n";
  msgBuilder += "- Sobremesa: " + dessertName + "\n";
  msgBuilder += "Total: " + totalText + "\n\n";

  msgBuilder += "Nome: " + userName + "\n";
  msgBuilder += "Endereço: " + userAddress;

  const msg = msgBuilder;
  window.open("https://wa.me/5527997867009?text=" + encodeURIComponent(msg));

  // Hide the confirmation screen and reset initial screen
  document.querySelector(".confirmation-screen").classList.remove("show");
  undoAllSelections();
}

function getItemName(item) {
  return item.querySelector(".name").innerHTML;
}

function getItemPrice(item) {
  const priceString = item.querySelector(".price").innerHTML;

  // Removing 'R$ ' before convert to value
  return parseFloat(priceString.slice(3).replace(",", "."));
}

// Convert a value to a pt-br formatted price text
function getValueText(value) {
  return "R$ " + value.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

// Only fills and shows the confirmation screen
function confirmation() {
  const confirmationScreen = document.querySelector(".confirmation-screen");

  // Remove 'R$ ' from all individual prices

  const confirmDish = confirmationScreen.querySelector(".dish");
  confirmDish.querySelector(".name").innerHTML =
    dish.querySelector(".name").innerHTML;
  confirmDish.querySelector(".price").innerHTML = dish
    .querySelector(".price")
    .innerHTML.slice(3);

  const confirmDrink = confirmationScreen.querySelector(".drink");
  confirmDrink.querySelector(".name").innerHTML =
    drink.querySelector(".name").innerHTML;
  confirmDrink.querySelector(".price").innerHTML = drink
    .querySelector(".price")
    .innerHTML.slice(3);

  const confirmDessert = confirmationScreen.querySelector(".dessert");
  confirmDessert.querySelector(".name").innerHTML =
    dessert.querySelector(".name").innerHTML;
  confirmDessert.querySelector(".price").innerHTML = dessert
    .querySelector(".price")
    .innerHTML.slice(3);

  const total =
    getItemPrice(dish) + getItemPrice(drink) + getItemPrice(dessert);
  const totalText = getValueText(total);

  const confirmTotal = confirmationScreen.querySelector(".total");
  confirmTotal.querySelector(".value").innerHTML = totalText;

  confirmationScreen.classList.add("show");
}

// Only hides the confirmation screen
function cancel() {
  document.querySelector(".confirmation-screen").classList.remove("show");
}

function undoAllSelections() {
  const allSelected = Array.from(document.querySelectorAll(".selected"));
  allSelected.forEach((item) => item.classList.remove("selected"));

  // Reset order button
  const orderButton = document.querySelector(".send-order button");
  orderButton.classList.remove("enable");
  orderButton.innerHTML = "Selecione os 3 itens para fechar o pedido";

  // Scroll to begin
  window.scrollTo(0, 0);
}
