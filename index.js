const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "vegetable"
    }
  ],
  cart: []
};

const storeList = document.querySelector(".store--item-list");
const cartList = document.querySelector(".cart--item-list")

function render() {
  clear()
  renderStore()
  renderCart()
  renderTotal()
}

function clear() {
  storeList.innerHTML = ''
  cartList.innerHTML = ''
}

function renderStore() {

  // Loop through the items array
  for(const item of state.items) {

    // Create the li element that will hold the item and contents
    const storeItem = document.createElement("li")
    // Create the div that will hold the image and
    const storeDiv = document.createElement("div")
    // Style the div with the provided tag
    storeDiv.setAttribute('class', 'store--item-icon')
    // Create the image
    const storeImg = document.createElement("img")
     // Set the source of the image 
    storeImg.setAttribute('src' , `assets/icons/${item.id}.svg`)
    // Create the button to add to cart
    const storeButton = document.createElement("button")
     // Set the button inner text
    storeButton.innerText = 'ADD TO CART'  
    // Add eventlistener to button to add items into the cart array
    storeButton.addEventListener('click', function() {
      // Create a function that pushes clicked items into the cart array
           const alreadyInCart = state.cart.find(i => i.item === item)
           if(alreadyInCart !== undefined) {
             alreadyInCart.quantity++
           }
           else {
             state.cart.push({ 
               quantity: 1,
               item: item
             })
           }
           console.log("Items in cart" , state.cart)
           render()
        })
        // Append the itmes to their various parents in the right order

        // Get a ref for the fruit filter button
        const fruitFilter = document.querySelector(".show-me-fruit")
        //Add eventlistener for the fruit filter button
        fruitFilter.addEventListener("click", function() {
          state.items = state.items.filter(item => item.type === "fruit")
          console.log("Clicking fruit button")
          render()
          return
        })
        // Get a ref for the veg filter button
        const vegFilter = document.querySelector(".show-me-veg")
        //Add eventlistener for the fruit filter button
        vegFilter.addEventListener("click", function() {
          state.items = state.items.filter(item => item.type === "vegetable")
          render()
          return
        })
    
        // Get a ref for the show me everything filter button
        const noFilter = document.querySelector(".show-me-it-all")
        //Add eventlistener for the everything filter button
        noFilter.addEventListener("click", function() {
          state.items = state.items
          render()
        })

    storeList.append(storeItem)
    storeItem.append(storeDiv, storeButton)
    storeDiv.append(storeImg)
    
  }
}

function renderCart() {
  //Loop through the cart array
for (const cartContents of state.cart) {
  //Create a list item to hold the parts that make up each item in the basket
  const cartItem = document.createElement("li")
  //Create the image element that will go in the basket item & add image path
  const basketImg = document.createElement("img")
  basketImg.src = `assets/icons/${cartContents.item.id}.svg`
  //Add the p element for the item name
  const basketItemName = document.createElement("p")
  basketItemName.textContent = cartContents.item.name

  //Add the amount counter span element 
  const counterSpan = document.createElement("span")
  counterSpan.className = ".quantity-text"
  counterSpan.innerText = cartContents.quantity

  console.log("counterSpan check", cartContents.quantity)

  //Create the remove item button, inner button text and style
  const removeButton = document.createElement("button")
  removeButton.innerText = "-"
  removeButton.className = ".quantity-btn .remove-btn .center"
  removeButton.addEventListener("click", function() {
  cartContents.quantity--
  if (cartContents.quantity === 0) {
    const cartContentsIndex = state.cart.findIndex(i => i === cartContents)
    state.cart.splice(cartContentsIndex, 1)
  }
  render()
  })

  //Add the increase quantity button, inner button text and style
  const addButton = document.createElement("button")
  addButton.innerText = "+"
  addButton.className = ".add-btn"
  addButton.addEventListener("click", function() {
    cartContents.quantity++
    render()
  })

  console.log("Check counter function", cartContents.quantity)
  //Append everything to the DOM
  cartList.append(cartItem)
  cartItem.append(basketImg, basketItemName, removeButton, counterSpan, addButton)

  }
}

function renderTotal() {
  //Loop through the cart contents
  const totalPrice = document.querySelector(".total-number")
  let total = 0
  for (const price of state.cart) {
    if(price) {
      total += price.item.price * price.quantity
    }
    else {
      totalPrice
    }   
  }
  totalPrice.innerText = `£ ${total.toFixed(2)}`
}







render()




