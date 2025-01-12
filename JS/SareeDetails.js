





const onclick_Add_to_cart = () => {

    const cart = localStorage.getItem('cart_id')


    const quantity_value = document.getElementById('input_value_quntity')


    const id = new URLSearchParams(window.location.search).get('product_id')

    const obj =
    {
        cart: cart,
        quantity: quantity_value.value,
        product: id
    }



    fetch('http://127.0.0.1:8000/cartItems/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())

}





const commentProduct = (event) => {
    const id = new URLSearchParams(window.location.search).get('product_id')
    event.preventDefault();
    const text = document.getElementById('floatingTextarea')
    const selectElement = document.getElementById("cars");
    const selectedValue = selectElement.value;
    const user_id = localStorage.getItem('user_id')

    const CmtObj = {
        text: text.value,
        rating: selectedValue,
        Product: id,
        user: user_id
    }

    document.getElementById('floatingTextarea').value = ""
    document.getElementById("cars").value = "🧡"

    fetch(`http://127.0.0.1:8000/review_for_product/?product_id=${id}`, {
        method: "POST",
        headers: { "Content-type": 'application/json' },
        body: JSON.stringify(CmtObj)

    })
        .then((res) => res.json())
        .then((data) => console.log(data))

}





const Load_review_saree = () => {

    const id = new URLSearchParams(window.location.search).get('product_id')

    fetch(`http://127.0.0.1:8000/reviewForget/?product_id=${id}`)
        .then((res => res.json()))
        .then((data) => SingleReView_saree(data))
}







const positve_Icon = () => {


    document.getElementById('input_value_quntity').value = parseInt(document.getElementById('input_value_quntity').value) + 1


}

const Negative_icon = () => {

    if (document.getElementById('input_value_quntity').value != '1') {
        document.getElementById('input_value_quntity').value = parseInt(document.getElementById('input_value_quntity').value) - 1

    }
}




const Load_review = () => {

    const id = new URLSearchParams(window.location.search).get('product_id')

    fetch(`http://127.0.0.1:8000/reviewForget/?product_id=${id}`)
        .then((res => res.json()))
        .then((data) => SingleReView(data))
}

Load_review()


const SingleReView = (data) => {

    data.forEach(element => {
        const dte = element.review_date
        const date = new Date(dte);
        const parent = document.getElementById('all-comment-box-container')
        const div = document.createElement('div')
        div.classList.add('w-100')
        div.classList.add('m-2')
        div.classList.add('comment-display')
        div.innerHTML = `
                        <div class="d-flex justify-content-between">
                            <div class="name">
                            <p  class="text-dark">${element.user}</p>
                            </div>
                            
                            <p>${date.getHours()} hours ago</p>
                            
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between">
                        <p>${element.rating}</p>
                            <p id="del_icon_cmt"></p>
                        </div>
                        <p>${element.text}</p>
        
        `
        parent.appendChild(div)

        const token = localStorage.getItem('Token')
        if (token){
            document.getElementById('del_icon_cmt').innerHTML = `<i class="fa-solid fa-trash"></i>`
        }



    });

}







const total_tk = () => {



    fetch(`http://127.0.0.1:8000/cart_items/?cart_id=${localStorage.getItem('cart_id')}`)
        .then((res) => res.json())
        .then((data) => {

            tk_upate(data)

        })



}
total_tk()


const tk_upate = (data) => {


    let sum = 0
    data.forEach(element => {

        sum = sum + (parseInt(element.product) * parseInt(element.quantity))

    })



    const obj =
    {
        id: localStorage.getItem('cart_id'),
        total_price: sum,
        user: localStorage.getItem('user_id')
    }


    fetch(`http://127.0.0.1:8000/update_cart/${localStorage.getItem('cart_id')}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())

}





const positve_Icon_shirt = () => {


    document.getElementById('input_value_quntity').value = parseInt(document.getElementById('input_value_quntity').value) + 1


}

const Negative_icon_shirt = () => {

    if (document.getElementById('input_value_quntity').value != '1') {
        document.getElementById('input_value_quntity').value = parseInt(document.getElementById('input_value_quntity').value) - 1

    }
}




const JURSIDTAIls = (id) => {


    const token = localStorage.getItem('Token')
    document.getElementById('saree-details-section').innerHTML = ""


    fetch(`http://127.0.0.1:8000/SportsDetails/${id}/`, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'  // Optional, depending on your API
        }
    })
        .then((res) => res.json())
        .then((data) => {



            document.getElementById('saree-details-section').innerHTML = `
        
        
        
            <div class="col-lg-6 col-md-8 col-sm-11">
                    <img src="http://127.0.0.1:8000/${data.display_image}" class="display_image_for_details img-fluid" alt="">

                    <div class="w-50 mt-4">
                        <div id="carouselExample" class="carousel slide">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="http://127.0.0.1:8000/${data.display_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item"> 
                                    <img src="http://127.0.0.1:8000/${data.font_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="http://127.0.0.1:8000/${data.back_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="prev">
                                
                                <i class="fa-solid fa-backward fa-xl" style="color: #0fe63a;"></i>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="next">
                                <i class="fa-solid fa-forward fa-2xl" style="color: #050505;"></i>
                            </button>
                        </div>


                    </div>
                </div>

                <div class="col-lg-4 col-md-12 col-sm-11 m-2 football_details_card">
                    <h3>Product Title: ${data.product_title}
                    </h3>
                    <div class="d-flex gap-3">
                    <p>Team: ${data.team} </P>
                    <p>version: ${data.version}</p>
                    </div>

                    <div class="d-flex gap-3">
                        <p>Available: ${data.abailable}</p>
                        <p>Made In: ${data.country}</p>
                        
                    </div>

                    <div class="d-flex gap-5">
                        <p>Price: ${data.fixed_price} $</p>
                        <p><i class="fa-solid fa-eye"></i> +${data.eyes}views </p>
                    </div>
                

                    <div class="d-flex gap-4 align-items-center ">

                        <p> Quantity: </p>
                        <div class="d-flex gap-2 align-items-center">
                        
                        <i onclick='Negative_icon_shirt()' class="fa-solid fa-minus icon"></i>

                        <input class="add-cart-product-quantity" type="text" name="" id="input_value_quntity" value="1">
                        <i onclick="positve_Icon()" class="fa-solid fa-plus icon"></i>

                    </div>
                    </div>
                    <button  onclick="onclick_Add_to_cart()" class="button-7"> Add to Cart </button>
                        <a class="button-37 text-decoration-none" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">More Details</a>

                
                    <div class="row">
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                        <div class="card card-body">
                            <h3 class="des">Description: ${data.description} </h3>
                        </div>
                    </div>
                    </div>

                    </div>
        </div>
        
        
        
        `
        }





        )




    total_tk_saree()
    Load_review_saree()

}

