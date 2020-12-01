let sum = 0;
const valuePlaceholder = document.querySelector(".sum-value");
const resetButton = document.querySelector(".sum-reset");
const addButtons = document.querySelectorAll(".product-add");

addButtons.forEach((button) => {
  button.addEventListener("click", handleAddProduct);
});

resetButton.addEventListener("click", handleReset);

function handleReset() {
  setSumValue(0);
  updateSumValue(sum);
}

function setSumValue(newValue) {
  sum = newValue;
}

function handleAddProduct(e) {
  const productPrice = Number(e.target.dataset.price);
  setSumValue(sum + productPrice);
  updateSumValue(sum);
}

function updateSumValue(sum) {
  const formattedValue = getFormattedSumValue(sum);
  const value = `${formattedValue} Kč`;
  valuePlaceholder.innerHTML = value;
}

function getFormattedSumValue(sum) {
  const formattedSumValueArrayReversed = [];

  sum
    .toString()
    .split("")
    .reverse()
    .forEach((item, i) => {
      if (i > 0 && i % 3 === 0) {
        formattedSumValueArrayReversed.push(" ");
      }
      formattedSumValueArrayReversed.push(item);
    });
  return formattedSumValueArrayReversed.reverse().join("");
}
