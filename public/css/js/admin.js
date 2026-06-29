// ==========================================
// MEDAYUR ADMIN PANEL
// admin.js (Part 1)
// ==========================================

const API_URL = "https://medayurproject.onrender.com";

const token = localStorage.getItem("adminToken");

if (!token) {
    window.location = "admin-login.html";
}

// ==========================================
// DASHBOARD
// ==========================================

async function loadDashboard() {

    try {

        const res = await fetch(`${API_URL}/api/admin/dashboard`, {

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await res.json();

        document.getElementById("products").innerText =
            data.totalProducts || 0;

        document.getElementById("users").innerText =
            data.totalUsers || 0;

        document.getElementById("orders").innerText =
            data.totalOrders || 0;

    }

    catch (err) {

        console.log(err);

        alert("Dashboard Load Failed");

    }

}


// ==========================================
// LOAD ALL PRODUCTS
// ==========================================

async function loadProducts() {

    try {

        const res = await fetch(`${API_URL}/api/products`);

        const products = await res.json();

        let html = "";

        products.forEach(product => {

            html += `

<tr>

<td>

<img
src="${API_URL}${product.image}"
width="70">

</td>

<td>

<b>${product.name}</b>

<br>

<small>${product.brand || ""}</small>

</td>

<td>

${product.category || ""}

</td>

<td>

₹${product.price}

</td>

<td>

${product.stock}

</td>

<td>

${product.soldOut ?

'<span class="badge bg-danger">Sold Out</span>'

:

'<span class="badge bg-success">Available</span>'

}

</td>

<td>

<button
class="btn btn-danger btn-sm"
onclick="deleteProduct('${product._id}')">

Delete

</button>

</td>

</tr>

`;

        });

        document.getElementById("productsTable").innerHTML = html;

    }

    catch (err) {

        console.log(err);

    }

}


// ==========================================
// ADD PRODUCT
// ==========================================

document
.getElementById("productForm")
.addEventListener("submit", addProduct);

async function addProduct(e) {

    e.preventDefault();

    const form =
        document.getElementById("productForm");

    const formData =
        new FormData(form);

    try {

        const res = await fetch(

            `${API_URL}/api/admin/add-product`,

            {

                method: "POST",

                headers: {

                    Authorization: `Bearer ${token}`

                },

                body: formData

            }

        );

        const data = await res.json();

        if (data.success) {

            alert("Product Added Successfully");

            form.reset();

            loadProducts();

            loadDashboard();

        }

        else {

            alert(data.message);

        }

    }

    catch (err) {

        console.log(err);

        alert("Server Error");

    }

}

// ==========================================
// DELETE PRODUCT
// ==========================================

async function deleteProduct(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

        const res = await fetch(

            `${API_URL}/api/admin/delete-product/${id}`,

            {
                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`
                }

            }

        );

        const data = await res.json();

        if (data.success) {

            alert("Product Deleted Successfully");

            loadProducts();

            loadDashboard();

        } else {

            alert(data.message || "Delete Failed");

        }

    }

    catch (err) {

        console.log(err);

        alert("Server Error");

    }

}


// ==========================================
// SEARCH PRODUCT
// ==========================================

function searchProducts() {

    const keyword = document
        .getElementById("searchProduct")
        .value
        .toLowerCase();

    const table = document.getElementById("productsTable");

    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        const text = rows[i].innerText.toLowerCase();

        if (text.includes(keyword)) {

            rows[i].style.display = "";

        } else {

            rows[i].style.display = "none";

        }

    }

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    if (!confirm("Logout Admin?")) return;

    localStorage.removeItem("adminToken");

    window.location = "admin-login.html";

}


// ==========================================
// AUTO REFRESH DASHBOARD
// ==========================================

setInterval(() => {

    loadDashboard();

}, 30000);


// ==========================================
// PAGE LOAD
// ==========================================

window.onload = () => {

    loadDashboard();

    loadProducts();

};


// ==========================================
// FUTURE READY (EDIT PRODUCT)
// ==========================================

function editProduct(id){

    alert(
        "Edit Product Feature will be added in next update."
    );

}