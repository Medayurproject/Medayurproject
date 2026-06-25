let allProducts = [];

async function loadProducts() {
  try {
    const response = await fetch(
      "https://medayurproject.onrender.com/api/products"
    );

    const products = await response.json();

    allProducts = products;

    displayProducts(products);

  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function displayProducts(products) {

  const container =
    document.getElementById("products-list");

  if (!container) return;

  container.innerHTML = "";

  products.forEach(product => {

    container.innerHTML += `

    <div class="col-md-3">

      <div class="product-card">

        <div class="product-image">

          <img
            src="https://medayurproject.onrender.com${product.image}"
            alt="${product.name}"
          >

        </div>

        <h5>${product.name}</h5>

        <p>₹${product.price}</p>

        <button
          class="buy-btn"
          onclick='addToCart(${JSON.stringify(product)})'
        >
          Add To Cart
        </button>

      </div>

    </div>

    `;
  });
}

function searchProducts() {

  const keyword =
    document.getElementById("searchInput")
    .value
    .toLowerCase();

  const filtered = allProducts.filter(product =>
    product.name.toLowerCase().includes(keyword) ||
    product.category.toLowerCase().includes(keyword)
  );

  displayProducts(filtered);
}

function filterCategory(category) {

  if (category === "all") {
    displayProducts(allProducts);
    return;
  }

  const filtered = allProducts.filter(
    product => product.category === category
  );

  displayProducts(filtered);
}

window.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});