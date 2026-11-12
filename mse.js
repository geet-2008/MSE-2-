/* ==========================================
   THE FOOD HOUSE - COMPLETE JAVASCRIPT
========================================== */


/* 1. FOOD MENU ARRAY */

const foodItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        price: 249,
        category: "pizza",
        type: "veg",
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600",
        description: "Classic cheese pizza."
    },
    {
        id: 2,
        name: "Farmhouse Pizza",
        price: 349,
        category: "pizza",
        type: "veg",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
        description: "Fresh vegetable pizza."
    },
    {
        id: 3,
        name: "Chicken Pizza",
        price: 399,
        category: "pizza",
        type: "nonveg",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
        description: "Chicken loaded pizza."
    },
    {
        id: 4,
        name: "Veg Burger",
        price: 129,
        category: "burger",
        type: "veg",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
        description: "Crispy veg burger."
    },
    {
        id: 5,
        name: "Chicken Burger",
        price: 179,
        category: "burger",
        type: "nonveg",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=600",
        description: "Juicy chicken burger."
    },
    {
        id: 6,
        name: "Paneer Tikka",
        price: 229,
        category: "indian",
        type: "veg",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600",
        description: "Spicy grilled paneer."
    },
    {
        id: 7,
        name: "Butter Chicken",
        price: 299,
        category: "indian",
        type: "nonveg",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600",
        description: "Creamy butter chicken."
    },
    {
        id: 8,
        name: "Cold Coffee",
        price: 99,
        category: "drinks",
        type: "veg",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600",
        description: "Refreshing cold coffee."
    },
    {
        id: 9,
        name: "Fresh Lemonade",
        price: 79,
        category: "drinks",
        type: "veg",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?w=600",
        description: "Fresh lemon drink."
    },
    {
        id: 10,
        name: "Chocolate Cake",
        price: 149,
        category: "dessert",
        type: "veg",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
        description: "Rich chocolate dessert."
    },
    {
        id: 11,
        name: "Ice Cream",
        price: 89,
        category: "dessert",
        type: "veg",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600",
        description: "Creamy ice cream."
    },
    {
        id: 12,
        name: "Chicken Wings",
        price: 219,
        category: "indian",
        type: "nonveg",
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600",
        description: "Spicy chicken wings."
    }
];


/* 2. DISPLAY MENU */

const menuContainer = document.getElementById("menuContainer");

