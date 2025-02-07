
fetch("navber.html")
    .then((res) => res.text())
    .then((data) => {
        document.getElementById('navber').innerHTML = `${data}`
        const admn = localStorage.getItem('Admin')
        const token = localStorage.getItem('Token')

        if (admn === 'true') {
            document.getElementById('admin_box').innerHTML = `
                <div class="d-flex justify-content-center align-items-center">
                    <a class="m-4 text-white text-decoration-none singup_btn" href="admin_panel.html">DeshBoard</a>
                    <a class="singup_btn text-decoration-none" href="addProduct.html" type="button"
                        >Add Prduct</a>
                </div>
            `;


        }
        if (token) {
            document.getElementById('nav_cart_and_profile').innerHTML = `


                <div class="d-flex justify-content-center align-items-center">

                    <a href="myprofile.html" class="text-decoration-none text-white"><p class="mt-3"><i class="fa-solid fa-user"></i></p></a>
                    <button type="button" class="btn  position-relative m-2">
                        
                        <a href="mycart.html">
                            
                            <i class="fa-solid fa-cart-shopping text-white"></i>

                            <span id="cart-quantity"
                                class="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                                <p id="nav_cart_items"></p>
                                <!-- <span class="visually-hidden"></span> -->
                            </span>
                        </a>
                    </button>
                </div>

                <a onclick="logout_user()" class="m-3 text-white logout_btn">Logout</a>
                
                `
        }
        else {

            document.getElementById('nav_cart_and_profile').innerHTML = `
                
                <a href="singup.html" class="m-1 text-white singup_btn text-decoration-none">Sing up</a>
                <a href="login.html" class="m-1 text-white text-decoration-none button_log">Login </a>
                
                `
        }

    }




    )



const logout_user = () => {

    localStorage.removeItem('Token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('card_id')
    localStorage.removeItem('Admin')
    window.location.href = "login.html"
}