const FootballDetails = (id) => {



    console.log("Football Details",id)

    const token = localStorage.getItem('Token')
    document.getElementById('saree-details-section').innerHTML = ""

    fetch(`http://127.0.0.1:8000/SportsDetails/${id}/`, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'  // Optional, depending on your API
        }
    })
        .then((res) => res.json())
        .then((data) => {

            document.getElementById('saree-details-section').innerHTML = `
        
        
        
            <div class="col-lg-6 col-md-8 col-sm-11">
                    <img src="http://127.0.0.1:8000/${data.display_image}" class="display_image_for_details img-fluid" alt="">

                    <div class="w-50 mt-4">
                        <div id="carouselExample" class="carousel slide">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="http://127.0.0.1:8000/${data.display_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item"> 
                                    <img src="http://127.0.0.1:8000/${data.font_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="http://127.0.0.1:8000/${data.back_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="prev">
                                
                                <i class="fa-solid fa-backward fa-xl" style="color: #0fe63a;"></i>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="next">
                                <i class="fa-solid fa-forward fa-2xl" style="color: #050505;"></i>
                            </button>
                        </div>


                    </div>
                </div>

                <div class="col-lg-4 col-md-12 col-sm-11 m-2 football_details_card">
                    <h3>Product Title: ${data.product_title}
                    </h3>
                    <div class="d-flex gap-3">
                    <p>Brand:${data.Brand.name}</p>
                    <p>cetagory: ${data.cetagory.name}</p>
                    </div>

                    <div class="d-flex gap-3">
                        <p>Available: ${data.abailable}</p>
                        <p>Size: ${data.size_of_shirt}</p>
                    </div>

                    <div class="d-flex gap-5">
                        <p>Price: ${data.fixed_price} $</p>
                        <p><i class="fa-solid fa-eye"></i> +${data.eyes}views </p>
                    </div>
                    <div class="d-flex gap-4 align-items-center ">
                        <p> Quantity: </p>
                        <div class="d-flex gap-2 align-items-center">
                        <i onclick='Negative_icon_shirt()' class="fa-solid fa-minus icon"></i>

                        <input class="add-cart-product-quantity" type="text" name="" id="input_value_quntity" value="1">
                        <i onclick="positve_Icon_shirt()" class="fa-solid fa-plus icon"></i>

                    </div>
                    </div>
                    <button  onclick="onclick_Add_to_cart()" class="button-7"> Add to Cart </button>
                    <a class="button-37 text-decoration-none" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">More Details</a>

                
                    <div class="row">
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                        <div class="card card-body">
                            <h3 class="des">Description: ${data.description} </h3>
                        </div>
                    </div>
                    </div>

                    </div>

                
                </div>
            

    

            
        
        
        `

        })
}


