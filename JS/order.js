


const order_for_cart = () => {



    const item_id = new URLSearchParams(window.location.search).get('item_id')

    fetch(`https://online-shope-backend.vercel.app/updatecart/${item_id}/`)
        .then((res) => res.json())
        .then((data) => {



            fetch(`https://online-shope-backend.vercel.app/user/${localStorage.getItem('user_id')}/`)
                .then((res) => res.json())
                .then((user_data) => {


                    const div = document.getElementById('card_order_detalis')



                    div.innerHTML = `
        
                        <h4 class="text-center">Order Details
                            <hr class="text-center w-50 m-auto">
                        </h4>
                        <div class="d-flex justify-content-around">
                            <h5>Name: ${user_data.first_name} ${user_data.last_name}</h5>
                            <a onclick="SSLpayment()" class="button_pay text-decoration-none" type="button">payment</a>

                        </div>
                        <h6>Gmail: ${user_data.email}</h6>
                        <p>Total Price: ${data.price}$</p>
                        <p>Quantity: ${data.quantity}</p>
                        
                        
                    `

                    const second_div = document.getElementById('items')

                    let imageurl = data.product.display_image

                    if (imageurl.includes("image/upload/https://")) {
                        imageurl = imageurl.replace("image/upload/", "");
                    }

                    // Ensure the image URL is properly formatted
                    if (!imageurl.startsWith("https://")) {
                        imageurl = `https://res.cloudinary.com/dtyxxpqdl/image/upload/${imageurl}`;
                    }

                    second_div.innerHTML = `
                    
                        <div  class="d-flex mt-5 items_box_roder">

                            <div>
                            <img class="img_items m-1" src="${imageurl}" alt="">
                            
                            </div>
                            
                            <div class="text_items">
                                <p>Title: ${data.product.product_title}</p>
                                <p>price: ${data.product.fixed_price} $</p>
                            </div>
                        </div>

                    
                    `
                })





        })
}

order_for_cart()


const orderForm = (event) => {

    event.preventDefault()

    const item_id = new URLSearchParams(window.location.search).get('item_id')
    fetch(`https://online-shope-backend.vercel.app/updatecart/${item_id}/`)
        .then((res) => res.json())
        .then((data) => {


            const form = document.getElementById('order_form')

            const FORM_DATA = new FormData(form)




            create_order_obj = {

                status: "pending",
                total_price: data.price,
                zila: FORM_DATA.get('zila'),
                upzila: FORM_DATA.get('Upzila'),
                shipping_address: FORM_DATA.get('address'),
                quantity: parseInt(data.quantity),
                phone: FORM_DATA.get('phne_number'),
                user: parseInt(localStorage.getItem('user_id')),
                product: parseInt(data.product.id),
                tranjection_id: FORM_DATA.get('tranjection')
            }




            const token = localStorage.getItem('Token')

            document.getElementById('Zila').value = ""
            document.getElementById('Upzila').value = ""
            document.getElementById('phne_number').value = ""
            document.getElementById('floatingTextarea2').value = ""
            document.getElementById('tranjection').value = ""


            fetch('https://online-shope-backend.vercel.app/order/', {
                method: "POST",
                headers: {
                    // 'Authorization': `Token ${token}`,
                    "Content-Type": "application/json"  // Optional, depending on your API
                },
                body: JSON.stringify(create_order_obj)
            })
                .then((response) => {


                    if (response.ok == true) {

                        response.json()

                    }


                })



        })



}


const SSLpayment = () => {
    id = new URLSearchParams(window.location.search).get('item_id')
    console.log("onclik kaj kore")
    token = localStorage.getItem('Token')

    fetch(`https://online-shope-backend.vercel.app/sslcomarce/?oder_id=${id}`, {
        method: "POST",
        headers: {
            'Authorization': `Token ${token}`,  // Send token in the Authorization header
            'Content-Type': 'application/json'   // Optional: specify content type
        }
    })
        .then((res) => {
            res.json();
            console.log("res",res)
        })
        .then(result => {
            console.log("Request", result)

            if (result) {
                console.log("success", result)
                window.location.href = result.payment_url;
            }
        })
        .catch(error => {
            console.error("Error initiating payment:", error);
            alert("Something went wrong. Please check your connection.");
        });
}