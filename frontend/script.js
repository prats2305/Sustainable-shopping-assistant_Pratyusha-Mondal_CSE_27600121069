const apiUrl = "http://localhost:5000"; // Backend URL

// Utility: Navigate to another page
function navigateTo(page) {
  window.location.href = page;
}

// Login Form Submission
document.getElementById("loginForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Login Successful!");
      navigateTo("homepage.html"); // Redirect to the homepage
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  }
});

// Register Form Submission
document.getElementById("registerForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Registration Successful! Redirecting to login page.");
      navigateTo("login.html"); // Redirect to the login page
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  }
});


// Load Products (For Homepage)
function loadProducts() {
  fetch(`${apiUrl}/api/products`)
    .then(response => response.json())
    .then(products => {
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <button onclick="viewProduct('${product.id}')">View Details</button>
        `;
        productList.appendChild(productCard);
      });
    });
}


// Search for Products
async function searchProducts() {
  const query = document.getElementById("searchInput").value.trim();

  if (!query) {
    alert("Please enter a search term!");
    return;
  }

  // const searchResults = document.getElementById("search-results");
  // searchResults.innerHTML = "<p>Loading...</p>";

  try {
    // Send the search query to the backend
    const response = await fetch(`${apiUrl}/api/Product/search?query=${query}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch search results.");
    }

    const data = await response.json();

    // Clear previous results and product list
    function resetSearch() {
      document.getElementById("searchInput").value = "";
      document.getElementById("search-results").innerHTML = "";
      document.getElementById("product-list").style.display = "flex";
    }    

    // Populate search results
    console.log("Search response data:", data);

    if (data && data.length > 0) {
      data.forEach((product) => {
        console.log("Product:", product); // Log each product for debugging
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
          <button onclick="viewProduct('${product.id}')">View Details</button>
        `;
        document.getElementById("search-results").appendChild(productCard);
      });
    } else {
      console.error("No products found in response:", data);
      document.getElementById("search-results").innerHTML = `<p>No products found for "${query}".</p>`;
    }

  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while fetching search results.");
  }
}


// View Product Details (Redirect to Product Page)
function viewProduct(productId) {
  localStorage.setItem('selectedProduct', productId);
  navigateTo('product.html');
}

// Load Product Details (For Product Page)
function loadProductDetails() {
  const productId = localStorage.getItem('selectedProduct');
  fetch(`${apiUrl}/api/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      const productDetails = document.getElementById('product-details');
      productDetails.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h1>${product.name}</h1>
        <p>Brand: ${product.brand}</p>
        <p>Price: $${product.price}</p>
        <p>Sustainability Score: ${product.sustainability_score}</p>
        <p>Certifications: ${product.certifications.join(', ')}</p>
        <a href="${product.url}" target="_blank">Buy Now</a>
      `;
    });
}

// Load Impact Tracker Data
function loadImpactTracker() {
  fetch(`${apiUrl}/api/impact`)
    .then(response => response.json())
    .then(data => {
      const impactDetails = document.getElementById('impact-details');
      impactDetails.innerHTML = `
        <p>User ID: ${data.userId}</p>
        <p>Purchased Items: ${data.purchases.map(p => p.productName).join(', ')}</p>
        <p>CO2 Saved: ${data.co2_saved} kg</p>
        <p>Date of Purchase: ${data.date}</p>
      `;
    });
}
