

const all_oder_list = () => {

    fetch('http://127.0.0.1:8000/order/')
        .then((res) => res.json())
        .then((data) => DisplayAlloderList(data))
}

all_oder_list()



let pending_count = 0;
let deliverd_count = 0;
let shiped_count = 0;
let oder_count = 0;

const DisplayAlloderList = (data) => {
    pending_count = 0;
    deliverd_count = 0;
    shiped_count = 0;
    oder_count = data.length


    document.getElementById('admin_panel_order_talbe').innerHTML = ""
    document.getElementById('odernotfound').innerHTML = ""

    if (data.length === 0) {

        document.getElementById('odernotfound').innerHTML = `
        
            <h6 class="text-center">Oder Not found</h6>
        `
    }
    else {
        data.forEach(element => {




            let button_class_type = '';

            if ('Pending' === element.status) {
                pending_count += 1;
                button_class_type = 'pending_btn_admin'
            }
            else if (element.status === 'Canceled') {

                button_class_type = 'Cenceled_btn'

            }
            else if (element.status === 'Delivered') {
                deliverd_count += 1;
                button_class_type = 'suc_btn'
            }
            else if ('Shipped' === element.status) {
                button_class_type = 'shiped'
                shiped_count += 1;
            }



            const parent = document.getElementById('admin_panel_order_talbe')

            const tr = document.createElement('tr')

            tr.innerHTML = `
                    <th scope="row">${element.id}</th>
                                <td>${element.user.username}</td>
                                <td>${element.user.email}</td>
                                <td>${element.product.type_your_product}</td>
                                <td><p class="${button_class_type}">${element.status}</p></td>
                                <td><a onclick="Delete_order('${element.id}')" class="button-18 text-white text-decoration-none">Remove</a></td>
                                <td><a href="order_details.html?oder_id=${element.id}" class='button-34 text-decoration-none'>click</a></td>
                                <td>
    
                            
    
                                                        <select class="select_adminPanel" aria-label="Default select example" onchange="ship_delivered_cencle_option('${element.id}', this.value)">
                                                            <option selected disabled>Open this select menu</option>
                                                            <option class='ship_value' value="1">Shipped</option>
                                                            <option class='cenceled_value' value="2">Canceled</option>
                                                            <option class='delivered_value' value="3">Delivered</option>
                                                            <option class="pen_value" value="4">Pending</option>
                                                        </select>
                                                            
                                </td>
            
            
            `
            parent.appendChild(tr)


        });

        document.getElementById('oder_ocut').innerText = `Total Oder: ${oder_count}`
        document.getElementById('pending_Count').innerText = `Pending: ${pending_count}`
        document.getElementById('delivered_count').innerText = `Delivered: ${deliverd_count}`
        document.getElementById('shiped_COunt').innerText = `Shiped: ${shiped_count}`

    }

}

const Delete_order = (id) => {


    fetch(`http://127.0.0.1:8000/order/?order_id_del=${id}`, {
        method: "DELETE"
    })
        .then((res) => {
            document.getElementById('order_delete_msg').innerText = `${id}th Number Oder Removed!`
        })
    document.getElementById('order_delete_msg').innerText = ""
}


const ship_delivered_cencle_option = (id, value) => {
    let val = ''

    if (value === '1') {
        val = 'Shipped'
    }
    else if (value === '2') {
        val = 'Canceled'
    }
    else if (value === '3') {
        val = 'Delivered'
    }
    else {
        val = 'Pending'
    }


    fetch(`http://127.0.0.1:8000/oderPut/${id}/`)
        .then((res) => res.json())
        .then((data) => {


            obj_create = {
                id: id,
                status: val,
                total_price: data.total_price,
                zila: data.zila,
                upzila: data.upzila,
                shipping_address: data.shipping_address,
                quantity: data.quantity,
                phone: data.phone,
                user: data.user,
                product: data.product
            }
            fetch(`http://127.0.0.1:8000/oderPut/${id}/`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(obj_create)
            })
                .then((res) => res.json())

        })
}


