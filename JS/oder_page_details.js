
const DisplayOderDetails = (id) => {

    const token = localStorage.getItem('Token')

    fetch(`http://127.0.0.1:8000/oderlist/?oderitem_id=${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'  // Optional, depending on your API
        }
    })
        .then((res) => res.json())
        .then((data) => {

            let button_class_status = ''

            if (data.status === 'Pending') {
                button_class_status = 'pending_status'
            }
            else if (data.status === 'Shipped') {
                button_class_status = 'shiped_status'
            }
            else if (data.status === 'Canceled') {
                button_class_status = 'cenceled_status'
            }
            else if (data.status === 'Delivered'
            ) {
                button_class_status = 'suc_status'
            }


            const div = document.getElementById('order_page')


            let imageurl = data.product.display_image
            let img_2 = data.product.font_image

            if (imageurl.includes("image/upload/https://") || img_2.includes("image/upload/https://") ) {
                imageurl = imageurl.replace("image/upload/", "");
                img_2 = imageurl.replace("image/upload/", "");
            }

            // Ensure the image URL is properly formatted
            if (!imageurl.startsWith("https://") || !img_2.startsWith("https://")) {
                imageurl = `https://res.cloudinary.com/dtyxxpqdl/image/upload/${imageurl}`;
                img_2 = `https://res.cloudinary.com/dtyxxpqdl/image/upload/${img_2}`;
            }

            div.innerHTML = `
            
                
                <h4 class="text-center">Order Details Page</h4>
                <hr class="w-75 m-auto mb-4">

                <div class="row w-75 m-auto">
                    <div class="card col-lg-4 col-md-4 col-sm-12 m-1" style="width: 18rem;">
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><h5 class="text-center product_tiel">Product Info </h5></li>
                            <li class="list-group-item">Title: ${data.product.product_title}</li>
                            <li class="list-group-item">Price: ${data.product.fixed_price}$</li>
                            <li class="list-group-item">A third item</li>
                            <li class="list-group-item">A third item</li>
                            
                        </ul>
                    </div>

                    <div class="card col-lg-4 col-md-4 col-sm-12 m-1" style="width: 18rem;">
                    
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><h5 class="text-center user_info">UserInfo</h5></li>
                            <li class="list-group-item">Username: ${data.user.username}</li>
                            <li class="list-group-item">First Name: ${data.user.first_name}</li>
                            <li class="list-group-item">Last Name: ${data.user.last_name}</li>
                            <li class="list-group-item">Email: ${data.user.email}</li>
                        </ul>
                    </div>


                    <div class="card col-lg-4 col-md-4 col-sm-12 m-1" style="width: 18rem;">
                    <h5 class="text-center oder_details_info">Information</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Phone:${data.phone}</li>
                            <li class="list-group-item">Upzlia:${data.upzila}</li>
                            <li class="list-group-item">Zila: ${data.zila}</li>
                            <li class="list-group-item "><p class="${button_class_status}">Status: ${data.status}</p></li>
                            <li class="list-group-item">Quantity: ${data.quantity}</li>
                            <li class="list-group-item">Total Price: ${data.total_price} $</li>
                            <li class="list-group-item">Tranjection Id: ${data.tranjection_id} </li>
                        </ul>
                    </div>



                </div>
                <div class="card w-75 m-auto mt-2 mb-2">
                <div class="card-header text_ship_title">
                    Shiping Address
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                    <p>${data.shipping_address}</p>
                    </blockquote>
                </div>
                </div>
                
                <div class="row">

                <img src="${imageurl}" class="col-lg-4 col-md-4 col-sm-12 m-1 rounded mx-auto d-block order_img_detils" alt="...">

                <img src="${img_2}" class="col-lg-4 col-md-4 col-sm-12 m-1 rounded mx-auto d-block order_img_detils" alt="...">


                </div>

    

                <div class="card">
                <div class="card-header product_descripton">
                    Product Description 
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                    <p>${data.product.description}</p>
                    </blockquote>
                </div>
                </div>
     
            </div>

            `

        })
}
const get_params = () => {


    const param = new URLSearchParams(window.location.search).get('oder_id')

    DisplayOderDetails(param)
}

get_params()