const jacketDetails = (id) => {

    const token = localStorage.getItem('Token')
    document.getElementById('saree-details-section').innerHTML = ""

    fetch(`http://127.0.0.1:8000/jackdetails/${id}/`, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'  // Optional, depending on your API
        }
    })
        .then((res) => res.json())
        .then((data) => {

            document.getElementById('saree-details-section').innerHTML = `
        
        
        
            <div class="col-lg-6 col-md-8 col-sm-11">
                    <img src="http://127.0.0.1:8000/${data.display_image}" class="display_image_for_details img-fluid" alt="">

                    <div class="w-50 mt-4">
                        <div id="carouselExample" class="carousel slide">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="http://127.0.0.1:8000/${data.display_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item"> 
                                    <img src="http://127.0.0.1:8000/${data.font_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="http://127.0.0.1:8000/${data.back_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="prev">
                                
                                <i class="fa-solid fa-backward fa-xl" style="color: #0fe63a;"></i>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="next">
                                <i class="fa-solid fa-forward fa-2xl" style="color: #050505;"></i>
                            </button>
                        </div>


                    </div>
                </div>

                <div class="col-lg-4 col-md-12 col-sm-11 m-2 football_details_card">
                    <h3>Product Title: ${data.product_title}
                    </h3>
                    <div class="d-flex gap-3">
                    <p>Brand:${data.Brand.name}</p>
                    <p>cetagory: ${data.cetagory.name}</p>
                    </div>

                    <div class="d-flex gap-3">
                        <p>Available: ${data.abailable}</p>
                        <p>Size: ${data.size_of_shirt}</p>
                    </div>

                    <div class="d-flex gap-5">
                        <p>Price: ${data.fixed_price} $</p>
                        <p><i class="fa-solid fa-eye"></i> +${data.eyes}views </p>
                    </div>
                    

                    <div class="d-flex gap-4 align-items-center ">

                        <p> Quantity: </p>
                        <div class="d-flex gap-2 align-items-center">
                        
                        <i onclick='Negative_icon_shirt()' class="fa-solid fa-minus icon"></i>

                        <input class="add-cart-product-quantity" type="text" name="" id="input_value_quntity" value="1">
                        <i onclick="positve_Icon_shirt()" class="fa-solid fa-plus icon"></i>

                    </div>
                    </div>
                    <button  onclick="onclick_Add_to_cart()" class="button-7"> Add to Cart </button>
                    <a class="button-37 text-decoration-none" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">More Details</a>

                
                    <div class="row">
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                        <div class="card card-body">
                            <h3 class="des">Description: ${data.description} </h3>
                        </div>
                    </div>
                    </div>

                    </div>
                </div>

            
        
        
        `

        })
}


