const products = [
    { id: 1, name: "Laptop", category: "Electronics", description: "Powerful laptop for work and gaming.", price: 999.99, image: "https://cdn.mos.cms.futurecdn.net/FUi2wwNdyFSwShZZ7LaqWf.jpg" },
    { id: 2, name: "Smartphone", category: "Electronics", description: "Latest model with high-resolution camera.", price: 699.99, image: "https://scdn.comfy.ua/89fc351a-22e7-41ee-8321-f8a9356ca351/https://cdn.comfy.ua/media/catalog/product/i/p/iphone_16_pro_max_desert_titanium_pdp_image_position_1__ce-ww.jpg/w_1440" },
    { id: 3, name: "T-Shirt", category: "Clothing", description: "Comfortable cotton t-shirt.", price: 19.99, image: "https://veirdo.in/cdn/shop/files/ai_creative_0000_Layer_6.jpg?v=1736570574" },
    { id: 4, name: "Jeans", category: "Clothing", description: "Stylish denim jeans.", price: 39.99, image: "https://www.motivi.com/on/demandware.static/-/Sites-miroglio-master/default/dwa8f39eaa/images/MOTIVI/P491Q003485N004_12S_high-res.jpg" },
    { id: 5, name: "Novel", category: "Books", description: "Bestselling fiction novel.", price: 14.99, image: "https://images.pexels.com/photos/1643033/pexels-photo-1643033.jpeg?cs=srgb&dl=pexels-natalie-bond-320378-1643033.jpg&fm=jpg" },
    { id: 6, name: "Textbook", category: "Books", description: "Comprehensive guide to web development.", price: 49.99, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/English_textbook.jpg/1200px-English_textbook.jpg" }
];

let cart = [];

function displayProducts(productsToDisplay) {
    const productsSection = document.getElementById("products");
    productsSection.innerHTML = "";
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement("article");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        
        productsSection.appendChild(productCard);
    });
}

function handleCategoryClick(e) {
    e.preventDefault();
    
    const category = this.getAttribute("data-category");
    if (category === "all") {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

function handleSearchInput() {
    const searchTerm = this.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

function handleAddToCart(e) {
    if (e.target.classList.contains("add-to-cart")) {
        const productId = parseInt(e.target.getAttribute("data-id"));
        const product = products.find(p => p.id === productId);
        
        cart.push(product);
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        
        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            updateCartDisplay();
        });
        
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });
    
    document.getElementById("cart-count").textContent = cart.length;
}

displayProducts(products);
updateCartDisplay();

document.querySelectorAll("#filters a").forEach(link => {
    link.addEventListener("click", handleCategoryClick);
});
document.getElementById("search-input").addEventListener("input", handleSearchInput);
document.getElementById("products").addEventListener("click", handleAddToCart);
document.getElementById("checkout").addEventListener("click", () => {
    alert("Proceeding to checkout...");
});