const BrandPostAdmin = (event) => {

    event.preventDefault()
    const form = document.getElementById('cetagory_form')

    const formdata = new FormData(form)

    let value_for_select = ''


    if ('1' === formdata.get('select_value')) {
        value_for_select = 'Shirt'
    }
    else if (formdata.get('select_value') === '2') {

        value_for_select = 'Saree'

    }
    else if (formdata.get('select_value') === '3') {
        value_for_select = 'Geans'
    }
    else if ('4' === formdata.get('select_value')) {
        value_for_select = 'Football'
    }
    else if ('5' === formdata.get('select_value')) {
        value_for_select = 'Powder'
    }
    else if ('6' === formdata.get('select_value')) {
        value_for_select = 'Cricket Bat'
    }
    else {
        value_for_select = 'Watch'
    }

    const obj_crate = {

        cetagorytype: value_for_select,
        name: formdata.get('input_cetagory')
    }


    fetch('http://127.0.0.1:8000/cetagorypost/', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj_crate)
    })
        .then((res) => {
            res.json(),

                document.getElementById('cetagory_selection').value = '1',
                document.getElementById('cetagory_input').value = ""
            document.getElementById('cetagory_form_success').innerText = `Cetagory Type : ${value_for_select} Name:${formdata.get('input_cetagory')}`
        })
        .then((data) => {

        })
    document.getElementById('cetagory_form_success').innerText = ""
}


const AllCetagoryLoadAdmin = () => {

    fetch('http://127.0.0.1:8000/cetagorypost/')
        .then((res) => res.json())
        .then((data) => {

            displaycetagory(data)
        })
}

const displaycetagory = (data) => {


    data.forEach(element => {


        const parent = document.getElementById('all_cetagory')
        var li = document.createElement('li')
        li.classList.add("list-group-item")


        li.innerHTML = `

            <div class="d-flex justify-content-between all_cetagory_show align-items-center">

                    <div>

                            <div class='d-flex gap-2'>
                                <h6 class="text_allcetagory">Choice:</h6>
                                <p>${element.cetagorytype}</p>
                            </div>

                            <div class='d-flex gap-2 text_allcetagory'>
                                <h6>Name:</h6>
                                <p>${element.name}</p>
                            </div>

                    </div>


                    <div>

                        <button type="button" class="btn cetagory_edit_button" data-bs-toggle="modal" data-bs-target="#cetagory_edit_mdl">
                            <i onclick="CatchCetagoryidchoice('${element.id}','${element.cetagorytype}','${element.name}')" class="fa-regular fa-pen-to-square fa-xl" style="color: #7889a5;"></i>
                    </button>

                            

                            <i  onclick="DeleteCetagory('${element.id}')" class="m-1 fa-solid fa-trash delete_icon_cetagory" style="color:rgb(136, 144, 156);"></i>

                    </div>
            </div>
            
        
        `
        parent.appendChild(li)
    })
}

AllCetagoryLoadAdmin()


const BrandFormPost = (event) => {
    event.preventDefault()
    const form = document.getElementById('brand_form')

    const formdata = new FormData(form)
    let value_for_cetagory = ''
    if ('1' === formdata.get('select_value')) {
        value_for_cetagory = 'geans'
    }
    else if (formdata.get('select_value') === '2') {

        value_for_cetagory = 'jacket'

    }
    else if (formdata.get('select_value') === '3') {
        value_for_cetagory = 'Saree'
    }
    else if ('4' === formdata.get('select_value')) {
        value_for_cetagory = 'Shirt'
    }
    else if ('5' === formdata.get('select_value')) {
        value_for_cetagory = 'Watch'
    }
    else if ('6' === formdata.get('select_value')) {
        value_for_cetagory = 'Cricket Bat'
    }
    else {
        value_for_cetagory = 'Football'
    }



    obj_crate_ceta = {

        choice: value_for_cetagory,
        name: formdata.get('input_brand')

    }



    fetch('http://127.0.0.1:8000/brandpost/', {
        method: "POST",
        headers: { "Content-type": 'application/json' },
        body: JSON.stringify(obj_crate_ceta)
    })
        .then((res) => {
            res.json(),
                document.getElementById('brand_form_success').innerText = `Type: ${value_for_cetagory} And  Name: ${formdata.get('input_brand')}`,
                document.getElementById('brand_selection').value = "1",
                document.getElementById('input_brand').value = ""
        })
    document.getElementById('brand_form_success').innerText = ""


}

const DisplayAllBrandName = () => {
    fetch('http://127.0.0.1:8000/brandpost/')
        .then((res) => res.json())
        .then((data) => {


            data.forEach(element => {
                const parent = document.getElementById('all_brand')
                var li = document.createElement('li')
                li.classList.add("list-group-item")
                li.innerHTML = `

            <div class="all_brand_show d-flex justify-content-between">

                
                

                <div>

                        <div class='d-flex gap-2'>
                            <h6 class="text_allcetagory">Choice:</h6>
                            <p>${element.choice}</p>
                            
                    </div>

                    <div class='d-flex gap-2 text_allcetagory'>
                            <h6>Name:</h6>
                            <p>${element.name}</p>
                    </div>

                </div>


                <div>

                    
                    <i onclick="brandDelete('${element.id}')"  class="fa-solid fa-trash fa-lg del_icon_colour" style="color:rgb(64, 113, 112);"></i>

                    <button onclick="brandnameEditFunction('${element.id}','${element.choice}','${element.name}')" class=" edit_brand_btn" data-bs-target="#exampleModalToggle" data-bs-toggle="modal"><i class="fa-solid fa-pen-to-square fa-fade" style="color: #c7b8bf;"></i></button>
                </div>
            
            </div>
            
        
        `
                parent.appendChild(li)


            })
        })
}

