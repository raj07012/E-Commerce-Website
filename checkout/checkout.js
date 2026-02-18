let cart = JSON.parse(localStorage.getItem('cart')) || [];

function showSummary() {
  let container = document.getElementById('orderSummary');
  let total = 0;
  container.innerHTML = '';

  cart.forEach((item) => {
    total += item.price * item.quantity;

    container.innerHTML += `
      <div class="flex justify-between mb-2">
        <span>${item.title} x ${item.quantity}</span>
        <span>$${item.price * item.quantity}</span>
      </div>`;
  });

  container.innerHTML += `
    <hr class="my-3">
    <div class="flex justify-between font-bold">
      <span>Total</span>
      <span>$${total}</span>
    </div>`;
}

showSummary();

function placeOrder() {
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let address = document.getElementById('address').value;

  if (name === '' || email === '' || phone === '' || address === '') {
    alert('All fields required');
    return;
  }

  let order = { name, email, phone, address, items: cart };
  localStorage.setItem('order', JSON.stringify(order));
  localStorage.removeItem('cart');

  window.location.href = '../success/success.html';
}
