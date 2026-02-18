// login
function login() {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    alert('No account found');
    return;
  }

  if (email === user.email && password === user.password) {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '../products/main.html';
  } else {
    alert('Invalid credentials');
  }
}

//signup
function signup() {
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  if (name === '' || email === '' || password === '') {
    alert('All fields required');
    return;
  }

  localStorage.setItem('user', JSON.stringify({ name, email, password }));
  alert('Account Created');
  window.location.href = 'login.html';
}