DisplayAllBrandName()


const brandDelete = (id) => {


    fetch(`http://127.0.0.1:8000/brandPutDelte/${id}/`, {
        method: "DELETE"
    })
        .then((res) => {
            res.json(),
                document.getElementById('delete_brand').innerText = `Deleted Successfully!`
        })
    document.getElementById('delete_brand').innerText = ""
}


const colourDisplay = () => {


    fetch('http://127.0.0.1:8000/colourpost/')
        .then((res) => res.json())
        .then((data) => {

            data.forEach(element => {

                const parent = document.getElementById('colour_display_container')

                const div = document.createElement('div')
                div.classList.add('colour_box')
                div.classList.add('mt-2')

                div.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">

                <h6>colour Name: ${element.colour_name}</h6>

                    <div class="d-flex gap-5 align-items-center">
                        <i onclick="DeleteColour('${element.id}','${element.colour_name}')"  class="fa-solid fa-trash fa-lg del_icon_colour" style="color: #cbd0d8;"></i>


                        
                        
                            <a onclick="Editcolour('${element.id}','${element.colour_name}')" href="" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                data-bs-whatever="@mdo"><i  class="fa-regular fa-pen-to-square" style="color: #afb8c0;"></i>
                            </a>
                    </div>
            
                </div>
            
            `
                parent.appendChild(div)
            })
        })
}

colourDisplay()

let colour_id_capture = ''
const Editcolour = (id, name) => {


    document.getElementById('recipient-name').value = `${name}`
    colour_id_capture = `${id}`
}

const EditColourForm = (event) => {

    event.preventDefault()

    const form = document.getElementById('edit_colour_form')
    const formdata = new FormData(form)

    obj = {

        colour_name: formdata.get('edit_value_clr')
    }
    document.getElementById('recipient-name').value = ""


    fetch(`http://127.0.0.1:8000/deletecolourput/${colour_id_capture}/`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json(),
                colour_id_capture = ''
            document.getElementById('colour_edit_success').innerText = `Update Colour : ${formdata.get('edit_value_clr')}`
        })
    document.getElementById('colour_edit_success').innerText = ""


}


const ColourPost = (event) => {
    event.preventDefault();

    const form = document.getElementById('colourPostForm')

    const formdata = new FormData(form)

    const obj_create_for_clour = {

        colour_name: formdata.get('colour')
    }

    document.getElementById('colour_inpt').value = ""

    fetch('http://127.0.0.1:8000/colourpost/', {
        method: "POST",
        headers: { "Content-type": 'application/json' },
        body: JSON.stringify(obj_create_for_clour)
    })
        .then((res) => {
            res.json(),
                document.getElementById('colour_name_success').innerText = `Colour Name:${formdata.get('colour')} Added`

        })
    document.getElementById('colour_name_success').innerText = ""
}

const DeleteColour = (id, name) => {


    fetch(`http://127.0.0.1:8000/deletecolourput/${id}/`, {
        method: "DELETE"
    })
        .then((res) => {
            document.getElementById('colour_delte').innerText = `colour : ${name} Deleted`
        })
    document.getElementById('colour_delte').innerText = ""
}


const brandnameEditFunction = (id, choice, name) => {


    const parent = document.getElementById('model_1_brandEdit')

    parent.innerHTML = `
                        <h6>Hello Admin , You Can Edit Brand Name.</h6>
                            <p>Choice:${choice}</p>
                            <p>Name: ${name}</p>

                        <h6>Are You Sure!</h6>

                        <div class="modal-footer">
                            <button onclick="modaL_2_brandEdit('${id}','${name}','${choice}')" class="btn btn-primary" data-bs-target="#exampleModalToggle2"
                                data-bs-toggle="modal">Next</button>
                        </div>
    
    `


}


let brand_name_id = ''
let choice_brand = ''
const modaL_2_brandEdit = (id, name, choice) => {


    brand_name_id = `${id}`
    choice_brand = `${choice}`
    document.getElementById('brand_name_edit').value = name



}



const BrandNameUpdate = (event) => {

    document.getElementById('brand_edit_succss').innerText = ""
    event.preventDefault();
    const form = document.getElementById('brand_name_update_form')

    const formdata = new FormData(form)

    obj =
    {
        id: parseInt(brand_name_id),
        choice: choice_brand,
        name: formdata.get('brand_name_update')
    }




    fetch(`http://127.0.0.1:8000/brandPutDelte/${brand_name_id}/`, {
        method: "PUT",
        headers: { "Content-type": 'application/json' },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json(),
                //     choice_brand = ""
                // brand_name_id = ""
                document.getElementById('brand_name_edit').value = ""
            document.getElementById('brand_edit_succss').innerText = ` Brand Name Update`
        })



}



const countryPost = (event) => {
    event.preventDefault();

    const form = document.getElementById('country_form')

    const formdata = new FormData(form)

    obj = {

        country_name: formdata.get('country_name')
    }



    fetch('http://127.0.0.1:8000/courntrypost/', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json(),
                document.getElementById('country_seccess').innerText = `${formdata.get('country_name')} post done!`

        })
    document.getElementById('country_name_input').value = ""
    document.getElementById('country_seccess').innerText = ""


}

const AllcountryNameDisplay = () => {

    fetch('http://127.0.0.1:8000/courntrypost/')
        .then((res) => res.json())
        .then((data) => {

            data.forEach(element => {

                const parent = document.getElementById('country_box_display')

                const div = document.createElement('div')
                div.classList.add('mt-3')

                div.innerHTML = `
            
                    <div
                        class="d-flex justify-content-between align-items-center box_of_country_name-icon">

                                        <h6>Country Name: ${element.country_name}</h6>

                                        <div class="d-flex gap-5 align-items-center">

                                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#country_model">
                                                <i  onclick="PutCountry('${element.id}','${element.country_name}')" class="edit_country_Icon fa-regular fa-pen-to-square fa-xl" style="color: #a2a7ae;"></i>
                                        </button>
                                        
                                            <i onclick="DeleteCountryName('${element.id}')" class="delete_icon_country fa-solid fa-trash" style="color: #acb5c3;"></i>
                                        </div>
                    </div>
            `
                parent.appendChild(div)
            })
        })
}

AllcountryNameDisplay()


const DeleteCountryName = (id) => {


    fetch(`http://127.0.0.1:8000/countryPutDelet/${id}/`, {
        method: "DELETE"
    })
        .then((res) => {
            res.json(),
                document.getElementById('country_delete_msg').innerText = `Delete successfullly!`
        })
    document.getElementById('country_delete_msg').innerText = ""
}

let country_updteid = ''
const PutCountry = (id, name) => {


    country_updteid = `${id}`

    document.getElementById('update_countryiinput').value = `${name}`


}


const PutCountryForm = (event) => {
    event.preventDefault();


    const form = document.getElementById('country_form_update')

    const formdata = new FormData(form)

    obj = {


        country_name: formdata.get('update_country_name')
    }


    fetch(`http://127.0.0.1:8000/countryPutDelet/${country_updteid}/`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json()
            document.getElementById('update_country').innerText = `Update country Name ${formdata.get('update_country_name')}`
        })
    document.getElementById('update_countryiinput').value = ""
    document.getElementById('update_country').innerText = ""
}




