let currentIndex = 0;
let cartCount = 0;
let cartItems = [];
let totalPrice = [];

function showSlide(index) {
  const carousel = document.getElementById('carousel');
  const slides = document.getElementsByClassName('slide');

  if (index >= slides.length) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = slides.length - 1;
  } else {
    currentIndex = index;
  }

  const newTransformValue = -currentIndex * 100 + '%';
  carousel.style.transform = 'translateX(' + newTransformValue + ')';
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

document.addEventListener("DOMContentLoaded", function () {
  var selects = document.querySelectorAll(".size");

  selects.forEach(function (select) {
    // Store the initial/default value in a data attribute
    var initialValue = select.value;
    select.dataset.initialValue = initialValue;

    var priceSpan = document.querySelectorAll(".price");
    
    priceSpan.forEach((element) =>{
      element.textContent = "Price: \u20B1" + parseInt(initialValue).toFixed(2);
    })                 
    
  });
});

var parent = document.querySelector(".main-carousel-container");

// parent.addEventListener("click", (event) => {
//   if (event.target.tagName === "BUTTON") {
//     // console.log(event.target.tagName)
//     var parentDiv = event.target.closest("div");
//     // var price = parentDiv.querySelector(".select").value;

//     // console.log(price);
//   }
// });

parent.addEventListener("change", (event) => {
  if (event.target.tagName === "SELECT") {
    var parentDiv = event.target.closest("div");
    var price = event.target.value;

    var priceUpdate = parentDiv.querySelector(".price");

    var select = event.target.closest("select");
    var selectedOption = select.options[select.selectedIndex];    
    var x = selectedOption.dataset.size;

    console.log(x)

    priceUpdate.textContent = ``;

    // Update the price text when the select value changes
    priceUpdate.textContent = "Price: \u20B1" + parseInt(price).toFixed(2);
  }
});

// function addToCart(productNumber) {
//   const quantity = document.getElementById('quantity' + productNumber).value;
//   let price = document.querySelector(".price").value;
//   let totalPrice = price * quantity;

//   if(quantity != 0){
//     cartCount += parseInt(quantity);
//     document.getElementById('cart-icon').innerText = cartCount;
  
//     const productInfo = 'Product ' + productNumber + ' (Quantity: ' + quantity + ')';
//     cartItems.push(productInfo);
  
//     // console.log(event.target.tagName);
//     alert(productInfo + ' added to cart!' + totalPrice);
//   }
//  else{
//   alert("Quantity of the product is invalid");
//  }
// }

// testing
var slider = carousel.querySelectorAll(".slide");

slider.forEach(slide => {

  slide.addEventListener("click", (event) => {
    if(event.target.tagName === "BUTTON"){
  
      var product = event.target.closest("div");
      var productName = product.querySelector(".product-name").innerText;
  
      var price = product.querySelector("select").value;
      var quantity = product.querySelector(".quantity-input").value;
  
      var totalPrice = 0;
  
      totalPrice = price * quantity;
  
      if(quantity != 0){
      cartCount += parseInt(quantity);
      document.getElementById('cart-icon').innerText = cartCount;
    
      const productInfo = `(${quantity}) ${productName} for \u20B1${totalPrice.toFixed(2)}`;
      cartItems.push(productInfo);
    
      // console.log(event.target.tagName);
      alert(productInfo + ' added to cart!');
      }
      else{
      alert("Quantity of the product is invalid");
      }
  
    }
  });
})


function openCartModal() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cartItems.forEach((item, index) => {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('cart-item');

      const itemInfo = document.createElement('p');
      itemInfo.innerHTML = item;
      cartItemDiv.appendChild(itemInfo);

      const removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-btn');
      removeBtn.innerText = 'Remove';
      removeBtn.onclick = function() {
        removeFromCart(index);
      };
      cartItemDiv.appendChild(removeBtn);

      cartItemsContainer.appendChild(cartItemDiv);
    });
  }

  document.getElementById('cart-modal').style.display = 'flex';
}

function closeCartModal() {
  document.getElementById('cart-modal').style.display = 'none';
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartCount = 0;
  cartItems.forEach(item => {
    const quantityMatch = item.match(/\(Quantity: (\d+)\)/);
    if (quantityMatch) {
      cartCount += parseInt(quantityMatch[1]);
    }
  });

  document.getElementById('cart-icon').innerText = cartCount;
  openCartModal();
}

