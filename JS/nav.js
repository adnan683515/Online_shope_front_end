
fetch("navber.html")
    .then((res) => res.text())
    .then((data) => {
        document.getElementById('navber').innerHTML = `${data}`
        const admn = localStorage.getItem('Admin')
        const token = localStorage.getItem('Token')

        if (admn === 'true') {
            document.getElementById('admin_box').innerHTML = `<a class="m-4 deshBord" href="admin_panel.html">DeshBoard</a>`
        }
        if (token) {
            document.getElementById('nav_cart_and_profile').innerHTML = `


                <a href="/myprofile.html" class="text-decoration-none text-white"><p class="mt-3"><i class="fa-solid fa-user"></i></p></a>
                <button type="button" class="btn  position-relative m-2">
                    
                    <a href="/mycart.html">
                        
                        <i class="fa-solid fa-cart-shopping text-white"></i>

                        <span id="cart-quantity"
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                            <p id="nav_cart_items"></p>
                            <!-- <span class="visually-hidden"></span> -->
                        </span>
                    </a>
                </button>

                <a onclick="logout_user()" class="m-3 logOut">Logout</a>
                
                `
        }
        else {

            document.getElementById('nav_cart_and_profile').innerHTML = `
                
                <a href="singup.html" class="m-1 text-white">Sing up</a>
                <a href="login.html" class="m-1 text-white">Login </a>
                
                `
        }

    }




    )



const logout_user=()=>{

    localStorage.removeItem('Token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('card_id')
    localStorage.removeItem('Admin')
    window.location.href="login.html"
}