let cetagory_id_edit = ''
let cetagory_type = ''
const CatchCetagoryidchoice = (id, type, name) => {

    cetagory_id_edit = `${id}`
    cetagory_type = `${type}`
    document.getElementById('cetagory_input_bvalue').value = `${name}`
}



const EditCetagoryName = (event) => {
    event.preventDefault();

    const form = document.getElementById('cetagory_edit_form')

    const formdata = new FormData(form)




    obj = {

        cetagorytype: cetagory_type,
        name: formdata.get('cetagory_input_value_name')

    }

    fetch(`http://127.0.0.1:8000/cetagoryputdelete/${cetagory_id_edit}/`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => {

            res.json(),
                document.getElementById('cetagory_eidt_succcsess').innerText = `Edit Successfully!`

        })
    document.getElementById('cetagory_input_bvalue').value = ""
    document.getElementById('cetagory_eidt_succcsess').innerText = ""
}


const DeleteCetagory = (id) => {

    fetch(`http://127.0.0.1:8000/cetagoryputdelete/${id}/`, {
        method: "DELETE"
    })
        .then((res) => {
            res.json(),
                document.getElementById('delete_msg_ceta').innerText = 'Deleted Successfully!'
        })
    document.getElementById('delete_msg_ceta').innerText = ""
}

