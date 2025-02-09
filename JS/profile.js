



const LoadOderlist = () => {

    const token = localStorage.getItem('Token')
    fetch('https://online-shope-backend.vercel.app/oderlist/', {
        method: "GET",
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'  // Optional, depending on your API
        }
    })
        .then((res) => res.json())
        .then((data) => {







            fetch(`https://online-shope-backend.vercel.app/user/${localStorage.getItem('user_id')}/`)
                .then((res) => res.json())
                .then((user_data) => {

                    const parentUser = document.getElementById('otherinfo')

                    parentUser.innerHTML = `
                                <div class="d-flex justify-content-around">
                                        <div>
                                            <p>Username:${user_data.username}</p>
                
                                            <p>First Name: ${user_data.first_name}</p>
                                            <p>Last Name: ${user_data.last_name}</p>
                                            <p>Email: ${user_data.email}</p>
                                        </div>

                                            <div>
                                                <a href="pass_word.html"  class="pass_cng text-decoration-none text-white">Password Change</a>
                                            </div>

                                </div>
            
            
            `  
                })







            data.forEach(element => {

                let button_class = '';

                if (element.status === 'Pending') {
                    button_class = 'pending'
                }
                else if (element.status === 'Shipped') {
                    button_class = 'shiped'
                }
                else if (element.status === 'Canceled') {
                    button_class = 'cenceled'
                }
                else if(element.status ==='Delivered'
                ) {
                    button_class = 'suc'
                }


                const parent = document.getElementById('oder_row_container')

                const tr = document.createElement('tr')

                tr.innerHTML = `
                                    <th scope="row">${element.id}</th>
                                    <th scope="row">${element.user.username}</th>
                                    <td><a class="text-dark" href="SareeDetails.html?product_id=${element.product.id}&type_product=${element.product.type_your_product}&sports_type=${element.product.sports_Type}">${element.product.product_title}</a></td>
                                    <td>${element.product.fixed_price}$</td>
                                    <td>${element.total_price}</td>
                                    <td>${element.quantity}</td>
                                    <td><p  class="${button_class}">${element.status}</p></td>             
                                    <td>${element.product.type_your_product}</td>
                                    <td>
                                    <a onclick="Delete_order_user('${element.id}')" class="button-11 text-decoration-none " role="button"><i class="fa-solid fa-xmark"></i></a>
                                    </td>
                                    <td><a href="/order_details.html?oder_id=${element.id}" class="button-order text-decoration-none">More..</a></td>
            
            
            `
                parent.appendChild(tr)



            });
        })
}

LoadOderlist()

const Delete_order_user=(id)=>{


    fetch(`https://online-shope-backend.vercel.app/order/?order_id_del=${id}`,{
        method:"DELETE"
    })
    .then((res) =>{
        document.getElementById('order_delete_msg').innerText=`${id}th Number Oder Deleted!`
    })
    document.getElementById('order_delete_msg').innerText=""
}