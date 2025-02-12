const LoadShirt = () => {

    fetch('https://online-shope-backend.vercel.app/shirt/')
        .then((res) => res.json())
        .then((data) => SingleShirt(data))
}

LoadShirt()

const SingleShirt = (data) => {

    const token = localStorage.getItem('Token')
    document.getElementById('single-shirt-items').innerHTML=""
    document.getElementById('not_found_shirt').innerHTML=""
    if (data.length == 0) {
        
        document.getElementById('not_found_shirt').innerHTML = `
            <h4 class="w-75 m-auto mt-5 ml-5">No results found</h4>
        
        `
    }
    else {
        data.forEach(element => {

            
            const parent = document.getElementById('single-shirt-items')
            const div = document.createElement('div')
            div.classList.add('shirt-card')
            div.classList.add('col-lg-3')
            div.classList.add('col-md-3')
            div.classList.add('col-sm-12')
            div.classList.add('m-1')
            div.style = "width: 14rem;"



            div.innerHTML = `
            
                            <img class="card-img-top shirt-pic" src="http://127.0.0.1:8000${element.display_image}" alt="Card image cap">
                                <div class="card-body d-flex justify-content-around">
                                    <p class="card-text"><i class="fa-solid fa-eye"></i> ${element.eyes}+views</p>

                                    <p>Price: ${element.fixed_price}$</p>
                                </div>
                                <div class="card-body d-flex gap-5 justify-content-center align-items-center">
                                    <p>${element.country}</p>
                                    
                                    ${token ? `<a class="text-decoration-none  view_more_btn" href="SareeDetails.html?product_id=${element.id}&type_product=${element.type_your_product}">view <i class="fa-solid fa-circle-arrow-right"></i></i></a>`:`<a class="text-decoration-none  view_more_btn" href="login.html">view <i class="fa-solid fa-circle-arrow-right"></i></i></a>`}

                                </div>


            `
            parent.appendChild(div)

        })
    }

}


const LoadShirtBrand = () => {

    fetch('https://online-shope-backend.vercel.app/brandShirt/')
        .then((res) => res.json())
        .then((data) => DisplayBrandShit(data))
}
LoadShirtBrand()

const DisplayBrandShit = (data) => {

    data.forEach(element => {

        const parent = document.getElementById('BrandShirt')
        const li = document.createElement('li')
        li.classList.add('brand-drop-down')

        li.innerHTML = `

        <a class="text-decoration-none  text-dark" onclick="BrandWiseShirt('${element.id}')">${element.brand_name}</a>
        
        `
        parent.appendChild(li)
    });
}

const BrandWiseShirt = (id) => {

    console.log(id)
    fetch(`https://online-shope-backend.vercel.app/shirt/?brand_id=${id}`)
        .then((res) => res.json())
        .then((data) => SingleShirt(data))
}


const Loadcolour = () => {

    fetch('https://online-shope-backend.vercel.app/colour/')
        .then((res) => res.json())
        .then((data) => DisplayColour(data))
}

Loadcolour()

const DisplayColour = (data) => {


    data.forEach(element => {

        const parent = document.getElementById('colour-shirt')

        const li = document.createElement('li')

        li.classList.add('brand-drop-down')

        li.innerHTML = `
            <a class="text-decoration-none text-dark" onclick="Loadcolour_wise('${element.id}')">${element.colour_name}</a>
        
        `
        parent.appendChild(li)
    })
}




const LoadPrice = () => {

    fetch('https://online-shope-backend.vercel.app/range_of_price/')
        .then((res) => res.json())
        .then((data) => DisplayPrice(data))
}

LoadPrice()

const DisplayPrice = (data) => {


    data.forEach(element => {

        const parent = document.getElementById('price-of-shirt')

        const li = document.createElement('li')

        li.classList.add('brand-drop-down')

        li.innerHTML = `
            <a class="text-decoration-none text-dark" onclick="LoadTk('${element.id}')">${element.price_name}</a>
        
        `
        parent.appendChild(li)
    })
}


const LoadCetagoryShirt = () => {
    fetch('https://online-shope-backend.vercel.app/cetagoryshirt/')
        .then((res) => res.json())
        .then((data) => DisplayCetagoryShirt(data))
}
LoadCetagoryShirt()
const DisplayCetagoryShirt = (data) => {

    data.forEach(element => {

        const parent = document.getElementById('cetagory-shirt')
        const li = document.createElement('li')
        li.classList.add('brand-drop-down')

        li.innerHTML = `
        
            <a class="text-decoration-none text-dark" onclick="LoadCetagorywise('${element.id}')">${element.name}</a>
        `
        parent.appendChild(li)

    })
}


const LoadTk=(id)=>{

    fetch(`https://online-shope-backend.vercel.app/shirt/?tk_id=${id}`)
    .then((res) => res.json())
    .then((data) => SingleShirt(data))
}

const Loadcolour_wise=(id)=>{

    fetch(`https://online-shope-backend.vercel.app/shirt/?colour_id=${id}`)
    .then((res) => res.json())
    .then((data) => SingleShirt(data))
}

const LoadCetagorywise=(id)=>{

    fetch(`https://online-shope-backend.vercel.app/shirt/?ceta_id=${id}`)
    .then((res) => res.json())
    .then((data) => SingleShirt(data))
}