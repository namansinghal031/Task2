document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');

    const updateCartCount = () => {
        cartCountElement.textContent = cart.length;
    };

    const addToCart = (product) => {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Product added to cart');
    };

    // Add to cart functionality
    document.querySelectorAll('.product button, .product-details button').forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: parseFloat(button.dataset.price)
            };
            addToCart(product);
        });
    });

    // Display cart items
    if (window.location.pathname.endsWith('cart.html')) {
        const cartItemsContainer = document.querySelector('.cart-items');
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `<h2>${item.name}</h2><p>$${item.price.toFixed(2)}</p>`;
            cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });

        document.getElementById('cart-total').textContent = total.toFixed(2);
    }

    // Payment form submission
    if (document.querySelector('.payment-form')) {
        document.querySelector('.payment-form').addEventListener('submit', event => {
            event.preventDefault();
            alert('Payment submitted');
        });
    }

    updateCartCount();
});