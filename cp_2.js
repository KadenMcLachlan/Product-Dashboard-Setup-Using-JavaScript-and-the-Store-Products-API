const apiUrl = "https://www.course-api.com/javascript-store-products";
function fetchProductsThen() {
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (products) {
      products.forEach(function (product) {
        console.log(product.fields.name);
      });
    })
    .catch(function (error) {
      console.log("Fetch error:", error);
    });
}
async function fetchProductsAsync() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    handleError(error);
  }
}
function displayProducts(products) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";
  const firstFiveProducts = products.slice(0, 5);
  firstFiveProducts.forEach(function (product) {
    const name = product.fields.name;
    const image = product.fields.image[0].url;
    const price = product.fields.price / 100;
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${image}" alt="${name}">
      <h2>${name}</h2>
      <p>$${price.toFixed(2)}</p>
    `;
    productContainer.appendChild(productCard);
  });
}
function handleError(error) {
  console.log("An error occurred: " + error.message);
}
fetchProductsThen();
fetchProductsAsync();