const AllteamLoaded = () => {

    fetch('http://127.0.0.1:8000/allteam/')
        .then((res) => res.json())
        .then((data) => {

            data.forEach(element => {

                const parent = document.getElementById('all_team')
                const div = document.createElement('div')
                div.innerHTML =
                    `
            
                <div class="d-flex justify-content-between mt-2 team_name_and_edit_option">

                                        <p>Name: ${element.name}</p>
    
                                        <div class="d-flex gap-4 align-items-center">

                                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#teameditmodal">
                                                        <i onclick="TeamNameEdit('${element.id}','${element.name}')"  class="fa-regular fa-pen-to-square fa-xl" style="color: #949aa4;"></i>
                                            </button>
                                            
                                            <i onclick="TeamNameDelete('${element.id}')" class="fa-solid fa-trash team_name_delete_icn fa-xl" style="color: #8c94a1;"></i>
                                        </div>
                                    </div>
            
            
            
            `
                parent.appendChild(div)
            })
        })
}

AllteamLoaded()


let TeamEdit_id = ''
const TeamNameEdit = (id, name) => {

    document.getElementById('edit_name_team').value = `${name}`
    TeamEdit_id = `${id}`

}


const UpdateEditFunction = (event) => {

    event.preventDefault();
    const form = document.getElementById('team_edit_form')

    const fomrdata = new FormData(form)

    const obj = {
        name: fomrdata.get('updatenameteam')
    }
    document.getElementById('edit_name_team').value = ""

    fetch(`http://127.0.0.1:8000/teamputdelte/${TeamEdit_id}/`, {
        method: "PUT",
        headers: { "Content-type": 'application/json' },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json(),
                document.getElementById('success_team_edit').innerText = `Team Name: ${fomrdata.get('updatenameteam')} update`
        })
    document.getElementById('success_team_edit').innerText = ''
}

const TeamNamePOst = (event) => {

    event.preventDefault();
    const form = document.getElementById('team_form')

    const formdata = new FormData(form)

    obj = {

        name: formdata.get('team_name_value')
    }
    document.getElementById("team_nameInput").value = ""


    fetch('http://127.0.0.1:8000/allteam/', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json(),
                document.getElementById('team_name_Post_done').innerText = `Team Name:${formdata.get('team_name_value')} Post Done`

        })
    document.getElementById('team_name_Post_done').innerText = ""
}


const TeamNameDelete = (id) => {

    fetch(`http://127.0.0.1:8000/teamputdelte/${id}/`, {
        method: "DELETE"
    })
        .then((res) => {

            document.getElementById('team_name_Post_done').innerText = `Team Name Deleted`
        })
    document.getElementById('team_name_Post_done').innerText = ""
}






const CaptureDate = (event) => {
    event.preventDefault()

    const date_time = document.getElementById('date_input').value
    const end_time = document.getElementById('end_input').value



    fetch(`http://127.0.0.1:8000/oder_filter/?date_oder=${date_time}&end_date=${end_time}`)
        .then((res) => res.json())
        .then((data) => {
            DisplayAlloderList(data)
        })
}



const AllMEtarials = () => {


    fetch('http://127.0.0.1:8000/mainmetarials/')
        .then((res) => res.json())
        .then((data) => {
            data.forEach(element => {


                const parent = document.getElementById('meta_box_bd')

                const div = document.createElement('div')

                div.innerHTML = `
        
                    <div class="d-flex justify-content-between align-items-center text_and_icon_box_meta m-2">

                                            <div class="text_box">
                                                <h5>Type: ${element.choice_option}</h5>
                                                <p>Name: ${element.name}</p>
                                            </div>

                                            <div class="icon_box d-flex justify-content-between gap-3 align-items-center">

                                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#meta_edit">
                                            <i onclick="meta_define_modal('${element.id}','${element.name}','${element.choice_option}')" class="fa-solid fa-pen-to-square fa-xl" style="color: #7d8087;"></i>
                                    </button>
                                                
                                                <i onclick="DelMeta('${element.id}')" class="fa-solid fa-trash fa-xl del_meta" style="color: #8c9097;"></i>
                                            </div>
                                        </div>
        
        
        
        
        `
                parent.appendChild(div)
            })
        })
}
AllMEtarials()

