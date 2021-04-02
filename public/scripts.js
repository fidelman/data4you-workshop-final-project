// open/close cart
const cartContainer = document.querySelector('.cart-container')
const closeCartButton = document.querySelector('.cart-close')
const myCartButton = document.querySelector('.my-cart')

closeCartButton.addEventListener('click', () => {
  cartContainer.classList.remove('show')
})

myCartButton.addEventListener('click', (e) => {
  e.preventDefault()
  cartContainer.classList.add('show')
})

// adding to cart
const products = {
  'id:1': {
    name: 'Apple Watch',
    image: './assets/watch.png',
    price: 10800
  },
  'id:2': {
    name: 'MacBook Pro',
    image: './assets/macbook.png',
    price: 38300
  },
  'id:3': {
    name: 'IPhone 11 Pro',
    image: './assets/iphone.png',
    price: 21200
  },
  'id:4': {
    name: 'Airpods Pro',
    image: './assets/airpods.png',
    price: 5600
  }
}

function getProduct(id) {
  return { ...products[id], id }
}

const addButtons = document.querySelectorAll('.add-to-cart')
Array.from(addButtons).forEach((button) => {
  button.addEventListener('click', handleAddToCart)
})

function handleAddToCart(e) {
  const id = e.target.dataset.id
  const product = getProduct(id)
  addToCart(product)
  updateCartDate()
}

function handleRemoveCartItem(e) {
  const id = e.target.dataset.id
  const product = getProduct(id)
  removeCartItem(product)
  updateCartDate()
}

function updateCartDate() {
  updateSum(calculateSum())
  updateCart()
  updateCartQuantityBadge()
}


///////////////
const cart = {}

function addToCart(product) {
  if (cart[product.id]) {
    cart[product.id].quantity = cart[product.id].quantity + 1
  } else {
    cart[product.id] = {
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1
    }
  }
}

function calculateSum() {
  let sum = 0
  for (const id in cart) {
    const cartItem = cart[id]
    sum = sum + (cartItem.price * cartItem.quantity)
  }

  return sum
}

function removeCartItem(product) {
  delete cart[product.id]
}

function updateCartQuantity() {
  let quantity = 0
  for (const id in cart) {
    const cartItem = cart[id]
    quantity = quantity + cartItem.quantity
  }

  return quantity
}

////////////////

function updateCartQuantityBadge() {
  const quanty = updateCartQuantity()
  const element = document.querySelector('.extra-nav-item-cart-badge')
  element.innerHTML = quanty
}

function updateCart() {
  const cartItemsContainer = document.querySelector('.cart-items')
  const cartItemsElements = []
  for (const id in cart) {
    const cartItem = cart[id]
    const cartItemElement = `
      <div class="cart-item">
        <img width="50" src="${cartItem.image}" alt="${cartItem.name}">
        <div class="cart-item-content">
          <h4 class="cart-item-title">${cartItem.name}</h4>
          <p class="cart-item-perex">
            <span class="cart-item-price">${cartItem.price * cartItem.quantity} Kč</span>
            –
            <span class="cart-item-sum">${cartItem.quantity} x ${cartItem.price} Kč each</span>
          </p>
        </div>
        <button data-id="${id}" class="cart-item-remove fas fa-times"></button>
      </div>
    `
    cartItemsElements.push(cartItemElement)
  }
  cartItemsContainer.innerHTML = cartItemsElements.join('')
  const removeCartItemButtons = cartItemsContainer.querySelectorAll('.cart-item-remove')
  Array.from(removeCartItemButtons).forEach((button) => {
    button.addEventListener('click', handleRemoveCartItem)
  })
}

function updateSum(sum) {
  const container = document.querySelector('.cart-sum')
  container.innerHTML = sum + ' Kč'
}