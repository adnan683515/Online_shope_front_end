

const LoadCartItems = () => {

    fetch(`http://127.0.0.1:8000/cartItems/?cart_id=${localStorage.getItem('cart_id')}`)
        .then((res) => res.json())
        .then((data) => displaycartitems(data))
}
LoadCartItems()

const displaycartitems = (data) => {


    data.forEach(element => {
      

        const parent = document.getElementById('cart_items_main')

        const div = document.createElement('div')

        div.classList.add('row')

        div.innerHTML = `
                    <div class="card-box_my-cart col-lg-7 col-md-5 col-sm-12">

                    <div class="d-flex gap-3 align-items-center m-2">

                        <img class="card_logo_img" src="http://127.0.0.1:8000/${element.product.display_image}" alt="">

                        <div class="text-title-card">


                            <div class="d-flex gap-5">
                

                                <p>${element.product.product_title}</p>
                            
                                <p>${element.product.fixed_price} $</p>

                            </div>
                            <p>Quantity: ${element.quantity} </p>
                            
                            
                    
                            <i onclick="Negative_icon_cart('${element.id}')" class="fa-solid fa-minus icon" id="${element.id}+"></i>
                            <input class="add-cart-product-quantity val_qu" type="text" name="val${element.id}" id="${element.id}"
                                value='1'>
                            <i onclick="positve_Icon_cart('${element.id}')" class="fa-solid fa-plus icon" id="${element.id}-"></i>

                            <button onclick="updatecart_items('${element.id}','${element.product.id}','${element.cart}')" class="button-3" role="button">update</button>
                            <a onclick="DeleteCart_items('${element.id}')" class="button-120 text-decoration-none text-dark" role="button">Delete</a>
                        </div>

                    </div>
                </div>
                <div class="subtotal col-lg-4 col-md-5 col-sm-12 p-4">

                    <h5>SUBTOTAL</h5>
                    <p>Total Price: ${element.price} $</p>
                    <a href="checkout.html?item_id=${element.id}" class="button-37 text-decoration-none text-center">check out</a>

                </div>

                <div class="m-3">
                </div>
            
        
        `
        parent.appendChild(div)
    });
}

const positve_Icon_cart = (id) => {



    document.getElementById(`${id}`).value = `${parseInt(document.getElementById(`${id}`).value) + 1}`

}

const Negative_icon_cart = (id) => {


    if (document.getElementById(`${id}`).value != '1') {
        document.getElementById(`${id}`).value = `${parseInt(document.getElementById(`${id}`).value) - 1}`


    }

}


const DeleteCart_items = (id) => {
    document.getElementById('del_msg').innerHTML = ""

    fetch(`http://127.0.0.1:8000/updatecart/${id}/`, {
        method: "DELETE"
    })
        .then((res) => {
            res.json(),

                document.getElementById('del_msg').innerHTML = `<p class="text-center delete_msg" id="del_msg_cart">Cart Items Deleted</p>`
        })
}


const updatecart_items=(id,product_id,cart_id)=>{




    update_obj = {
        id : parseInt(id),
        product:  parseInt(product_id),
        quantity: parseInt(document.getElementById(id).value),
        cart: parseInt(cart_id)
    }



    fetch(`http://127.0.0.1:8000/updatecart/${id}/`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json' // Set the request content type to JSON
        },
        body:JSON.stringify(update_obj)
    })
    .then((res) => {
        if(res.ok){
            res.json()
         
        }
    })
}


const recentViewProduct=()=>{


    const token = localStorage.getItem('Token')

    fetch('http://127.0.0.1:8000/viewproduct/',{
        method:"GET",
        headers: {
            'Authorization': `Token ${token}`,  // Send token in the Authorization header
            'Content-Type': 'application/json'   // Optional: specify content type
        }
        
    })
    .then((res)=> res.json())
    .then((data) => DisplayRecentViewproduct(data))
}

recentViewProduct()


const DisplayRecentViewproduct=(data)=>{


    data.forEach(element=>{

   

        const parent = document.getElementById('recomendation_box')
        const div = document.createElement('div')
        div.classList.add('item')

        div.innerHTML = `
            <div class="recnet_card" style="width: 16rem;">
                        <img src="http://127.0.0.1:8000/${element.Product.display_image}" class="card-img-top recent_vieew_img" alt="...">
                        <div class="card-body">
                            <p class="card-text">
                            <div class="d-flex justify-content-between">
                                    <p>Price:${element.Product.fixed_price}$</p>
                                    <p>Quantity:${element.Product.quantity}</p>
                            </div>
                            <div class="d-flex justify-content-between">
                                    <p>Product Type:${element.Product.type_your_product}</p>
                            </div>
                            </p>
                            <div class="d-flex justify-content-between">
                                <button onclick="delteItemRecentViewProduct('${element.id}')" class="button-r">Remove</button>
                                <a href="SareeDetails.html?product_id=${element.Product.id}&type_product=${element.Product.type_your_product}&sports_type=${element.Product.sports_Type}" class="button-2 text-decoration-none ">More</a>


                            </div>

                        </div>
                    </div>
        
        
        `
        parent.appendChild(div)

    })
}

const delteItemRecentViewProduct=(id)=>{
    

    fetch(`http://127.0.0.1:8000/viewDelete/${id}/`,{
        method:"DELETE"
    })
    .then((res) =>{
        document.getElementById('del_recent_item').innerHTML="Delete Item",
        res.json()
    })
    document.getElementById('del_recent_item').innerHTML=""
}