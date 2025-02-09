


const LoadSportsItem = () => {


    console.log("Load sport item")
    fetch('https://online-shope-backend.vercel.app/Football/')
        .then((res) => res.json())
        .then((data) => DisplaySportsItem(data))
}


LoadSportsItem()

const DisplaySportsItem = (data) => {


    document.getElementById('sports-box-container').innerHTML = ""
    document.getElementById('not_found_sports').innerHTML = ""
    if (data.length == 0) {

        document.getElementById('not_found_sports').innerHTML = `
                <h4 class="w-75 m-auto mt-5 ml-5 align-items-center">No results found</h4>
        
        `
    }
    else {
        // <a class="button-3 text-decoration-none text-dark" href="SareeDetails.html?product_id=${element.id}&type_product=${element.type_your_product}&sports_type=${element.sports_Type}" >more </a>
        data.forEach(element => {

            const parent = document.getElementById('sports-box-container')
            const token = localStorage.getItem('Token')

            const div = document.createElement('div')

            div.classList.add('col-lg-2'),
                div.classList.add('col-md-2'),
                div.classList.add('col-sm-11'),
                div.classList.add('m-1'),
                div.classList.add('card_sports'),
                div.style = "width: 15rem;"

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
                                        ${token ? `<a class="button-3 text-decoration-none text-dark" href="SareeDetails.html?product_id=${element.id}&type_product=${element.type_your_product}&sports_type=${element.sports_Type}" >more </a>` : '<a class="button-3 text-decoration-none text-dark" href="login.html">more</a>'}
                            
                                            
                                    </div>
                                </div>
            
            
            
            `


            // if (token){
            //     document.getElementById('button_auth').innerHTML=`
            //         <a class="button-3 text-decoration-none text-dark" href="SareeDetails.html?product_id=${element.id}&type_product=${element.type_your_product}&sports_type=${element.sports_Type}" >more </a>
            //     `

            // }
            // else{
            //     document.getElementById('button_auth').innerHTML=`
            //         <button> asdf</button>
            //     `
            // }
            parent.appendChild(div)
        });
    }
}


const LoadTeamName = () => {


    fetch('https://online-shope-backend.vercel.app/team/')
        .then((res) => res.json())
        .then((data) => DisplayTEam(data))
}

LoadTeamName()

const DisplayTEam = (data) => {

    data.forEach(element => {


        const parent = document.getElementById('jursey_item')

        const p = document.createElement('p')
        p.classList.add('team_name')
        p.innerHTML = `
            <a class="text-decoration-none text-dark" onclick="LoadJurseywiseTEam('${element.id}')">${element.name}</a>
        
        `
        parent.appendChild(p)

    })
}



const LoadJurseywiseTEam = (id) => {

    fetch(`https://online-shope-backend.vercel.app/Football/?team_id=${id}`)
        .then((res) => res.json())
        .then((data) => DisplaySportsItem(data))
}


const LoadVersion = () => {


    fetch('https://online-shope-backend.vercel.app/version/')
        .then((res) => res.json())
        .then((data) => DIsplayVersionWisejursery(data))
}

LoadVersion()

const DIsplayVersionWisejursery = (data) => {


    data.forEach(element => {

        const parent = document.getElementById('jursey_type')

        const p = document.createElement('p')
        p.classList.add('version_name')


        p.innerHTML = `
        
            <a class="text-decoration-none text-dark" onclick="VersionWiseProduct('${element.id}')" >${element.name}</a>
        `
        parent.appendChild(p)
    })
}

const VersionWiseProduct = (id) => {


    fetch(`https://online-shope-backend.vercel.app/Football/?version_id=${id}`)
        .then((res) => res.json())
        .then((data) => DisplaySportsItem(data))
}

const lOadRangeofPrice = () => {

    fetch('https://online-shope-backend.vercel.app/range_of_price/')
        .then((res) => res.json())
        .then((data) => {


            data.forEach(element => {

                const parent = document.getElementById('range_of_price_sports')

                const p = document.createElement('p')
                p.classList.add('version_name')
                p.innerHTML = `
            
                    <a class="text-decoration-none text-dark" onclick="DisplayProductWiseprice('${element.id}')" >${element.price_name}</a>
            `

                parent.appendChild(p)
            })
        })
}

lOadRangeofPrice()


const DisplayProductWiseprice = (id) => {

    fetch(`https://online-shope-backend.vercel.app/Football/?tk_id=${id}`)
        .then((res) => res.json())
        .then((data) => DisplaySportsItem(data))
}

const LoadColour = () => {

    fetch('https://online-shope-backend.vercel.app/colour/')
        .then((res) => res.json())
        .then((data) => Display_colour(data))
}
LoadColour()