const recomendationJackets = (id) => {

    fetch(`http://127.0.0.1:8000/jackets/?product_id=${id}`)
        .then((res) => res.json())
        .then((data) => {
            DisplayRecomendationJackets(data)
        })
}



const DisplayRecomendationJackets = (data) => {

    document.getElementById('recomendation_box').innerHTML = ""

    data.forEach(element => {

        const parent = document.getElementById('recomendation_box')

        const div = document.createElement('div')
        div.classList.add('item')

        div.innerHTML = `

            <a class="text-decoration-none text-dark" href="SareeDetails.html?product_id=${element.id}&type_product=${element.type_your_product}&sports_type=${element.sports_Type}">
                    <div class="card box_football" style="width: 17rem;">
                    

                        <img src="http://127.0.0.1:8000/${element.display_image}" class="card-img-top image_of_recom_jack mt-2" alt="...">
                        <div class="card-body">

                            <p class="card-text">${element.description.slice(0, 20)}...</p>
                            <p class="card-text">price:${element.fixed_price}$</p>
                            <p class="card-text">Cetagory:${element.football_cetagory}</p>
                            
                        </div>
                    
                    </div>
                </a>
        
        `
        parent.appendChild(div)
    })
}

const shirtDetails = (id) => {


    const token = localStorage.getItem('Token')
    document.getElementById('saree-details-section').innerHTML = ""



    fetch(`http://127.0.0.1:8000/shirtDetails/${id}/`, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'  // Optional, depending on your API
        }
    })
        .then((res) => res.json())
        .then((data) => {



            document.getElementById('saree-details-section').innerHTML = `
        
        
        
            <div class="col-lg-3 col-md-8 col-sm-11">
                    <img src="http://127.0.0.1:8000/${data.display_image}" class="display_image_for_details img-fluid" alt="">

                   <div class="w-50 mt-4">
                        <div id="carouselExample" class="carousel slide">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="http://127.0.0.1:8000/${data.display_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item"> 
                                    <img src="http://127.0.0.1:8000/${data.font_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="http://127.0.0.1:8000/${data.back_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="prev">
                                
                                <i class="fa-solid fa-backward fa-xl" style="color: #0fe63a;"></i>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="next">
                                <i class="fa-solid fa-forward fa-2xl" style="color: #050505;"></i>
                            </button>
                        </div>


                    </div>
                </div>

                <div class="col-lg-4 col-md-12 col-sm-11 m-2 football_details_card">
                    <h3>Product Title: ${data.product_title}
                    </h3>
                    <div class="d-flex gap-3">
                    <p>Brand:${data.Brand.name}</p>
                    <p>cetagory: ${data.shirt_cetagory}</p>
                    </div>

                    <div class="d-flex gap-3">
                        <p>Available: ${data.abailable}</p>
                        <p>Size: ${data.size_of_shirt}</p>
                    </div>

                    <div class="d-flex gap-5">
                        <p>Price: ${data.fixed_price} $</p>
                        <p><i class="fa-solid fa-eye"></i> +${data.eyes}views </p>
                    </div>
                    

                    <div class="d-flex gap-4 align-items-center ">

                        <p> Quantity: </p>
                        <div class="d-flex gap-2 align-items-center">
                        
                        <i onclick='Negative_icon_shirt()' class="fa-solid fa-minus icon"></i>

                        <input class="add-cart-product-quantity" type="text" name="" id="input_value_quntity" value="1">
                        <i onclick="positve_Icon_shirt()" class="fa-solid fa-plus icon"></i>

                    </div>
                    </div>
                    <button  onclick="onclick_Add_to_cart()" class="button-7"> Add to Cart </button>
                       <a class="button-37 text-decoration-none" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">More Details</a>

                
                    <div class="row">
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                        <div class="card card-body">
                            <h3 class="des">Description: ${data.description} </h3>
                        </div>
                    </div>
                    </div>

                    </div>
                </div>

        
        
        `
        })
}

