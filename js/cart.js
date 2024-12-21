const cartContainer = document.getElementById('cart-container');
const cartBadge = document.getElementById('cart-badge');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        updateCartBadge();
        return;
    }

    let total = 0;
    cart.forEach((product, index) => {
        // Ensure quantity exists
        product.quantity = product.quantity || 1;

        // Calculate subtotal for this item
        const subtotal = product.price * product.quantity;

        // Add to total
        total += subtotal;

        const cartItem = `
            <div class="cart-item d-flex flex-column bg-dark text-light w-100 p-3 rounded mb-3">
                <div class="d-flex w-100">
                    <img src="${product.image}" alt="${product.title}" class="cart-item-image me-3 bg-light" style="width: 300px; height: 300px;">
                    <div class="text-start w-100">
                        <h5 class="fw-bold">${product.title}</h5>
                        <p><strong>Description:</strong> ${product.description}</p>
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Brand:</strong> ${product.brand}</p>
                        <p><strong>Price:</strong> £${product.price.toFixed(2)}</p>
                        <p><strong>Quantity:</strong> ${product.quantity}</p>
                        <p><strong>Stock:</strong> ${product.stock}</p>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <div>
                        <button class="btn btn-sm btn-warning me-2" onclick="decreaseQuantity(${index})">-</button>
                        <button class="btn btn-sm btn-primary me-2" onclick="increaseQuantity(${index})">+</button>
                        <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
                    </div>
                    <p class="text-end mx-5 m-auto"><strong>Subtotal:</strong> £${subtotal.toFixed(2)}</p>
                </div>
            </div> <hr class="border border-warning border-2">
        `;
        cartContainer.innerHTML += cartItem;
    });

    // Display total
    cartContainer.innerHTML += `<hr><h4>Total: £${total.toFixed(2)}</h4>`;
    updateCartBadge();
}

function updateCartBadge() {
    const totalItems = cart.reduce((total, product) => total + (product.quantity || 0), 0);

    if (totalItems > 0) {
        cartBadge.style.display = 'inline-block';
        cartBadge.textContent = totalItems;
    } else {
        cartBadge.style.display = 'none';
    }
}

function increaseQuantity(index) {
    cart[index].quantity = (cart[index].quantity || 0) + 1;
    saveCart();
    renderCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        if (confirm(`Remove ${cart[index].title || 'this item'} from the cart?`)) {
            cart.splice(index, 1);
        }
    }
    saveCart();
    renderCart();
}

function removeItem(index) {
    if (confirm(`Are you sure you want to remove ${cart[index].title || 'this item'} from the cart?`)) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Initial render
renderCart();