function displayMenu(items) {

    menuContainer.innerHTML = "";

    if (items.length === 0) {
        menuContainer.innerHTML = "<p>No food items found!</p>";
        return;
    }

    items.forEach(food => {

        const card = document.createElement("div");

        card.className = "menu-card";

        card.innerHTML = `
            <img src="${food.image}" alt="${food.name}">

            <div class="menu-card-content">
                <h3>${food.name}</h3>
                <p>${food.description}</p>
                <p>${food.type.toUpperCase()}</p>
                <span class="price">₹${food.price}</span>
<button onclick="addToCart(${food.id})">
                    Add to Cart
                </button>
            </div>
        ;

        menuContainer.appendChild(card);

    });
}

displayMenu(foodItems);


/* 3. SEARCH AND FILTER */

const searchInput = document.getElementById("searchInput");
const foodType = document.getElementById("foodType");
const categoryFilter = document.getElementById("categoryFilter");

function filterMenu() {

    const search = searchInput.value.toLowerCase();
    const type = foodType.value;
    const category = categoryFilter.value;

    const filtered = foodItems.filter(food => {

        return (
            food.name.toLowerCase().includes(search) &&
            (type === "all" || food.type === type) &&
            (category === "all" || food.category === category)
        );

    });

    displayMenu(filtered);
}

searchInput.addEventListener("input", filterMenu);
foodType.addEventListener("change", filterMenu);
categoryFilter.addEventListener("change", filterMenu);


/* 4. CART AND LOCAL STORAGE */

let cart = [];

try {
    cart = JSON.parse(localStorage.getItem("restaurantCart")) || [];
} catch (error) {
    cart = [];
}


/* SAVE CART */

function saveCart() {
    localStorage.setItem("restaurantCart", JSON.stringify(cart));
}


/* ADD TO CART */

function addToCart(id) {

    const food = foodItems.find(item => item.id === id);

    if (!food) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...food,
            quantity: 1
        });
    }

    saveCart();
    displayCart();

    alert(food.name + " added to cart!");
}


/* 5. DISPLAY CART */

const cartItems = document.getElementById("cartItems");

function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty!</p>";

    }

    cart.forEach(item => {

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = 
            <div>
                <h3>${item.name}</h3>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <div>
                <button onclick="changeQuantity(${item.id}, -1)">−</button>

                <strong>${item.quantity}</strong>

                <button onclick="changeQuantity(${item.id}, 1)">+</button>

                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;

        cartItems.appendChild(div);

    });

    calculateTotal();
}


/* 6. CHANGE QUANTITY */

function changeQuantity(id, change) {

    const item = cart.find(food => food.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(food => food.id !== id);
    }

    saveCart();
    displayCart();
}


/* REMOVE ITEM */

function removeItem(id) {

    cart = cart.filter(food => food.id !== id);

    saveCart();
    displayCart();
}


/* 7. CALCULATE TOTAL */

function calculateTotal() {

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    document.getElementById("subtotal").innerText =
        subtotal.toFixed(2);

    document.getElementById("tax").innerText =
        tax.toFixed(2);

    document.getElementById("total").innerText =
        total.toFixed(2);
}


/* 8. PROCEED TO CHECKOUT */

document.getElementById("checkoutBtn")
.addEventListener("click", function() {

    if (cart.length === 0) {
        alert("Please add food to your cart!");
        return;
    }

    document.getElementById("checkoutSection")
    .scrollIntoView({ behavior: "smooth" });

});


/* 9. DEMO CHECKOUT FORM */

const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", function(event) {

    event.preventDefault();
if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = document.getElementById("orderName").value.trim();
    const phone = document.getElementById("orderPhone").value.trim();
    const address = document.getElementById("orderAddress").value.trim();
    const payment = document.getElementById("paymentMethod").value;

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Enter a valid 10 digit mobile number!");
        return;
    }

    if (!name || !address || !payment) {
        alert("Please fill all required details!");
        return;
    }

    let subtotal = 0;

    const orderedItems = cart.map(item => {

        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        return {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            itemTotal: itemTotal
        };

    });

    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    const orderId = "TFH" + Date.now();

    const order = {
        orderId: orderId,
        customerName: name,
        phone: phone,
        address: address,
        payment: payment,
        items: orderedItems,
        subtotal: subtotal,
        tax: tax,
        total: total,
        status: "Demo Order Received",
        date: new Date().toLocaleString()
    };

    let orders = [];

    try {
        orders = JSON.parse(localStorage.getItem("restaurantOrders")) || [];
    } catch (error) {
        orders = [];
    }

    orders.push(order);

    localStorage.setItem(
        "restaurantOrders",
        JSON.stringify(orders)
    );

    document.getElementById("orderMessage").innerHTML = `
        <h2>Order Successful!</h2>
        <p>Your order has been placed successfully.</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Total Amount:</strong> ₹${total.toFixed(2)}</p>
        <p><strong>Payment:</strong> ${payment}</p>
    `;

    cart = [];

    saveCart();
    displayCart();

    checkoutForm.reset();

});


/* 10. RESERVATION FORM */

const reservationForm = document.getElementById("reservationForm");
const bookingDate = document.getElementById("bookingDate");

function getTodayDate() {

    const today = new Date();

    return today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

}

bookingDate.min = getTodayDate();

reservationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const date = bookingDate.value;

    if (!date || date < getTodayDate()) {
        alert("Please select a valid date!");
        return;
    }

    const reservation = {

        name: document.getElementById("customerName").value,
        email: document.getElementById("customerEmail").value,
        phone: document.getElementById("customerPhone").value,
        guests: document.getElementById("guests").value,
        date: date,
        time: document.getElementById("bookingTime").value,
        request: document.getElementById("specialRequest").value

    };

    let bookings = [];

    try {
        bookings = JSON.parse(localStorage.getItem("restaurantBookings")) || [];
    } catch (error) {
        bookings = [];
    }

    bookings.push(reservation);

    localStorage.setItem(
        "restaurantBookings",
        JSON.stringify(bookings)
    );

    document.getElementById("reservationMessage").innerText =
        "Reservation confirmed successfully!";

    reservationForm.reset();

    bookingDate.min = getTodayDate();

});


/* 11. GALLERY LIGHTBOX */

const galleryImages = document.querySelectorAll(".gallery-container img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

galleryImages.forEach(image => {

    image.addEventListener("click", function() {

        lightbox.style.display = "flex";
        lightboxImage.src = this.src;

    });

});

document.getElementById("closeLightbox")
.addEventListener("click", function() {
    lightbox.style.display = "none";

});

lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }

});


/* 12. FIRST VISIT OFFER POPUP */

const offerPopup = document.getElementById("offerPopup");

function closeOffer() {

    offerPopup.style.display = "none";

    localStorage.setItem("offerShown", "true");

}

document.getElementById("closeOffer")
.addEventListener("click", closeOffer);

if (!localStorage.getItem("offerShown")) {

    offerPopup.style.display = "flex";

}


/* 13. CONTACT FORM */

document.getElementById("contactForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    alert("Thank you! Your message has been received.");

    this.reset();

});


/* 14. INITIAL CART DISPLAY */

displayCart();