const Display_colour = (data) => {

    data.forEach(element => {

        const parent = document.getElementById('Colour_Family')
        const li = document.createElement('li')
        li.classList.add('li_of_colour')

        li.innerHTML = `
            <a class="text-decoration-none text-dark" onclick="ColourWisePorudct('${element.id}')" >${element.colour_name}</a>
        
        `
        parent.appendChild(li)
    })
}


const ColourWisePorudct = (id) => {

    fetch(`https://online-shope-backend.vercel.app/Football/?colour_Id=${id}`)
        .then((res) => res.json())
        .then((data) => DisplaySportsItem(data))
}


const LoadCricketBrand = () => {

    fetch('https://online-shope-backend.vercel.app/CricketBrand/')
        .then((res) => res.json())
        .then((data) => DisplayCricketBran(data))
}
LoadCricketBrand()

const DisplayCricketBran = (data) => {


    data.forEach(element => {

        const parent = document.getElementById('cricket_Brand')


        const p = document.createElement('p')
        p.classList.add('cricket_brand_name')

        p.innerHTML = `
            <a class="text-decoration-none text-dark" onclick="LoadCricketBrandWiseProudct('${element.id}')">${element.name}</a>
        `
        parent.appendChild(p)
    })
}

const LoadCricketBrandWiseProudct = (id) => {


    fetch(`https://online-shope-backend.vercel.app/Football/?cricket_brand=${id}`)
        .then((res) => res.json())
        .then((data) => DisplaySportsItem(data))
}


const LoadMetarial = () => {
    fetch('https://online-shope-backend.vercel.app/mainmetarial/')
        .then((res) => res.json())
        .then((data) => DisplayMetarail(data))
}

LoadMetarial()

const DisplayMetarail = (data) => {


    data.forEach(element => {

        const parent = document.getElementById("meterail")
        const p = document.createElement('p')
        p.classList.add('meta_p')
        p.innerHTML = `
            <a class="text-decoration-none text-dark" onclick="LoadMetraillwiseProduct('${element.id}')">${element.name}</a>
            
        `
        parent.appendChild(p)
    })

}

const LoadMetraillwiseProduct = (id) => {


    fetch(`https://online-shope-backend.vercel.app/Football/?metarail_id=${id}`)
        .then((res) => res.json())
        .then((data) => DisplaySportsItem(data))
}


const LoadBATSize = () => {

    fetch("https://online-shope-backend.vercel.app/Batsize/")
        .then((res) => res.json())
        .then((data) => DisplayBATSIZE(data))
}

LoadBATSize()

const DisplayBATSIZE = (data) => {

    data.forEach(element => {
        const parent = document.getElementById("Batsize")

        const p = document.createElement('p')
        p.classList.add('Size_p')

        p.innerHTML = `

        <a class="text-decoration-none text-dark" onclick="SIZewiseBAT('${element.id}')"  >${element.size_name}</a>
        
        `
        parent.appendChild(p)
    })
}

const SIZewiseBAT = (id) => {

    fetch(`https://online-shope-backend.vercel.app/Football/?size_id=${id}`)
        .then((res) => res.json())
        .then((data) => DisplaySportsItem(data))
}




const lOadRangeofPriceFB = () => {

    fetch('https://online-shope-backend.vercel.app/range_of_price/')
        .then((res) => res.json())
        .then((data) => DisplayRangePriceFB(data))

}

lOadRangeofPriceFB()

const DisplayRangePriceFB = (data) => {

    data.forEach(element => {

        const parent = document.getElementById('price_family')
        const li = document.createElement('li')
        li.classList.add('fb_price_li')

        li.innerHTML = `
        
        <a class="text-decoration-none text-dark" onclick="price_wise_football('${element.id}')" >${element.price_name}</a>
        
        
        `
        parent.appendChild(li)
    })
}


const price_wise_football = (id) => {


    fetch(`https://online-shope-backend.vercel.app/Football/?price_fb=${id}`)
        .then((res) => res.json())
        .then((data) => DisplaySportsItem(data))
}


// http://online-shope-backend.vercel.app/warenty/

const LoadWarentyFb = () => {

    fetch('https://online-shope-backend.vercel.app/warenty/')
        .then((res) => res.json())
        .then((data) => DisplayWarrentyFb(data))
}
LoadWarentyFb()

const DisplayWarrentyFb = (data) => {

    data.forEach(element => {


        const parent = document.getElementById('warenty_fb')
        const li = document.createElement('li')
        li.classList.add('fb_price_li')

        li.innerHTML = `

        <a class="text-decoration-none text-dark" onclick="warentyWiseFootball('${element.id}')" >${element.name}</a>
        
        
        `
        parent.appendChild(li)
    })
}


const warentyWiseFootball = (id) => {

    fetch(`https://online-shope-backend.vercel.app/Football/?warrenty_fb=${id}`)
        .then((res) => res.json())
        .then((data) => DisplaySportsItem(data))
}