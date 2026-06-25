const CART_KEY = "cart";
let discount = 0;

function getCart(){
 return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart){
 localStorage.setItem(CART_KEY, JSON.stringify(cart));
 updateCartCount();
 renderCart();
}

function addToCart(id,name,price,image){

 let cart = getCart();

 let existing = cart.find(item => item.id === id);

 if(existing){

   existing.qty += 1;

 }else{

   cart.push({
     id:id,
     name:name,
     price:price,
     image:image,
     qty:1
   });

 }

 saveCart(cart);

 alert("Added To Cart");
}

function removeFromCart(id){

 let cart = getCart();

 cart = cart.filter(item => item.id !== id);

 saveCart(cart);
}

function increaseQty(id){

 let cart = getCart();

 let item = cart.find(x => x.id===id);

 item.qty++;

 saveCart(cart);
}

function decreaseQty(id){

 let cart = getCart();

 let item = cart.find(x => x.id===id);

 item.qty--;

 if(item.qty<=0){

   cart = cart.filter(x=>x.id!==id);

 }

 saveCart(cart);
}

function updateCartCount(){

 let cart = getCart();

 let total = 0;

 cart.forEach(item=>{

   total += item.qty;

 });

 let badge = document.getElementById("cart-count");

 if(badge){

   badge.innerText = total;

 }
}

function getTotal(){

 let cart = getCart();

 let total = 0;

 cart.forEach(item=>{

   total += item.price * item.qty;

 });

 return total;
}

function renderCart(){

 let cart = getCart();

 let container =
 document.getElementById("cart-items");

 let totalBox =
 document.getElementById("cart-total");

 if(!container) return;

 if(cart.length===0){

   container.innerHTML = `
   <div class="empty">
   Your Cart Is Empty 😔
   </div>
   `;

   totalBox.innerText = "₹0";

   return;
 }

 let html = "";

 cart.forEach(item=>{

   let oldPrice = item.price + 100;

   html += `

<div class="cart-card">

<img src="${item.image}">

<div class="product-info">

<div class="product-name">

${item.name}

</div>

<div class="price">

₹${item.price}

<span class="old-price">

₹${oldPrice}

</span>

</div>

<div class="qty-box">

<button
class="qty-btn"
onclick="decreaseQty(${item.id})">

-

</button>

<span>${item.qty}</span>

<button
class="qty-btn"
onclick="increaseQty(${item.id})">

+

</button>

</div>

<button
class="remove-btn"
onclick="removeFromCart(${item.id})">

Remove

</button>

</div>

</div>
`;

 });

 container.innerHTML = html;

 let total = getTotal() - discount;

 totalBox.innerText = "₹" + total;
}

function applyCoupon(){

 let code =
 document.getElementById("coupon").value;

 if(code==="SAVE10"){

   discount = 100;

   alert("Coupon Applied ₹100 Off");

 }else{

   alert("Invalid Coupon");

 }

 renderCart();
}

async function checkout(){

 const token =
 localStorage.getItem("token");

 if(!token){

   alert("Please Login First");

   window.location = "login.html";

   return;
 }

 let total = getTotal() - discount;

 const res = await fetch(
 "http://localhost:5000/api/payment/create-order",{

 method:"POST",

 headers:{
 "Content-Type":"application/json"
 },

 body: JSON.stringify({
 amount: total
 })

 });

 const order = await res.json();

 const options = {

 key:"YOUR_RAZORPAY_KEY",

 amount: order.amount,

 currency:"INR",

 name:"MEDAYUR",

 order_id: order.id,

 handler: async function(){

 fetch(
 "http://localhost:5000/api/orders/create",{

 method:"POST",

 headers:{
 "Content-Type":"application/json",
 authorization: token
 },

 body: JSON.stringify({

 items:getCart(),

 totalAmount: total

 })

 });

 alert("Payment Successful");

 localStorage.removeItem(CART_KEY);

 window.location.reload();

 }

 };

 const rzp = new Razorpay(options);

 rzp.open();
}

document.addEventListener(
"DOMContentLoaded",
function(){

 updateCartCount();

 renderCart();

});