const MetarialPostForm = (event) => {

    event.preventDefault();

    const form = document.getElementById('metarial_form')

    const formdata = new FormData(form)

    const select_value_option = document.getElementById('main_meta_selection')

    const input_value_of_meta = document.getElementById('input_meta').value

    let value_for_meta = ''
    if ('1' === select_value_option.value) {
        value_for_meta = 'jacket'
    }
    else if (select_value_option.value === '2') {

        value_for_meta = 'Bat'

    }
    else if (select_value_option.value === '3') {
        value_for_meta = 'jursey'
    }
    else if ('4' === select_value_option.value) {
        value_for_meta = 'geans'
    }
    else if ('5' === select_value_option.value) {
        value_for_meta = 'watch'
    }
    else if ('6' === select_value_option.value) {
        value_for_meta = 'Saree'
    }
    else {
        value_for_meta = 'Football'
    }
    document.getElementById('input_meta').value = ""

    obj = {
        choice_option: value_for_meta,
        name: input_value_of_meta
    }


    fetch('http://127.0.0.1:8000/mainmetarials/', {
        method: "POST",
        headers: { "Content-type": 'application/json' },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json(),
                document.getElementById('succ_meta').innerText = `Metarial Post done`

        })
    document.getElementById('succ_meta').innerText = ""


}


let meta_id = ''
let meta_choice = ''
const meta_define_modal = (id, name, choice) => {
    meta_id = `${id}`
    meta_choice = `${choice}`
    document.getElementById('meta_input_eidt').value = `${name}`
}



const editdelmetaform = (event) => {

    event.preventDefault();

    const val_meta = document.getElementById('meta_input_eidt').value

    const obj = {
        choice_option: meta_choice,
        name: val_meta
    }

    document.getElementById('meta_input_eidt').value = ""


    fetch(`http://127.0.0.1:8000/editdeletemeta/${meta_id}/`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => {

            res.json(),
                document.getElementById('meta_edit_dne').innerText = ` update Done`
        })
    document.getElementById('meta_edit_dne').innerText = ""
}

const DelMeta = (id) => {


    fetch(`http://127.0.0.1:8000/editdeletemeta/${id}/`, {
        method: "DELETE"
    })
        .then((res) => {
            res.json(),
                document.getElementById('del_succ').innerText = 'Delete Done'
        })
    document.getElementById('del_succ').innerText = ""


}


const DisplayVersion = () => {


    fetch('http://127.0.0.1:8000/versionpost/')
        .then((res) => res.json())
        .then((data) => {


            data.forEach(element => {



                const parent = document.getElementById('version_Div_of_parent')

                const div = document.createElement('div')

                div.innerHTML = `
            
                <div class="d-flex justify-content-between align-items-center gap-3 version_parent_div m-2">

                                    <h6>Verison Name: <b>${element.name}</b></h6>

                                    <div class="d-flex gap-5 align-items-center">
                                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#version_modal">
                                            <i onclick="InputValueEditVersion('${element.id}','${element.name}')" class="fa-regular fa-pen-to-square fa-xl"></i>
                                        </button>
                                        
                                        <div>
                                        <i onclick="DeleteVersion('${element.id}')" class="fa-solid fa-trash fa-xl del_versin"></i>
                                        </div>
                                    </div>

                                </div>
            
            `
                parent.appendChild(div)
            })
        })
}

const DeleteVersion = (id) => {

    fetch(`http://127.0.0.1:8000/versionputdelete/${id}/`, {
        method: "DELETE"
    })
        .then((res) => {
            res.json(),
                document.getElementById('success_edit_version').innerText = `Delete Done!`

        })
    document.getElementById('success_edit_version').innerText = ""


}


DisplayVersion()

let version_id_edit = ''
const InputValueEditVersion = (id, name) => {

    document.getElementById('edit_input_tag').value = `${name}`
    version_id_edit = `${id}`


}

const EditVersionFunction = () => {



    obj = {


        name: document.getElementById('edit_input_tag').value

    }
    console.log(obj)

    fetch(`http://127.0.0.1:8000/versionputdelete/${version_id_edit}/`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json(),
                document.getElementById('success_edit_version').innerText = `Name: ${document.getElementById('edit_input_tag').value} Edited!`
        })
    document.getElementById('success_edit_version').innerText = ""
}
const PostVersion = (event) => {

    event.preventDefault();

    const form = document.getElementById('version_form')
    const form_data = new FormData(form)

    obj = {
        name: form_data.get('post_input')
    }

    fetch('http://127.0.0.1:8000/versionpost/', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json(),
                document.getElementById('post_versin_p').innerText = "Post Successfull!"
        })
    document.getElementById('post_versin_p').innerText = ""
}

let jacket_type_id = ''
const jacket_input_value_set = (id, name) => {

    console.log(id, name)
    document.getElementById('jac_update_name').value = name
    jacket_type_id = `${id}`
}

