const LoadShirt = () => {

    fetch('http://127.0.0.1:8000/shirt/')
        .then((res) => res.json())
        .then((data) => SingleShirt(data))
}

LoadShirt()

const SingleShirt = (data) => {


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
            div.classList.add('p-1')
            div.style = "width: 14rem;"



            div.innerHTML = `
            
                            <img class="card-img-top shirt-pic" src="http://127.0.0.1:8000${element.display_image}" alt="Card image cap">
                                <div class="card-body d-flex justify-content-around">
                                    <p class="card-text"><i class="fa-solid fa-eye"></i> ${element.eyes}+views</p>

                                    <p>Price: ${element.fixed_price}$</p>
                                </div>
                                <div class="card-body d-flex justify-content-around">
                                    <p>${element.country}</p>
                                    <a class="text-decoration-none icon_details btn vie_more-saree" href="SareeDetails.html?product_id=${element.id}&type_product=${element.type_your_product}">view <i class="fa-solid fa-circle-arrow-right"></i></i></a>
                                </div>


            `
            parent.appendChild(div)

        })
    }

}


const LoadShirtBrand = () => {

    fetch('http://127.0.0.1:8000/brandShirt/')
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

        <a class="text-decoration-none text-dark" onclick="BrandWiseShirt('${element.id}')">${element.brand_name}</a>
        
        `
        parent.appendChild(li)
    });
}

const BrandWiseShirt = (id) => {

    console.log(id)
    fetch(`http://127.0.0.1:8000/shirt/?brand_id=${id}`)
        .then((res) => res.json())
        .then((data) => SingleShirt(data))
}


const Loadcolour = () => {

    fetch('http://127.0.0.1:8000/colour/')
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

    fetch('http://127.0.0.1:8000/range_of_price/')
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
    fetch('http://127.0.0.1:8000/cetagoryshirt/')
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

    fetch(`http://127.0.0.1:8000/shirt/?tk_id=${id}`)
    .then((res) => res.json())
    .then((data) => SingleShirt(data))
}

const Loadcolour_wise=(id)=>{

    fetch(`http://127.0.0.1:8000/shirt/?colour_id=${id}`)
    .then((res) => res.json())
    .then((data) => SingleShirt(data))
}

const LoadCetagorywise=(id)=>{

    fetch(`http://127.0.0.1:8000/shirt/?ceta_id=${id}`)
    .then((res) => res.json())
    .then((data) => SingleShirt(data))
}