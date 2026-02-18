let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCart() {
  let container = document.getElementById('cartItems');
  let summaryBox = document.getElementById('summaryBox');

  container.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="bg-white p-6 rounded-xl shadow text-center">
        <p class="text-gray-500">Your cart is empty 🛒</p>
        <a href="index.html"
          class="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Continue Shopping
        </a>
      </div>
    `;
    summaryBox.classList.add('hidden');
    return;
  }

  summaryBox.classList.remove('hidden');

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    container.innerHTML += `
    <div class="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between items-center gap-4">

      <div class="flex items-center gap-4 w-full sm:w-auto">
        <img src="${item.image}"
          class="w-20 h-20 rounded object-contain bg-gray-50 p-2">

        <div>
          <h3 class="font-semibold text-sm sm:text-base">
            ${item.title}
          </h3>
          <p class="text-gray-500">
            $${item.price}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">

        <button onclick="changeQty(${index},-1)"
          class="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
          -
        </button>

        <span class="font-medium">${item.quantity}</span>

        <button onclick="changeQty(${index},1)"
          class="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
          +
        </button>

        <button onclick="removeItem(${index})"
          class="text-red-600 hover:underline ml-4">
          Remove
        </button>

      </div>

    </div>
    `;
  });

  document.getElementById('subtotal').innerText = '$' + total.toFixed(2);
  document.getElementById('total').innerText = '$' + total.toFixed(2);
}

function changeQty(index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

displayCart();
