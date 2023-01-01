const productsContainer = document.querySelector(".products-container");

let filteredProducts = [...products];

const displayProducts = () => {
  const filteredItems = filteredProducts
    .map((article) => {
      const { title, image, price } = article;
      // console.log(article);
      return `<article class="product">
          <img
            src="${image}"
            alt="${title}"
            class="product-img"
          />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">${price}€</span>
          </footer>
        </article>`;
    })
    .join("");

  productsContainer.innerHTML = filteredItems;
};

displayProducts();

const form = document.querySelector(".input-form");
const input = document.querySelector(".search-input");
const compagnies = document.querySelector(".compagnies");

form.addEventListener("keyup", () => {
  const inputValue = input.value.toLowerCase();

  filteredProducts = products.filter((article) => {
    return article.title.toLowerCase().includes(inputValue);
  });

  displayProducts();

  if (filteredProducts.length < 1) {
    productsContainer.textContent = "Pas d'articles disponibles";
    productsContainer.style.color = "red";
    return;
  } else {
    productsContainer.style.color = "black";
  }
});

const displayButtons = () => {
  const buttons = [
    "all",
    ...new Set(products.map((product) => product.company)),
  ];

  compagnies.innerHTML = buttons
    .map((company) => {
      return `<button class='company-btn' data-id="${company}">${company}</button>`;
    })
    .join("");
};

displayButtons();

compagnies.addEventListener("click", (event) => {
  if (event.target.classList.contains("company-btn")) {
    if (event.target.dataset.id === "all") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter((product) => {
        return product.company === event.target.dataset.id;
      });
    }
  }
  input.value = "";
  displayProducts();
});
