let productsData=[];
let count=0;

// Fetch and display products
async function getProducts() {
    let response = await fetch("https://66d97b474ad2f6b8ed54d725.mockapi.io/mockapi");
    let data = await response.json();
    productsData=data;
    
    let productLists = document.getElementById("product_lists");

    data.map((product) => {
        let productItem = document.createElement("div");
        productItem.classList.add("product_item");
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.product}" />
            <p>${product.product}</p>
            <p> Rs : ${product.price}</p>
            <button onClick='addToCart(${product.id})'>Add To cart</button>
            
        `;

        productLists.appendChild(productItem);
    });
}

getProducts();

async function addToCart(cartProductId){

     let cartProduct= productsData.find((product)=>product.id==cartProductId);

   let response=  await fetch("https://66d97b474ad2f6b8ed54d725.mockapi.io/addtocart",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(cartProduct)
   })

  let data= await response.json();
  

   
listingCartProduct();
     

}

async function listingCartProduct(){

    let response= await fetch("https://66d97b474ad2f6b8ed54d725.mockapi.io/addtocart");
    let data= await response.json();
     let total=0;
       count =data.length;
       document.getElementById("count").innerHTML=count;

    let cartList= document.getElementById("cart_lists");
    cartList.innerHTML=""

     data.map((cart)=>{
        let cartItem=document.createElement("div");
        cartItem.classList.add("cart_item");
        cartItem.innerHTML=`
        <img src=${cart.image} alt=${cart.product}/>
        <p>${cart.product}</p>
        <p> Rs : ${cart.price}</p>
        <button onClick='deleteProduct(${cart.id})'>Delete</button>
        
        `
        cartList.appendChild(cartItem);

        total=total+cart.price;

     })

    let  line = document.createElement('hr');
    cartList.appendChild(line);
    let displayTotal=document.createElement("div");
    displayTotal.innerHTML=`   Total = ${total}`;
    cartList.appendChild(displayTotal);
}

listingCartProduct();

async function deleteProduct(id){

   let response= await fetch(`https://66d97b474ad2f6b8ed54d725.mockapi.io/addtocart/${id}`,{
    method:"DELETE",
    headers:{
        "Content-Type":"application/json"
    }
    
   });
  let data= await response.json();
  listingCartProduct();

}

