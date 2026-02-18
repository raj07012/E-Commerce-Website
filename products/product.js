if (localStorage.getItem('isLoggedIn') !== 'true') {
  window.location.href = '../auth/login.html';
}

let products = [];

async function fetchProducts() {
  try {
    let response = await fetch('https://fakestoreapi.com/products');
    let data = await response.json();
    products = data;
    displayProducts(products);
  } catch (error) {
    console.log('Error fetching products');
  }
}

function displayProducts(list) {
  let container = document.getElementById('products');
  container.innerHTML = '';

  list.forEach((p) => {
    container.innerHTML += `
    <div class="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <img src="${p.image}" class="h-40 w-full object-contain rounded mb-3">
      <h3 class="font-semibold text-sm h-10 overflow-hidden">${p.title}</h3>
      <p class="text-gray-500 text-sm capitalize">${p.category}</p>
      <div class="flex justify-between items-center mt-3">
        <span class="font-bold text-blue-600">$${p.price}</span>
        <button onclick="addToCart(${p.id})"
          class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          Add
        </button>
      </div>
    </div>`;
  });
}

function searchProduct() {
  let value = document.getElementById('search').value.toLowerCase();
  let filtered = products.filter((p) => p.title.toLowerCase().includes(value));
  displayProducts(filtered);
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let product = products.find((p) => p.id === id);
  let existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Added to cart');
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cartCount').innerText = cart.length;
}

function logout() {
  localStorage.removeItem('isLoggedIn');
  window.location.href = '../auth/login.html';
}

fetchProducts();
updateCartCount();
