let dish,
  drink,
  dessert = null;

function select_dish(selected_dish) {
  // If a dish is already selected, remove the current selection
  if (dish) {
    dish.classList.remove("selected");
  }

  // Select the new dish
  dish = selected_dish;
  selected_dish.classList.add("selected");

  // Check if order is complete
  is_order_complete();
}

function select_drink(selected_drink) {
  // If a drink is already selected, remove the current selection
  if (drink) {
    drink.classList.remove("selected");
  }

  // Select the new drink
  drink = selected_drink;
  selected_drink.classList.add("selected");

  // Check if order is complete
  is_order_complete();
}

function select_dessert(selected_dessert) {
  // If a dessert is already selected, remove the current selection
  if (dessert) {
    dessert.classList.remove("selected");
  }

  // Select the new dessert
  dessert = selected_dessert;
  selected_dessert.classList.add("selected");

  // Check if order is complete
  is_order_complete();
}

function is_order_complete() {
  // If a dish, a drink and a dessert are all seletected, the order can be finished
  if (dish && drink && dessert) {
    const order_button = document.querySelector(".send-order button");
    order_button.classList.add("enable");
    order_button.innerHTML = "Fechar pedido";
  }
}

function send_order() {
  const user_name = prompt("Qual é o seu nome?");
  const user_address = prompt("Qual é o seu endereço?");

  const dish_name = get_item_name(dish);
  const drink_name = get_item_name(drink);
  const dessert_name = get_item_name(dessert);
  const total =
    get_item_price(dish) + get_item_price(drink) + get_item_price(dessert);
  const total_text = get_value_text(total);

  let msg_builder = "Olá, gostaria de fazer o pedido:\n";
  msg_builder += "- Prato: " + dish_name + "\n";
  msg_builder += "- Bebida: " + drink_name + "\n";
  msg_builder += "- Sobremesa: " + dessert_name + "\n";
  msg_builder += "Total: " + total_text + "\n\n";

  msg_builder += "Nome: " + user_name + "\n";
  msg_builder += "Endereço: " + user_address;

  const msg = msg_builder;
  window.open("https://wa.me/5527997867009?text=" + encodeURIComponent(msg));

  // Hide the confirmation screen
  document.querySelector(".confirmation-screen").classList.remove("show");
}

function get_item_name(item) {
  return item.querySelector(".name").innerHTML;
}

function get_item_price(item) {
  return parseFloat(item.querySelector(".price-value").innerHTML);
}

// Convert a value to a pt-br formatted price text
function get_value_text(value) {
  return "R$ " + value.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

// Only fills and shows the confirmation screen
function confirmation() {
  const confirmation_screen = document.querySelector(".confirmation-screen");

  const confirm_dish = confirmation_screen.querySelector(".dish");
  confirm_dish.querySelector(".name").innerHTML =
    dish.querySelector(".name").innerHTML;
  confirm_dish.querySelector(".price").innerHTML =
    dish.querySelector(".price").innerHTML;

  const confirm_drink = confirmation_screen.querySelector(".drink");
  confirm_drink.querySelector(".name").innerHTML =
    drink.querySelector(".name").innerHTML;
  confirm_drink.querySelector(".price").innerHTML =
    drink.querySelector(".price").innerHTML;

  const confirm_dessert = confirmation_screen.querySelector(".dessert");
  confirm_dessert.querySelector(".name").innerHTML =
    dessert.querySelector(".name").innerHTML;
  confirm_dessert.querySelector(".price").innerHTML =
    dessert.querySelector(".price").innerHTML;

  const total =
    get_item_price(dish) + get_item_price(drink) + get_item_price(dessert);
  const total_text = get_value_text(total);

  const confirm_total = confirmation_screen.querySelector(".total");
  confirm_total.querySelector(".value").innerHTML = total_text;

  confirmation_screen.classList.add("show");
}

// Only hides the confirmation screen
function cancel() {
  document.querySelector(".confirmation-screen").classList.remove("show");
}