const CriketDetails = (id) => {


    const token = localStorage.getItem('Token')
    document.getElementById('saree-details-section').innerHTML = ""


    fetch(`http://127.0.0.1:8000/SportsDetails/${id}/`, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'  // Optional, depending on your API
        }
    })
        .then((res) => res.json())
        .then((data) => {



            document.getElementById('saree-details-section').innerHTML = `
        
        
        
            <div class="col-lg-3 col-md-8 col-sm-11">
                    <img src="http://127.0.0.1:8000/${data.display_image}" class="display_image_for_details img-fluid" alt="">

                    <div class="w-50 mt-4">
                        <div id="carouselExample" class="carousel slide">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="http://127.0.0.1:8000/${data.display_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item"> 
                                    <img src="http://127.0.0.1:8000/${data.font_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="http://127.0.0.1:8000/${data.back_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="prev">
                                
                                <i class="fa-solid fa-backward fa-xl" style="color: #0fe63a;"></i>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="next">
                                <i class="fa-solid fa-forward fa-2xl" style="color: #050505;"></i>
                            </button>
                        </div>


                    </div>
                </div>

                <div class="col-lg-8 col-md-12 col-sm-11 m-2">
                    <h3>Product Title: ${data.product_title}
                    </h3>
                    <div class="d-flex gap-3">
                    <p>Brand: ${data.Brand.name} saree</P>
                    <p>version: ${data.version}</p>
                    </div>

                    <div class="d-flex gap-3">
                        <p>Available: ${data.abailable}</p>
                        <p>Main MetariailsBat: ${data.MainMetariailsBat}</p>
                        
                    </div>

                    <div class="d-flex gap-5">
                        <p>Price: ${data.fixed_price} $</p>
                        <p><i class="fa-solid fa-eye"></i> +${data.eyes}views </p>
                        <p>Size: ${data.BatSize}</p>
                    </div>
                    

                    <div class="d-flex gap-4 align-items-center ">

                        <p> Quantity: </p>
                        <div class="d-flex gap-2 align-items-center">
                        
                        <i onclick='positve_Icon_shirt()' class="fa-solid fa-minus icon"></i>

                        <input class="add-cart-product-quantity" type="text" name="" id="input_value_quntity" value="1">
                        <i onclick="positve_Icon_shirt()" class="fa-solid fa-plus icon"></i>

                    </div>
                    </div>
                    <button  onclick="onclick_Add_to_cart()" class="button-7"> Add to Cart </button>
                    <a class="button-37 text-decoration-none" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">More Details</a>

                
                    <div class="row">
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                        <div class="card card-body">
                            <h3 class="des">Description: ${data.description} </h3>
                        </div>
                    </div>
                    </div>

                    </div>
                </div>

        
        
        `
        }





        )




    total_tk_saree()
    Load_review_saree()

}



