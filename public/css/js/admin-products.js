async function addProduct(){

 const token = localStorage.getItem("adminToken");

 const name = document.getElementById("name").value;
 const price = document.getElementById("price").value;
 const image = document.getElementById("image").files[0];

 const formData = new FormData();

 formData.append("name", name);
 formData.append("price", price);
 formData.append("image", image);

 const res = await fetch(
 "http://localhost:5000/api/admin/add-product",{

   method:"POST",

   headers:{
     authorization: token
   },

   body: formData
 });

 const data = await res.json();

 alert(data.message || "Product Added");
}