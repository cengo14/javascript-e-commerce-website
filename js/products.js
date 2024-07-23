export const fetchProducts = async () => {
  //*db.json dosyasına istek attık
  try {
    const response = await fetch("db.json");
    //*hata olursa yeni bir uyarı oluştur
    if (!response.ok) {
      throw new Error("üzgünüz işleminiz gerçekleşmedi");
    }
    //*veriyi jsona çevir ve dışarıya aktar
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const renderProducts = (products, addToCartCallback) => {
  //*product-list id etiketi jsye çek
  const productList = document.getElementById("product-list");
  productList.innerHTML = products
    .map(
      (product) => `
    <div class="product">
        <img src="${product.image}"
        alt="product" class="product-img">
        <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${product.price}</p>
            <a class="add-to-cart" data-id="${product.id}" >Add to cart</a>
        </div>
    </div>`
    )
    .join("");
  const addToCartButtons = document.getElementsByClassName("add-to-cart");

  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", addToCartCallback);
  }
};
