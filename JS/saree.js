const sareee = () => {
    fetch('http://online-shope-backend.vercel.app/saree/')
        .then((res) => res.json())
        .then((data) => single_saree(data))
}

sareee()

const single_saree = (saree_list) => {


    document.getElementById('not_found').innerHTML = ""
    document.getElementById('saree_container').innerHTML = ""

    if (saree_list.length == 0) {

        document.getElementById('saree_container').innerHTML = `
                        <h4 class="w-75 m-auto mt-5 ml-5">No results found</h4>
        `

    }
    else {



        saree_list.forEach(element => {



            const parent = document.getElementById('saree_container')
            const div = document.createElement('div')
            div.classList.add('card')
            div.classList.add('col-lg-2')
            div.classList.add('col-md-2')
            div.classList.add('col-sm-12')
            div.classList.add('m-1')
            div.classList.add('single_saree_card')
            div.style = "width: 16rem;"
            let imageurl = element.display_image

            if (imageurl.includes("image/upload/https://")) {
                imageurl = imageurl.replace("image/upload/", "");
            }

            // Ensure the image URL is properly formatted
            if (!imageurl.startsWith("https://")) {
                imageurl = `https://res.cloudinary.com/dtyxxpqdl/image/upload/${imageurl}`;
            }
            div.innerHTML = `       
                            <img src="${imageurl}" class="card-img-top img_card_saree" alt="...">
                                <div class="card-body">
                                    <div class="d-flex  justify-content-around">
                                        <p id="eyes"><i class="fa-solid fa-eye"></i> +${element.eyes} views</i></p>
                                        <p class="card-text ">Price:${element.fixed_price}Tk</p>
                                        
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                    <p>Abailable:${element.abailable}</p>
                            
                                    <a class="text-decoration-none  btn view_more " href="SareeDetails.html?product_id=${element.id}&type_product=${element.type_your_product}">view <i class="fa-solid fa-circle-arrow-right"></i></i></a>
                                    </div>
                                    
                                
                                </div>    
                                `

            parent.appendChild(div)


        });
    }

}

fetch('http://online-shope-backend.vercel.app/saree_cetagory/')
    .then((res) => res.json())
    .then((data) => load_saree_cetagory(data))


const load_saree_cetagory = (cetagory_list) => {

    cetagory_list.forEach(element => {

        console.log('saree cetagory', element)
        const parent = document.getElementById('sare_cetagory_filter')

        const li = document.createElement('li')
        li.classList.add('cetagroy_name')

        li.innerHTML = `
            
            <a class="text-decoration-none list_item-saree" onclick="cetagory_wise_saree('${element.id}')">${element.name}</a>
        
        `

        parent.appendChild(li)
    })
}

const cetagory_wise_saree = (id) => {
    fetch(`http://online-shope-backend.vercel.app/saree/?cetagory=${id}`)
        .then((res) => res.json())
        .then((data) => single_saree(data))
}


const colour = () => {
    fetch('http://online-shope-backend.vercel.app/colour/')
        .then((res) => res.json())
        .then((data) => load_colour(data))
}
colour()

const load_colour = (colour_list) => {

    colour_list.forEach(element => {

        const parent = document.getElementById('colour_ul')

        const li = document.createElement('li')
        li.classList.add('colour_name')
        li.classList.add('hover_li_geans_cetagroy')

        li.innerHTML = `

            <a class="text-decoration-none" onclick="colour_wise_saree('${element.id}')">${element.colour_name}</a>
        `
        parent.appendChild(li)
    })

}


const colour_wise_saree = (id) => {


    fetch(`http://online-shope-backend.vercel.app/saree/?colour_id=${id}`)
        .then((res) => res.json())
        .then((data) => single_saree(data))
}



fetch('http://online-shope-backend.vercel.app/range_of_price/')
    .then((res) => res.json())
    .then((data) => load_range_price(data))


const load_range_price = (price_list) => {

    price_list.forEach(element => {


        const parent = document.getElementById('price_box')

        const li = document.createElement('li')
        li.classList.add('dropdown-item')

        li.innerHTML = `
            <a class="text-decoration-none text-dark" onclick="price_wise_saree('${element.id}')" >${element.price_name}</a>
        `
        parent.appendChild(li)
    })
}


const price_wise_saree = (id) => {


    fetch(`http://online-shope-backend.vercel.app/saree/?range_of_price=${id}`)
        .then((res) => res.json())
        .then((data) => single_saree(data))
}


fetch('http://online-shope-backend.vercel.app/brand_saree/')
    .then((res) => res.json())
    .then((data) => laod_bran_saree(data))


const laod_bran_saree = (brand_list) => {

    brand_list.forEach(element => {

        const parent = document.getElementById('brand_saree')

        const li = document.createElement('li')

        li.classList.add('cetagroy_name')
        li.innerHTML = `

        <a class="text-decoration-none text-dark" onclick="brand_wise_sare('${element.id}')">${element.name}</a>

        `
        parent.appendChild(li)
    })
}

const brand_wise_sare = (id) => {

    fetch(`http://online-shope-backend.vercel.app/saree/?brand_saree=${id}`)
        .then((res) => res.json())
        .then((data) => single_saree(data))
}


const catch_search_box = () => {

    const value = document.getElementById('sare_seacrh_input').value



    fetch(`http://online-shope-backend.vercel.app/saree/?product_title=${value}`)
        .then((res) => res.json())
        .then((data) => single_saree(data))

    document.getElementById('sare_seacrh_input').value = ""
}