const DisplayAllTypeOfJacket = () => {

    fetch('http://127.0.0.1:8000/TypeOfjaceketPost/')
        .then((res) => res.json())
        .then((data) => {

            console.log(data)

            data.forEach(element => {

                const parent = document.getElementById('All_data_type_jactket')

                const div = document.createElement('div')

                div.innerHTML = `
            
                                        <div class="d-flex justify-content-center align-items-center justify-content-between p-2 white_div_jackter_display">
                                            <h4>Type: ${element.name}</h4>
                                            <div class="d-flex gap-3 justify-content-center align-items-center">
                                                <div>
                                                <button type="button"   class="btn" data-bs-toggle="modal" data-bs-target="#Jacket_modal">
                                                    <i  onclick="jacket_input_value_set('${element.id}','${element.name}')" class="fa-solid fa-pen-to-square fa-xl"></i>
                                                </button>

                                                
                                                
                                                </div>
                                                <div>
                                                    <i onclick="DeleteJacket('${element.id}')" class="fa-solid fa-trash fa-xl del_jac"></i>
                                                </div>
                                            </div>
                                        </div>
            
            
            
            `
                parent.appendChild(div)
            })
        })
}

DisplayAllTypeOfJacket()



const DeleteJacket = (id) => {

    fetch(`http://127.0.0.1:8000/JacketPutDelete/${id}/`, {
        method: "DELETE"
    })
        .then((res) => {
            res.json(),
                document.getElementById('success_del_jac').innerText = "Successfully Deleted!"

        })
    document.getElementById('success_del_jac').innerText = ""

}

const UpdateJacketType = () => {

    obj = {
        id: jacket_type_id,
        name: document.getElementById('jac_update_name').value
    }


    console.log(obj)


    fetch(`http://127.0.0.1:8000/JacketPutDelete/${jacket_type_id}/`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json(),
                document.getElementById('success_edit_jac').innerText = `Update Done!`

        })
    document.getElementById('success_edit_jac').innerText = ""
    document.getElementById('jac_update_name').value = ""


}




const JacketTypePost = (event) => {
    event.preventDefault();

    const form = document.getElementById('fomr_type_jacket')

    const formdata = new FormData(form)
    const obj = {

        name: formdata.get('jacket_input')
    }

    document.getElementById('jacket_input').value = ""

    fetch('http://127.0.0.1:8000/TypeOfjaceketPost/', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json(),
                document.getElementById('post_jackter').innerText = `Name: ${formdata.get('jacket_input')} Added!`
        })
    document.getElementById('post_jackter').innerText = ""

}


const AllReangeOfPrice = () => {

    fetch('http://127.0.0.1:8000/range_of_price/')
        .then((res) => res.json())
        .then((data) => {

            console.log(data)

            data.forEach(element => {

                const parent = document.getElementById('AllRangeOFprice_box')
                const div = document.createElement('div')
                div.classList.add('Football_all_data')

                div.innerHTML = `
            
                                    <h5>Amount: ${element.price_name}</h5>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <p>
                                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#AMOUNT_MODAL">
                                        <i onclick="SetAmountNameinField('${element.id}','${element.price_name}')"  class="fa-solid fa-pen-to-square fa-xl"></i>
                                        </button>
                                        
                                        </p>
                                        <p>
                                        <i onclick="DeletTkamount('${element.id}')" class="fa-solid fa-trash fa-xl del_btn_aoumt"></i>
                                        </p>
                                    </div>
            
            `
                parent.appendChild(div)
            })
        })
}

AllReangeOfPrice()


let Edit_id_amount = ''
const SetAmountNameinField = (id, name) => {
    console.log(id, name)

    document.getElementById('edit_amnount').value = `${name}`
    Edit_id_amount = `${id}`

}


const EditAmountRange = (event) => {
    event.preventDefault()
    const val = document.getElementById('edit_amnount').value
    const obj = {
        price_name: val
    }

    console.log(obj)
    // http://127.0.0.1:8000/RangePriceDeletePut/3/
    fetch(`http://127.0.0.1:8000/RangePriceDeletePut/${Edit_id_amount}/`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json(),
                document.getElementById('edit_amnout_dne').innerText = "Edited!"
        })
    document.getElementById('edit_amnout_dne').innerText = ""
    document.getElementById('edit_amnount').value = ""
}

const DeletTkamount = (id) => {

    fetch(`http://127.0.0.1:8000/RangePriceDeletePut/${id}/`, {
        method: "DELETE"
    })
        .then((res) => {
            res.json(),
                document.getElementById('del_amnout_dne').innerText = "Deleted!"
        })
    document.getElementById('del_amnout_dne').innerText = ""
}

