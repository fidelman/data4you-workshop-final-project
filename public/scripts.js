let summary = 0;

const buttonReset = document.querySelector(".cart-reset");
const pricePlaceholder = document.querySelector(".price-number");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

buttonReset.addEventListener("click", handleReset);

function handleReset() {
  summary = 0;
  updateDOMValue();
}

function updateDOMValue() {
  pricePlaceholder.innerHTML = summary;
}

addToCartButtons.forEach(function (button) {
  button.addEventListener("click", handleAddToCart);
});

function handleAddToCart(e) {
  const price = +e.target.dataset.price;
  summary += price;
  updateDOMValue();
}