const SareeDeatails = (id) => {


    const token = localStorage.getItem('Token')
    document.getElementById('saree-details-section').innerHTML = ""


    fetch(`http://127.0.0.1:8000/saree_details/${id}/`, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'  // Optional, depending on your API
        }
    })
        .then((res) => res.json())
        .then((data) => {



            document.getElementById('saree-details-section').innerHTML = `
        
        
        
            <div class="col-lg-6 col-md-8 col-sm-11">
                    <img src="http://127.0.0.1:8000/${data.display_image}" class="display_image_for_details img-fluid" alt="">

                    <div class="w-50 mt-4">
                        <div id="carouselExample" class="carousel slide">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="http://127.0.0.1:8000/${data.display_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item"> 
                                    <img src="http://127.0.0.1:8000/${data.font_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="http://127.0.0.1:8000/${data.back_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="prev">
                                
                                <i class="fa-solid fa-backward fa-xl" style="color: #0fe63a;"></i>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="next">
                                <i class="fa-solid fa-forward fa-2xl" style="color: #050505;"></i>
                            </button>
                        </div>


                    </div>
                </div>

                <div class="col-lg-4 col-md-12 col-sm-11 m-2 football_details_card">
                    <h3>Product Title: ${data.product_title}
                    </h3>
                    <div class="d-flex gap-3">
                    <p>Brand: ${data.Brand.name} saree</P>
                    <p>cetagory: ${data.cetagory.name}</p>
                    </div>

                    <div class="d-flex gap-3">
                        <p>Available: ${data.abailable}</p>
                        
                    </div>

                    <div class="d-flex gap-5">
                        <p>Price: ${data.fixed_price} $</p>
                        <p><i class="fa-solid fa-eye"></i> +${data.eyes}views </p>
                    </div>
                    

                    <div class="d-flex gap-4 align-items-center ">

                        <p> Quantity: </p>
                        <div class="d-flex gap-2 align-items-center">
                        
                        <i onclick='Negative_icon_shirt()' class="fa-solid fa-minus icon"></i>

                        <input class="add-cart-product-quantity" type="text" name="" id="input_value_quntity" value="1">
                        <i onclick="positve_Icon_shirt()" class="fa-solid fa-plus icon"></i>

                    </div>
                    </div>
                    <button  onclick="onclick_Add_to_cart()" class="button-7"> Add to Cart </button>
                       <a class="button-37 text-decoration-none" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">More Details</a>

                
                    <div class="row">
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                        <div class="card card-body">
                            <h3 class="des">Description: ${data.description} </h3>
                        </div>
                    </div>
                    </div>

                    </div>
                </div>

        
        
        `
        }





        )




    total_tk_saree()
    Load_review_saree()

}




const GeansDeatails = (id) => {


    const token = localStorage.getItem('Token')
    document.getElementById('saree-details-section').innerHTML = ""



    fetch(`http://127.0.0.1:8000/geans/${id}/`, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'  // Optional, depending on your API
        }
    })
        .then((res) => res.json())
        .then((data) => {



            document.getElementById('saree-details-section').innerHTML = `
        
            <div class="col-lg-6 col-md-8 col-sm-11">
                    <img src="http://127.0.0.1:8000/${data.display_image}" class="display_image_for_details img-fluid" alt="">
                    <div class="w-50 mt-4">
                        <div id="carouselExample" class="carousel slide">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="http://127.0.0.1:8000/${data.display_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item"> 
                                    <img src="http://127.0.0.1:8000/${data.font_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="http://127.0.0.1:8000/${data.back_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="prev">
                                
                                <i class="fa-solid fa-backward fa-xl" style="color: #0fe63a;"></i>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="next">
                                <i class="fa-solid fa-forward fa-2xl" style="color: #050505;"></i>
                            </button>
                        </div>


                    </div>
                </div>

                <div class="col-lg-4 col-md-12 col-sm-11 m-2 football_details_card">
                    <h3>Product Title: ${data.product_title}
                    </h3>
                    <div class="d-flex gap-3">
                    <p>Brand: ${data.Brand.name} gens</P>
                    <p>cetagory: ${data.cetagory.name}</p>
                    </div>

                    <div class="d-flex gap-3">
                        <p>Available: ${data.abailable}</p>
                        <p>Size: ${data.size_of_geans}</p>
                    </div>

                    <div class="d-flex gap-5">
                        <p>Price: ${data.fixed_price} $</p>
                        <p><i class="fa-solid fa-eye"></i> +${data.eyes}views </p>
                    </div>
                    

                    <div class="d-flex gap-4 align-items-center ">

                        <p> Quantity: </p>
                        <div class="d-flex gap-2 align-items-center">
                        
                        <i onclick='Negative_icon()' class="fa-solid fa-minus icon"></i>

                        <input class="add-cart-product-quantity" type="text" name="" id="input_value_quntity" value="1">
                        <i onclick="positve_Icon()" class="fa-solid fa-plus icon"></i>

                    </div>
                    </div>
                    <button  onclick="onclick_Add_to_cart()" class="button-7"> Add to Cart </button>
                    <a class="button-37 text-decoration-none" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">More Details</a>

                
                    <div class="row">
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                        <div class="card card-body">
                            <h3 class="des">Description: ${data.description} </h3>
                        </div>
                    </div>
                    </div>

                    </div>
                </div>

        
        
        `
        })
}



