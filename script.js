// Cart Storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add items to cart
function addToCart(title, price) {
    let book = cart.find(item => item.title === title);
    if (book) {
        book.quantity += 1;
    } else {
        cart.push({ title, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${title} added to cart!`);
}

// Function to display cart items
function displayCart() {
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
    cartList.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((book, index) => {
        let li = document.createElement("li");
        li.textContent = `${book.title} - $${book.price} x ${book.quantity}`;
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);
        cartList.appendChild(li);
        totalPrice += book.price * book.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to remove items from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Function to clear cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Order placed successfully!");
    clearCart();
}

// Load cart items on cart page
if (document.getElementById("cart-list")) {
    displayCart();
}

// Book Carousel
let books = [
    { title: "The Great Gatsby", price: 10.99, img: "https://m.media-amazon.com/images/I/61OTNorhqVS._AC_UF894,1000_QL80_.jpg" },
    { title: "To Kill A Mockingbird", price: 9.99, img: "https://m.media-amazon.com/images/I/81aY1lxk+9L._AC_UF1000,1000_QL80_.jpg" },
    { title: "Pride and Prejudice", price: 8.99, img: "https://m.media-amazon.com/images/I/812wzoJvRLL._AC_UF1000,1000_QL80_.jpg" },
    { title: "1984", price: 12.99, img: "https://m.media-amazon.com/images/I/81qZ5kGMQ1L._AC_UF1000,1000_QL80_.jpg" },
    { title: "The Last Unicorn", price: 6.99, img: "https://m.media-amazon.com/images/I/91HdWxrG4wL._AC_UF1000,1000_QL80_.jpg" },
    { title: "Go Set a Watchman", price: 10.00, img: "https://img.buzzfeed.com/buzzfeed-static/static/2024-03/13/17/asset/9e355860b963/sub-buzz-987-1710351104-2.jpg" },
    { title: "So Big", price: 12.99, img: "https://ineedabookcover.com/wp-content/uploads/2023/12/SoBig-OliverMunday.jpeg" },
    { title: "The Song of Achilles", price: 14.99, img: "https://img.buzzfeed.com/buzzfeed-static/static/2024-11/4/19/asset/8d975c6cc551/sub-buzz-723-1730747955-1.jpg" },
    { title: "Yellowface", price: 7.99, img: "https://www.gileshoover.com/wp-content/uploads/2024/01/yellowface_unknown_william-morrow.jpg" },
    { title: "Babel", price: 9.99, img: "https://images-us.bookshop.org/ingram/9780063021433.jpg?height=1200&v=v2-cdbecd0c7fa249aa9f688d8f035b484a" },
    { title: "Murder Up My Sleeve", price: 12.99, img: "https://i.ebayimg.com/thumbs/images/g/E1QAAOSw7dJnYJ7p/s-l1200.jpg" },
    { title: "Harry Potter and the Goblet of Fire", price: 12.99, img: "https://m.media-amazon.com/images/I/71wSgm7LlUL._AC_UF1000,1000_QL80_.jpg" },
    { title: "The Poppy War", price: 9.99, img: "https://m.media-amazon.com/images/I/71ZVpkRIGsL._AC_UF1000,1000_QL80_.jpg" },
    { title: "The Bright and Breaking Sea", price: 8.99, img: "https://everybookadoorway.com/wp-content/uploads/sites/414/2024/05/The-Bright-and-Breaking-Sea-by-Chloe-Neill.jpg" },
    { title: "Beyond Armageddon", price: 8.99, img: "https://classicsofsciencefiction.com/wp-content/uploads/2023/04/beyond-armageddon-paperback-cover.jpg?w=664" },
    { title: "Messenger of Fear", price: 10.50, img: "https://i.pinimg.com/736x/92/4b/98/924b989bb7b6c8bb69e6112e8fbbb986.jpg" },
    { title: "Blood Over Bright Haven", price: 9.00, img: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1545e61c-37e8-4e5e-952a-e8203afdae16_664x1000.jpeg" },
    { title: "Murder in the Family", price: 11.99, img: "https://bookshelfthomasville.com/cdn/shop/files/murderinthefamily.jpg?v=1691801157" }
];

let currentIndex = 0;
const booksPerPage = 6;

function displayBooks() {
    const bookList = document.querySelector(".book-list");
    bookList.innerHTML = "";
    let endIndex = Math.min(currentIndex + booksPerPage, books.length);
    
    for (let i = currentIndex; i < endIndex; i++) {
        let book = books[i];
        let bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = `
            <img src="${book.img}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>$${book.price.toFixed(2)}</p>
            <button onclick="addToCart('${book.title}', ${book.price})">Add to Cart</button>
        `;
        bookList.appendChild(bookElement);
    }
}

function nextBooks() {
    if (currentIndex + booksPerPage < books.length) {
        currentIndex += booksPerPage;
        displayBooks();
    }
}

function prevBooks() {
    if (currentIndex - booksPerPage >= 0) {
        currentIndex -= booksPerPage;
        displayBooks();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    displayBooks();
    document.getElementById("next-btn").addEventListener("click", nextBooks);
    document.getElementById("prev-btn").addEventListener("click", prevBooks);
});
