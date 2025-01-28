
const load_geans_size = () => {

    fetch('http://127.0.0.1:8000/size_of_geans/')
        .then((res) => res.json())
        .then((data) => single_geans_size(data))
}
load_geans_size()

const single_geans_size = (data) => {

    data.forEach(element => {

        const parent = document.getElementById('geans_size')
        const li = document.createElement('li')
        li.classList.add('dropdown-time')
        li.classList.add('size_li')
        li.classList.add('hover_li_geans_cetagroy')

        li.innerHTML = `
            <a class="text-decoration-none text-dark" onclick="SizeWiseGeans('${element.id}')">${element.size_name}</a>
        
        `
        parent.appendChild(li)
    });
}


const LoadGeansBrand = () => {

    fetch('http://127.0.0.1:8000/geans_brand/')
        .then((res => res.json()))
        .then((data) => SingleGeansBrand(data))
}

LoadGeansBrand()

const SingleGeansBrand = (data) => {

    data.forEach(element => {

        const parent = document.getElementById('brand_geans')
        const li = document.createElement('li')
        li.classList.add('dropdown-item')
        li.classList.add('hover_li_geans')

        li.innerHTML = `
            <a class="text-decoration-none text-dark" onclick="BrandWiseGeans('${element.id}')">${element.name}</a>
        
        `
        parent.appendChild(li)
    })
}

const LoadGeansCetagory = () => {
    fetch("http://127.0.0.1:8000/geans_cetagory/")
        .then((res) => res.json())
        .then((data) => SingleGeansCetagory(data))
}
LoadGeansCetagory()
const SingleGeansCetagory = (data) => {

    data.forEach(element => {
        const parent = document.getElementById("geans_cetagory_filter")
        

        const li = document.createElement('li')
        li.classList.add("dropdown-item")
        li.classList.add('hover_li_geans_cetagroy')

        li.innerHTML = `
            <a class="text-decoration-none text-dark" onclick="GeansCetagoryWise('${element.id}')">${element.name}</a>
        
        `
        parent.appendChild(li)
    })
}


const GeansCetagoryWise = (id) => {

    fetch(`http://127.0.0.1:8000/geans/?geans_cetagory_id=${id}`)
        .then((res) => res.json())
        .then((data) => SingleGeans(data))
}


const LoadGeans = () => {

    fetch('http://127.0.0.1:8000/geans/')
        .then((res) => res.json())
        .then((data) => SingleGeans(data))
}

LoadGeans()

const SingleGeans = (data) => {


    document.getElementById('geans_container').innerHTML = ""
    document.getElementById('not_found_geans').innerHTML = ""

    const token = localStorage.getItem('Token')

    if (data.length == 0) {

        document.getElementById('not_found_geans').innerHTML = `
        
            <h4 class="w-75 m-auto mt-5 ml-5">No results found</h4>
        `
    }
    else {
        data.forEach(element => {

            const parent = document.getElementById('geans_container')

            const div = document.createElement('div')
            div.classList.add('card')
            div.classList.add('col-lg-2')
            div.classList.add('col-md-2')
            div.classList.add('col-sm-12')
            div.classList.add('m-1')
            div.classList.add('single_geans_card')
            div.style = "width: 16rem;"
            div.innerHTML = `       
                            <img src="http://127.0.0.1:8000${element.display_image}" class="card-img-top img_card_saree" alt="...">
                                <div class="card-body">
                                    <div class="d-flex  justify-content-around">
                                        <p id="eyes"><i class="fa-solid fa-eye"></i> +${element.eyes} views</i></p>
                                        <p class="card-text ">Price:${element.fixed_price}Tk</p>
                                        
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                    <p>Abailable:${element.abailable}</p>
                            
                                    ${token?` <a class="text-decoration-none view_more  btn" href="SareeDetails.html?product_id=${element.id}&type_product=${element.type_your_product}">view <i class="fa-solid fa-circle-arrow-right"></i></i></a>
                                    </div>`:` <a class="text-decoration-none view_more  btn" href="login.html">view <i class="fa-solid fa-circle-arrow-right"></i></i></a>
                                    </div>`}
                                    
                                
                                </div>    
                                `

            parent.appendChild(div)

        })
    }

}

const LoadColourGEans = () => {
    fetch('http://127.0.0.1:8000/colour/')
        .then((res) => res.json())
        .then((data) => SingleColourLoad(data))
}
LoadColourGEans()

const SingleColourLoad = (data) => {

    data.forEach(element => {

        const parent = document.getElementById('colour_ul_geans')
        const li = document.createElement('li')
        li.classList.add('dropdown-item')
        li.classList.add('hover_li_geans')

        li.innerHTML = `
            <a class="text-decoration-none text-dark" onclick="ColourWiseGeans('${element.id}')">${element.colour_name}</a>
        
        `
        parent.appendChild(li)
    })

}

const ColourWiseGeans = (id) => {
    fetch(`http://127.0.0.1:8000/geans/?colour_id=${id}`)
        .then((res) => res.json())
        .then((data) => SingleGeans(data))
}

const BrandWiseGeans=(id)=>{

    fetch(`http://127.0.0.1:8000/geans/?brand_id=${id}`)
    .then((res) => res.json())
    .then((data) => SingleGeans(data))
}

const SizeWiseGeans=(id)=>{

    fetch(`http://127.0.0.1:8000/geans/?size_id=${id}`)
    .then((res) => res.json())
    .then((data) => SingleGeans(data))
}

const RangePriceGeans=()=>{
    fetch('http://127.0.0.1:8000/range_of_price/')
    .then((res) => res.json())
    .then((data) => load_range_price_geans(data))
}

RangePriceGeans()
const load_range_price_geans = (price_list) => {

    price_list.forEach(element => {


        const parent = document.getElementById('price_box_geans')

        const li = document.createElement('li')
        li.classList.add('geans_price_li')

        li.innerHTML = `
            <a class="text-decoration-none text-dark" onclick="price_wise_geans('${element.id}')" >${element.price_name}</a>
        `
        parent.appendChild(li)
    })
}

const price_wise_geans=(id)=>{

    fetch(`http://127.0.0.1:8000/geans/?taka_id=${id}`)
    .then((res) => res.json())
    .then((data) => SingleGeans(data))
}

const InputValueGet=()=>{

    const  GeansSearchValue=document.getElementById('geans_search_input').value

    fetch(`http://127.0.0.1:8000/geans/?title=${GeansSearchValue}`)
    .then((res) => res.json())
    .then((data) => SingleGeans(data))

    document.getElementById('geans_search_input').value=""
}

