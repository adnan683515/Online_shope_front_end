


const CartCreated = () => {

    token = localStorage.getItem('Token')

    const obj = {
        user: localStorage.getItem('user_id')
    }

    fetch('http://127.0.0.1:8000/cart/', {
        method: "POST",
        headers: {
            'Authorization': `Token ${token}`,  // Send token in the Authorization header
            'Content-Type': 'application/json'   // Optional: specify content type
        },
        body: JSON.stringify(obj)
    })
        .then((res) => res.json())
}

CartCreated()



const SETCART_ID = () => {

    console.log('cart id',localStorage.getItem('user_id'))

    fetch(`http://127.0.0.1:8000/cart/?user_id=${localStorage.getItem('user_id')}`)
        .then((res) => res.json())
        .then((data) => {

            localStorage.setItem('cart_id', data.id)

        })
}

SETCART_ID()


const set_cart_item = () => {

    console.log("SET cart items")

    fetch(`http://127.0.0.1:8000/cartItems/?cart_id=${localStorage.getItem('cart_id')}`)
        .then((res) => res.json())
        .then((data) => {

            let sum_quantity = 0

            data.forEach(element => {

                sum_quantity += parseInt(element.quantity)

            });
    

            document.getElementById('nav_cart_items').innerText = sum_quantity
        })
}


set_cart_item()

const admin_staff=()=>{


    fetch(`http://127.0.0.1:8000/adminstaff/${localStorage.getItem('user_id')}/`)
    .then((res) => res.json())
    .then((data) => {
        localStorage.setItem('Admin', data.is_staff)
    })
}
admin_staff()