const WatchDetails = (id) => {


    const token = localStorage.getItem('Token')
    document.getElementById('saree-details-section').innerHTML = ""



    fetch(`http://127.0.0.1:8000/watchDetails/${id}/`, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'  // Optional, depending on your API
        }
    })
        .then((res) => res.json())
        .then((data) => {

            console.log("Watch", data)

            document.getElementById('saree-details-section').innerHTML = `
        
            <div class="col-lg-6 col-md-8 col-sm-11">
                    <img src="http://127.0.0.1:8000/${data.display_image}" class="display_image_for_details img-fluid" alt="">
                    <div class="w-50 mt-4">
                        <div id="carouselExample" class="carousel slide">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="http://127.0.0.1:8000/${data.display_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item"> 
                                    <img src="http://127.0.0.1:8000/${data.font_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="http://127.0.0.1:8000/${data.back_image}" class="d-block details_geans_pic img-fluid" alt="...">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="prev">
                                
                                <i class="fa-solid fa-backward fa-xl" style="color: #0fe63a;"></i>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                                data-bs-slide="next">
                                <i class="fa-solid fa-forward fa-2xl" style="color: #050505;"></i>
                            </button>
                        </div>


                    </div>
                </div>

                <div class="col-lg-4 col-md-12 col-sm-11 m-2 football_details_card">
                    <h3>Product Title: ${data.product_title}
                    </h3>
                    <div class="d-flex gap-3">
                    <p>Brand: ${data.Brand.name} gens</P>
                    <p>cetagory: ${data.cetagory.name}</p>
                    </div>

                    <div class="d-flex gap-3">
                        <p>Movement: ${data.Movement_Watch}</p>
                        <p>Diyal size: ${data.Dial_size_watch}</p>
                        <p>Colour: ${data.colour}</p>
                    </div>

                        <div class="d-flex gap-3">
                        <p>Warenty: ${data.warenty_watch}</p>
                        <p>price : ${data.fixed_price} $</p>
                    </div>

                    <div class="d-flex gap-5">
                        <p>Strap Metarail: ${data.Strap_metarail_watch} </p>
                        <p><i class="fa-solid fa-eye"></i> +${data.eyes}views </p>
                    </div>


                    <div class="d-flex gap-4 align-items-center ">

                        <p> Quantity: </p>
                        <div class="d-flex gap-2 align-items-center">
                        
                        <i onclick='Negative_icon()' class="fa-solid fa-minus icon"></i>

                        <input class="add-cart-product-quantity" type="text" name="" id="input_value_quntity" value="1">
                        <i onclick="positve_Icon()" class="fa-solid fa-plus icon"></i>

                    </div>
                    </div>
                    <button  onclick="onclick_Add_to_cart()" class="button-7"> Add to Cart </button>
                       <a class="button-37 text-decoration-none" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">More Details</a>

                
                    <div class="row">
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                        <div class="card card-body">
                            <h3 class="des">Description: ${data.description} </h3>
                        </div>
                    </div>
                    </div>

                    </div>
                </div>

        
        
        `
        })
}



