async function loadDashboard(){

 const token = localStorage.getItem("adminToken");

const res = await fetch(
"http://localhost:5000/api/admin/dashboard",{

 headers:{
   authorization: token
 }

});

 const data = await res.json();

 document.getElementById("products").innerText =
 data.totalProducts;

 document.getElementById("users").innerText =
 data.totalUsers;

 document.getElementById("orders").innerText =
 data.totalOrders;

}

function logout(){

 localStorage.removeItem("adminToken");

 window.location="admin-login.html";

}

loadDashboard();