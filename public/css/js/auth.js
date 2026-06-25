async function register(){

 const name = document.getElementById("name").value;
 const email = document.getElementById("email").value;
 const password = document.getElementById("password").value;

 const res = await fetch("http://localhost:5000/api/users/register",{

   method:"POST",

   headers:{
     "Content-Type":"application/json"
   },

   body: JSON.stringify({
     name,
     email,
     password
   })

 });

 const data = await res.json();

 alert(data.message);

 if(data.message==="User Registered"){
   window.location="login.html";
 }

}



async function register(){

 const name = document.getElementById("name").value;
 const email = document.getElementById("email").value;
 const password = document.getElementById("password").value;

 const res = await fetch("https://medayurproject.onrender.com/api/users/register",{
   method:"POST",
   headers:{
     "Content-Type":"application/json"
   },
   body: JSON.stringify({
     name,
     email,
     password
   })
 });

 const data = await res.json();

 alert(data.message);

 if(data.message==="User Registered"){
   window.location="login.html";
 }
}

async function login(){

 const email = document.getElementById("email").value;
 const password = document.getElementById("password").value;

 const res = await fetch("https://medayurproject.onrender.com/api/users/login",{
   method:"POST",
   headers:{
     "Content-Type":"application/json"
   },
   body: JSON.stringify({
     email,
     password
   })
 });

 const data = await res.json();

 if(data.token){

   localStorage.setItem("token", data.token);

   alert("Login Success");

   window.location="index.html";

 }else{

   alert(data.message);

 }
}