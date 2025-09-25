// Shopping cart functionality
let cart = [];
let cartCount = 0;

function addToCart(id, productName, price, image) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(`${productName} agregado al carrito!`, 'success');
}

function removeFromCart(id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        updateCartDisplay();
        showNotification('Producto removido del carrito', 'info');
    }
}

function updateCartDisplay() {
    const cartCountElement = document.getElementById('cartCount');
    const cartItemsElement = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    // Update cart count
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartCount;
    
    // Update cart items
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p class="text-secondary text-center mt-5">Tu carrito está vacío</p>';
    } else {
        cartItemsElement.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price.toLocaleString()} CLP</div>
                    <div class="d-flex align-items-center mt-2">
                        <button class="btn btn-sm btn-outline-secondary me-2" onclick="removeFromCart(${item.id})">-</button>
                        <span class="me-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="addToCart(${item.id}, '${item.name}', ${item.price}, '${item.image}')">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `${total.toLocaleString()} CLP`;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar.classList.contains('active')) {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    } else {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    }
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    showNotification('Carrito vaciado', 'info');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'warning');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Procesando compra por ${total.toLocaleString()} CLP`, 'success');
    
    // Simulate checkout process
    setTimeout(() => {
        clearCart();
        toggleCart();
        showNotification('¡Compra realizada con éxito!', 'success');
    }, 2000);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>${message}
        <button type="button" class="btn-close btn-close-white ms-auto" onclick="this.parentElement.remove()"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Product filtering functionality
function filterProducts(category) {
    const products = document.querySelectorAll('.producto-card');
    products.forEach(product => {
        if (category === 'todos' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Búsqueda
document.getElementById('searchInput').addEventListener('input', function () {
  let searchValue = this.value.toLowerCase();
  document.querySelectorAll('.producto-card').forEach(card => {
    let name = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = name.includes(searchValue) ? 'block' : 'none';
  });
});

// Filtro por precio
document.getElementById('priceFilter').addEventListener('change', function () {
  let filter = this.value;
  document.querySelectorAll('.producto-card').forEach(card => {
    let price = parseInt(card.querySelector('.precio').textContent.replace(/\D/g, ''));
    if (
      (filter === "low" && price < 50000) ||
      (filter === "medium" && price >= 50000 && price <= 200000) ||
      (filter === "high" && price > 200000) ||
      (filter === "")
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});


function redeemPoints(points) {
  let currentPoints = parseInt(document.getElementById('levelUpPoints').textContent.replace(/,/g, ""));
  if (currentPoints >= points) {
    document.getElementById('levelUpPoints').textContent = (currentPoints - points).toLocaleString();
    alert(`¡Has canjeado ${points} puntos!`);
  } else {
    alert("No tienes suficientes puntos LevelUp");
  }
}
