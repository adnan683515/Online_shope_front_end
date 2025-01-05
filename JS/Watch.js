

const LoadWatchProduct = () => {

    fetch('http://127.0.0.1:8000/watch/')
        .then((res) => res.json())
        .then((data) => SingleWatchProduct(data))
}

LoadWatchProduct()

// single_product_watch


const SingleWatchProduct = (data) => {


    document.getElementById('single_product_watch').innerHTML = ""
    document.getElementById('not_found_watch').innerHTML = ""

    if (data.length == 0) {
        document.getElementById('not_found_watch').innerHTML = `
                    <h4 class="w-75 m-auto mt-5 ml-5 align-items-center">No results found</h4>
        `
    }
    else {

        data.forEach(element => {
            console.log(element)

            const parent = document.getElementById('single_product_watch')

            const div = document.createElement('div')
            div.classList.add('card'),
                div.classList.add('col-lg-2'),
                div.classList.add('col-md-2'),
                div.classList.add('col-sm-12'),
                div.classList.add('m-2'),
                div.classList.add('single_watch'),
                div.style = "width: 16rem;"

            div.innerHTML = `
        
        
                        <img src="http://127.0.0.1:8000/${element.display_image}" class="card-img-top watc-pic" alt="...">
                            <div class="card-body">
                                <div class="d-flex gap-4">
                                
                                    <p><i class="fa-solid fa-eye"></i> +${element.eyes}views </p>
                                    <p>price: ${element.fixed_price}$</p>

                                </div>
                                <div class="d-flex justify-content-around gap-5 ">
                                    <p>${element.country}</p>
                                    <a class="text-decoration-none mt-2 icon_details" href="SareeDetails.html?product_id=${element.id}&type_product=${element.type_your_product}" >View <i class="fa-solid fa-circle-arrow-right"></i></i></a>
                                </div>

                            </div>
        
        
        
        `
            parent.appendChild(div)
        })
    }
}

const LoadWatchCetagory = () => {

    fetch('http://127.0.0.1:8000/WatchCetagory/')
        .then((res) => res.json())
        .then((data) => DisplayWatchCetgory(data))
}


LoadWatchCetagory()






const DisplayWatchCetgory = (data) => {


    data.forEach(element => {

        const parent = document.getElementById('wacth-Cetagory-section')

        const li = document.createElement('li')
        li.classList.add('wtach-li')

        li.innerHTML = `
                <a class="text-decoration-none text-dark" onclick="LoadCetagoryWatch('${element.id}')">${element.name}</a>
        
        
        `
        parent.appendChild(li)
    });


}


const LoadCetagoryWatch = (id) => {

    fetch(`http://127.0.0.1:8000/watch/?cetagory_id=${id}`)
        .then((res) => res.json())
        .then((data) => SingleWatchProduct(data))
}



const LoadBrandWatch = () => {

    fetch('http://127.0.0.1:8000/WatchBrand/')
        .then((res) => res.json())
        .then((data) => DisplayBrandWatch(data))
}

LoadBrandWatch()

const DisplayBrandWatch = (data) => {


    data.forEach(element => {


        const parent = document.getElementById('wacth-brand-section')

        const li = document.createElement('li')
        li.classList.add('brand-wacth-li')

        li.innerHTML = `
        
            <a class="text-decoration-none text-dark" onclick="BrandWiseWacth('${element.id}')" >${element.name}</a>
        `
        parent.appendChild(li)
    })
}

const BrandWiseWacth=(id)=>{

    fetch(`http://127.0.0.1:8000/watch/?brand_id=${id}`)
    .then((res) => res.json())
    .then((data) => SingleWatchProduct(data))
}


const LoadWantenty = () => {

    fetch('http://127.0.0.1:8000/warenty/')
        .then((res) => res.json())
        .then((data) => DisplayWarenty(data))
}

LoadWantenty()

const DisplayWarenty = (data) => {

    data.forEach(element => {

        const parent = document.getElementById('wacth-warenty-section')

        const li = document.createElement('li')
        li.classList.add('warenty-li')
        li.innerHTML = `
        
            <a class="text-decoration-none text-dark" onclick="WarentWiseProduct('${element.id}')" >${element.name}</a>

        
        `
        parent.appendChild(li)
    })
}

const WarentWiseProduct=(id)=>{
    fetch(`http://127.0.0.1:8000/watch/?warenty_id=${id}`)
    .then((res) => res.json())
    .then((data) => SingleWatchProduct(data))
}

const LoaddiyalSize = () => {

    fetch('http://127.0.0.1:8000/diyal/')
        .then((res) => res.json())
        .then((data) => Displaydiyal(data))
}

LoaddiyalSize()

const Displaydiyal = (data) => {

    data.forEach(element => {


        const parent = document.getElementById('wacth-diyal-section')

        const li = document.createElement('li')
        li.classList.add('diyal-li')

        li.innerHTML = `

        <a class="text-decoration-none text-dark" onclick="Diyal_size_wise_product('${element.id}')" >${element.name}</a>
        
        `

        parent.appendChild(li)
    })
}


const Diyal_size_wise_product=(id)=>{

    fetch(`http://127.0.0.1:8000/watch/?diyal_size_id=${id}`)
    .then((res) => res.json())
    .then((data) => SingleWatchProduct(data))
}

const LoadStrapMetarail = () => {

    fetch('http://127.0.0.1:8000/strapMetarail/')
        .then((res) => res.json())
        .then((data) => displayStrapmetarail(data))
}

LoadStrapMetarail()

const displayStrapmetarail = (data) => {


    data.forEach(element => {


        const parent = document.getElementById('wacth-strap-section')

        const li = document.createElement('li')
        li.classList.add('strap-li')

        li.innerHTML = `
            <a class="text-decoration-none text-dark" onclick="StrapmetarialWiseProduct('${element.id}')" >${element.name}</a>
        
        `
        parent.appendChild(li)
    })
}

const StrapmetarialWiseProduct=(id)=>{

    fetch(`http://127.0.0.1:8000/watch/?strap_id=${id}`)
    .then((res) => res.json())
    .then((data) => SingleWatchProduct(data))
}


const LoadRangeOfPrice = () => {

    fetch('http://127.0.0.1:8000/range_of_price/')
        .then((res) => res.json())
        .then((data) => DisplayRangeOfPrice(data))
}


LoadRangeOfPrice()


const DisplayRangeOfPrice = (data) => {

    data.forEach(element => {

        const parent = document.getElementById('range_of_price_watch')
        const li = document.createElement('li')

        li.innerHTML = `
        
                <a class="dropdown-item" onclick="TkWiseProduct('${element.id}')">${element.price_name}</a>
        `
        parent.appendChild(li)
    })
}


const TkWiseProduct=(id)=>{

    fetch(`http://127.0.0.1:8000/watch/?tk_id=${id}`)
    .then((res) => res.json())
    .then((data) => SingleWatchProduct(data))
}