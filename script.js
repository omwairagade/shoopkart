// Login check
const user = localStorage.getItem("loggedInUser");
if (!user) window.location.href = "login.html";

document.getElementById("welcome").innerText = "👤 " + user;

// Products
const products = [
  { id: 1, name: "Laptop", price: 50000, image: "images/laptop.jpg" },
  { id: 2, name: "Phone", price: 20000, image: "images/mobile.jpg" },
  { id: 3, name: "Headphones", price: 2000, image: "images/headphone.jpg" },
  { id: 4, name: "Smart Watch", price: 5000, image: "images/smartwatch.jpg" },
  { id: 5, name: "Keyboard", price: 1500, image: "images/keyboard.jpg" },
  { id: 6, name: "Mouse", price: 800, image: "images/mouse.jpg" },
  { id: 7, name: "Tablet", price: 15000, image: "images/tablet.jpg" },
  { id: 8, name: "Camera", price: 30000, image: "images/camera.jpeg" },
];

// Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Show Products
function showProducts(list = products) {
  const div = document.getElementById("products");
  div.innerHTML = "";

  list.forEach(p => {
    div.innerHTML += `
      <div class="product">
        <img src="${p.image}" class="product-img">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add</button>
      </div>
    `;
  });
}

// Add to cart
function addToCart(id) {
  cart.push(products.find(p => p.id === id));
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

// Remove
function removeFromCart(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

// Show cart
function showCart() {
  const div = document.getElementById("cart");
  div.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    div.innerHTML += `
      <div class="product">
        <img src="${item.image}" class="product-img">
        <p>${item.name}</p>
        <p>₹${item.price}</p>
        <button onclick="removeFromCart(${i})">❌</button>
      </div>
    `;
  });

  div.innerHTML += `<h2>Total: ₹${total}</h2>`;
}

// Search
function searchProducts() {
  const q = document.getElementById("search").value.toLowerCase();
  showProducts(products.filter(p => p.name.toLowerCase().includes(q)));
}

// Checkout
function goToCheckout() {
  if (cart.length === 0) return alert("Cart empty");
  window.location.href = "checkout.html";
}

// Dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

// Run
showProducts();
showCart();