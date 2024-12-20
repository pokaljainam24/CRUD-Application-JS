document.addEventListener('DOMContentLoaded', () => {
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
            
            const title = product.title;
            const description = product.description;
            const category = product.category;
            const brand = product.brand;
            const price = product.price;
            const quantity = product.quantity;
            const stock = product.stock;
            const image = product.image; 

            total += price * quantity;

            const cartItem = `
                <div class="cart-item d-flex flex-column bg-light text-dark w-100 p-3 rounded mb-3">
                    <div class="d-flex w-100">
                        <img src="${image}" alt="${title}" class="cart-item-image me-3" style="width: 300px; height: 300px;">
                        <div class="text-start w-100">
                            <h5 class="fw-bold">${title}</h5>
                            <p><strong>Description:</strong> ${description}</p>
                            <p><strong>Category:</strong> ${category}</p>
                            <p><strong>Brand:</strong> ${brand}</p>
                            <p><strong>Price:</strong> £${price.toFixed(2)}</p>
                            <p><strong>Quantity:</strong> ${quantity}</p>
                            <p><strong>Stock:</strong> ${stock}</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <div>
                            <button class="btn btn-sm btn-warning me-2" onclick="decreaseQuantity(${index})">-</button>
                            <button class="btn btn-sm btn-primary me-2" onclick="increaseQuantity(${index})">+</button>
                            <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
                        </div>
                        <p class="text-end mx-5 m-auto"><strong>Subtotal:</strong> £${(price * quantity).toFixed(2)}</p>
                    </div>
                </div>
            `;
            cartContainer.innerHTML += cartItem;
        });

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

    window.increaseQuantity = (index) => {
        cart[index].quantity = (cart[index].quantity || 0) + 1;
        saveCart();
        renderCart();
    };

    window.decreaseQuantity = (index) => {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            if (confirm(`Remove ${cart[index].title || 'this item'} from the cart?`)) {
                cart.splice(index, 1);
            }
        }
        saveCart();
        renderCart();
    };

    window.removeItem = (index) => {
        if (confirm(`Are you sure you want to remove ${cart[index].title || 'this item'} from the cart?`)) {
            cart.splice(index, 1);
            saveCart();
            renderCart();
        }
    };

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Initial render
    renderCart();
});