const POstRangeOFprice = (event) => {

    event.preventDefault();

    const form = document.getElementById('amount_form')
    const form_data = new FormData(form)
    const obj = {
        price_name: form_data.get('amount')
    }

    fetch(`http://127.0.0.1:8000/range_of_price/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json(),
                document.getElementById('tk_success').innerText = "POST Successfully!"
        })
    document.getElementById('amount_input').value = ""
    document.getElementById('tk_success').innerText = ""
    console.log(obj)
}


const AllMovementWacth = () => {


    fetch('http://127.0.0.1:8000/MoveMentWatchPostGEt/')
        .then((res) => res.json())
        .then((data) => {


            data.forEach(element => {


                const parent = document.getElementById('All_Movement_List')
                const div = document.createElement('div')
                div.innerHTML = `
            
                        <div class="d-flex justify-content-center align-items-center gap-4 p-2">
                                            <p>Name: ${element.title}</p>

                                            <div class="d-flex justify-content-between justify-content-center align-items-center gap-3">
                                                <p>
                                                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#edit_move_ment">
                                                        <i onclick="EditMovementWatch('${element.id}','${element.title}')" class="fa-solid fa-pen-to-square fa-xl"></i>
                                                </button>
                                                

                                                </p>
                                                <p>
                                                <i onclick="DeleteMovementWatch('${element.id}')" class="fa-solid fa-trash fa-xl move_del"></i>
                                                </p>
                                            </div>

                                        </div>
            
            
            
            
            
            `
                parent.appendChild(div)
            })
        })
}

AllMovementWacth()


const FormPOSTwacthEnv = (event) => {

    event.preventDefault();

    const val = document.getElementById('name_movement').value
    const obj = {
        title: val
    }
    document.getElementById('name_movement').value = ""

    fetch('http://127.0.0.1:8000/MoveMentWatchPostGEt/', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json(),
                document.getElementById('success_post_move').innerText = "Successfully Done!"

        })
    document.getElementById('success_post_move').innerText = ""
    console.log(obj)
}

let edit_movement_watch_id = ''
const EditMovementWatch = (id, name) => {

    edit_movement_watch_id = id
    document.getElementById('move_edit_watch').value = name
}

const PutFunMovementWatch = () => {

    const obj = {
        title: document.getElementById('move_edit_watch').value
    }
    console.log(obj)

    fetch(`http://127.0.0.1:8000/MoveMentPutDelApivew/${edit_movement_watch_id}/`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(obj)
    })
        .then((res) => {
            res.json(),
                document.getElementById('move_edited').innerText = "Update Done!"
        })
    document.getElementById('move_edit_watch').value = ""
    document.getElementById('move_edited').innerText = ""
}

const DeleteMovementWatch = (id) => {


    fetch(`http://127.0.0.1:8000/MoveMentPutDelApivew/${id}/`, {
        method: "DELETE"
    })
        .then((res) => {
            res.json(),
                document.getElementById('success_post_move').innerText = "Deleted"
        })
    document.getElementById('success_post_move').innerText = ""
}

const AllSizeDisplay = () => {

    fetch('http://127.0.0.1:8000/SizeApiView/')
        .then((res) => res.json())
        .then((data) => {

            data.forEach(element => {


                const parent = document.getElementById('size_body')
                const div = document.createElement('div')
                div.innerHTML = `
                    <div class="size_div  d-flex justify-content-between p-2 m-2">
                                    <div class="d-flex justify-content-center align-items-center gap-3">
                                        <p>Type: ${element.choice_size}</p>
                                        <p>Name: ${element.size_name}</p>
                                    </div>
                                    <div class="d-flex justify-content-center align-items-center gap-3">
                                        <p><i class="fa-solid fa-pen-to-square fa-xl"></i></p>
                                        <p><i class="fa-solid fa-trash fa-xl"></i></p>
                                    </div>
                                </div>
            `
                parent.appendChild(div)
            })
        })
}
AllSizeDisplay()



const PostSizeFunction = (event) => {
    event.preventDefault()

    const option_value = document.getElementById('size_option').value
    const val = document.getElementById('size_name_post').value
    console.log(val,option_value)
    const obj = {
        choice_size: option_value,
        size_name: val

    }
    console.log(obj)
    document.getElementById('size_name_post').value=""
    document.getElementById('size_option').value="Open this select menu"
    // http://127.0.0.1:8000/SizeApiView/
    fetch('http://127.0.0.1:8000/SizeApiView/',{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(obj)
    })
    .then((res) =>{
        res.json(),
        document.getElementById('post_size_suc').innerText="POST SUCCESSFULLY!"
    })
    document.getElementById('post_size_suc').innerText=""
}