const LoadAllFootballs = () => {

    fetch('http://127.0.0.1:8000/allfootball/')
        .then((res) => res.json())
        .then((data) => DisplayAllFootball(data))
}


const DisplayAllFootball = (data) => {

    document.getElementById('recomendation_box').innerHTML = ""

    data.forEach(element => {

        const parent = document.getElementById('recomendation_box')

        const div = document.createElement('div')
        div.classList.add('item')

        div.innerHTML = `

            <a class="text-decoration-none text-dark" href="SareeDetails.html?product_id=${element.id}&type_product=${element.type_your_product}&sports_type=${element.sports_Type}">
                    <div class="card box_football" style="width: 17rem;">
                    

                        <img src="http://127.0.0.1:8000/${element.display_image}" class="card-img-top image_of_recomen mt-2" alt="...">
                        <div class="card-body">

                            <p class="card-text">${element.description.slice(0, 20)}...</p>
                            <p class="card-text">price:${element.fixed_price}$</p>
                            <p class="card-text">Cetagory:${element.football_cetagory}</p>
                            
                        </div>
                    
                    </div>
                </a>
        
        `
        parent.appendChild(div)
    })
}


const LoadAlljursey = () => {

    fetch('http://127.0.0.1:8000/alljursery/')
        .then((res) => res.json())
        .then((data) => DisplayAlljursey(data))
}

const DisplayAlljursey = (data) => {



    document.getElementById('recomendation_box').innerHTML = ""

    data.forEach(element => {

        const parent = document.getElementById('recomendation_box')

        const div = document.createElement('div')
        // div.classList.add('item_jursey')

        div.innerHTML = `

            <a class="text-decoration-none text-dark" href="SareeDetails.html?product_id=${element.id}&type_product=${element.type_your_product}&sports_type=${element.sports_Type}">
                    <div class="card box_football" style="width: 15rem; hight:14rem;">
                    

                        <img src="http://127.0.0.1:8000/${element.display_image}" class="card-img-top recomdantion_img_jursey mt-2" alt="...">
                        <div class="card-body">

                            <p class="card-text">${element.description.slice(0, 15)}...</p>
                            <p class="card-text">Team:${element.team}</p>
                            <p class="card-text">Version:${element.version}</p>
                            
                        </div>
                    
                    </div>
                </a>
        
        `
        parent.appendChild(div)
    })
}



const CatchSearchParamsSaree = () => {

    let params = new URLSearchParams(window.location.search).get('product_id')
    let params_type_product = new URLSearchParams(window.location.search).get('type_product')




    if (params_type_product == 'Saree') {
        document.getElementById('saree-details-section').innerHTML = ""
        SareeDeatails(params)
    }
    else if (params_type_product == 'Geans') {
        document.getElementById('saree-details-section').innerHTML = ""
        GeansDeatails(params)
    }
    else if (params_type_product == 'Shirt') {
        document.getElementById('saree-details-section').innerHTML = ""
        shirtDetails(params)

    }
    else if (params_type_product == 'Watch') {
        document.getElementById('saree-details-section').innerHTML = ""
        WatchDetails(params)
    }
    else if (params_type_product == 'Sports') {

        let type_of_sports = new URLSearchParams(window.location.search).get('sports_type')
        if (type_of_sports == 'Football') {
            FootballDetails(params),
                LoadAllFootballs()
        }
        else if (type_of_sports == 'Cricket Bat') {

            CriketDetails(params)
        }
        else if (type_of_sports == 'Jursi') {
            JURSIDTAIls(params),
                LoadAlljursey()
        }

        console.log("SPORTS ITEM FOUND")

    }
    else if (params_type_product = 'Jacket') {
        jacketDetails(params),
            recomendationJackets(params)
    }
}

CatchSearchParamsSaree()

