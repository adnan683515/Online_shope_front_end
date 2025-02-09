


const LoadJackets = () => {

    fetch('https://online-shope-backend.vercel.app/jackets/')
        .then((res) => res.json())
        .then((data) => {
            singlejackets(data)
        })
}

LoadJackets()



const singlejackets = (data) => {


    document.getElementById('single-jacket-items').innerHTML = ""
    document.getElementById('not_found_jacket').innerHTML = ""

    if (data.length == 0) {

        document.getElementById('not_found_jacket').innerHTML = `
        <h4 class="w-75 m-auto mt-5 ml-5">No results found</h4>
        `

    }
    else {
        data.forEach(element => {


            const parent = document.getElementById('single-jacket-items')

            const div = document.createElement('div')
            div.classList.add('col-lg-3'),
                div.classList.add('col-md-3'),
                div.classList.add('col-sm-11'),
                div.classList.add('m-1'),
                div.classList.add('card_sports'),
                div.style = "width: 14rem;"

            let imageurl = element.display_image

            if (imageurl.includes("image/upload/https://")) {
                imageurl = imageurl.replace("image/upload/", "");
            }

            // Ensure the image URL is properly formatted
            if (!imageurl.startsWith("https://")) {
                imageurl = `https://res.cloudinary.com/dtyxxpqdl/image/upload/${imageurl}`;
            }

            div.innerHTML = `
            <img src="${imageurl}" class="card-img-top sporst_img" alt="...">
                    <div class="card-body">
                        <div class="d-flex justify-content-around">
                            <p><i class="fa-solid fa-eye"></i> +${element.eyes}views</p>
                            <p>price: ${element.fixed_price}$</p>
                        </div>
                        <div class="d-flex justify-content-around">
                            <p>Description: ${element.description.slice(0, 10)}.... </p>
                            <a class="button-3 text-decoration-none text-dark" href="SareeDetails.html?product_id=${element.id}&type_product=${element.type_your_product}&sports_type=${element.sports_Type}" >more </a>
                        </div>
                    </div>



`
            parent.appendChild(div)
        });
    }
}


const typeofjacketwiseproduct = (id) => {


    fetch(`https://online-shope-backend.vercel.app/jackets/?type_jac_id=${id}`)
        .then((res) => res.json())
        .then((data) => singlejackets(data))
}

const BrandWise_product = (id) => {

    fetch(`https://online-shope-backend.vercel.app/jackets/?brand_id=${id}`)
        .then((res) => res.json())
        .then((data) => singlejackets(data))
}

const LoadBrandoFjacket = () => {


    fetch('https://online-shope-backend.vercel.app/brandjacket/')
        .then((res) => res.json())
        .then((data) => DisplayBrandJackets(data))
}

LoadBrandoFjacket()

const DisplayBrandJackets = (data) => {


    data.forEach(element => {

        const parent = document.getElementById('Brandjacket')

        const li = document.createElement('li')
        li.classList.add('jakcet_li')

        li.innerHTML = `

        <a onclick="BrandWise_product('${element.id}')" class="text-decoration-none jacK_a">${element.name}</a>
        
        `

        parent.appendChild(li)
    })
}

const LoadTypeJackets = () => {


    fetch('https://online-shope-backend.vercel.app/typeofjacket/')
        .then((res) => res.json())
        .then((data) => DisplayTypeJackets(data))
}

LoadTypeJackets()
const DisplayTypeJackets = (data) => {


    data.forEach(element => {


        const parent = document.getElementById('typejacket')
        const li = document.createElement('li')
        li.classList.add('type_jack_li')

        li.innerHTML = `

            <a onclick="typeofjacketwiseproduct('${element.id}')" class="text-decoration-none jacK_type">${element.name}</a>
        
        `
        parent.appendChild(li)
    })
}


const colour_wise_product = (id) => {

    fetch(`https://online-shope-backend.vercel.app/jackets/?colour_id=${id}`)
        .then((res) => res.json())
        .then((data) => singlejackets(data))
}

const LoadColour_jacks = () => {

    fetch('http://online-shope-backend.vercel.app/colour/')
        .then((res) => res.json())
        .then((data) => DisplayColourJacks(data))
}
LoadColour_jacks()

const DisplayColourJacks = (data) => {

    data.forEach(element => {

        const parent = document.getElementById('colour_ul_jac')

        const li = document.createElement('li')
        li.classList.add('jack_colour_li')
        li.innerHTML = `

            <a onclick="colour_wise_product('${element.id}')" class="text-decoration-none jacK_type">${element.colour_name}</a>
        
        
        `
        parent.appendChild(li)
    })
}


const warrenty_wise_proudct = (id) => {

    fetch(`https://online-shope-backend.vercel.app/jackets/?warrenty_id=${id}`)
        .then((res) => res.json())
        .then((data) => singlejackets(data))
}

const LoadWarrentyJacks = () => {

    fetch('https://online-shope-backend.vercel.app/jacketwarrenty/')
        .then((res) => res.json())
        .then((data) => DisplayWarrenty(data))
}
LoadWarrentyJacks()

const DisplayWarrenty = (data) => {

    data.forEach(element => {

        const parent = document.getElementById('warrenty-of-jacket')
        const li = document.createElement('li')
        li.classList.add('LI_of_warrenty')

        li.innerHTML = `

            <a onclick="warrenty_wise_proudct('${element.id}')" class="text-decoration-none jacK_wra">${element.name}</a>
        
        
        `
        parent.appendChild(li)
    })
}

const LoadMainMetariails = () => {

    fetch('https://online-shope-backend.vercel.app/mainmetarial/')
        .then((res) => res.json())
        .then((data) => DisplayMainmetarialis(data))
}
LoadMainMetariails()

const DisplayMainmetarialis = (data) => {

    data.forEach(element => {

        const parent = document.getElementById('MainMetariails-jacket')
        const li = document.createElement('li')
        li.classList.add('jack_colour_li')

        li.innerHTML = `
            <a class="text-decoration-none jacK_wra">${element.name}</a>
        `
        parent.appendChild(li)
    })
}