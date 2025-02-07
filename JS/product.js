const DisplayAllBrandName_product = () => {
    fetch('http://127.0.0.1:8000/brandpost/')
        .then((res) => res.json())
        .then((data) => {


            data.forEach(element => {


                const parent = document.getElementById('brand_option')
                const op = document.createElement('option')
                op.value = `${element.id}`
                op.innerText = `${element.name}`
                parent.appendChild(op)


            })
        })
}
DisplayAllBrandName_product()


const displaycetagory_pro = () => {
    fetch('http://127.0.0.1:8000/cetagorypost/')
        .then((res) => res.json())
        .then((data) => {

            data.forEach(element => {

                const parent = document.getElementById('cetagory_option')
                const op = document.createElement('option')
                op.value = `${element.id}`
                op.innerText = `${element.name}`
                parent.appendChild(op)


            })
        })


}
displaycetagory_pro()




const allPriceoptioin = () => {

    fetch('http://127.0.0.1:8000/range_of_price/')
        .then((res) => res.json())
        .then((data) => {

            console.log(data)

            data.forEach(element => {
                const parent = document.getElementById('price_option')
                const op = document.createElement('option')
                op.value = `${element.id}`
                op.innerText = `${element.price_name}`
                parent.appendChild(op)

            })
        })
}
allPriceoptioin()


const AllteamLoadedproduct = () => {

    fetch('http://127.0.0.1:8000/allteam/')
        .then((res) => res.json())
        .then((data) => {

            data.forEach(element => {

                const parent = document.getElementById('team_option')
                const op = document.createElement('option')
                op.value = `${element.id}`
                op.innerText = `${element.name}`
                parent.appendChild(op)
            })
        })
}

AllteamLoadedproduct()

// version_option

const version_product_display = () => {



    fetch('http://127.0.0.1:8000/versionpost/')
        .then((res) => res.json())
        .then((data) => {


            data.forEach(element => {


                const parent = document.getElementById('version_option')
                const op = document.createElement('option')
                op.value = `${element.id}`
                op.innerText = `${element.name}`
                parent.appendChild(op)


            })
        })
}
version_product_display()


const colourDisplayproduct = () => {


    fetch('http://127.0.0.1:8000/colourpost/')
        .then((res) => res.json())
        .then((data) => {

            data.forEach(element => {


                const parent = document.getElementById('colour_optioin')
                const op = document.createElement('option')
                op.value = `${element.id}`
                op.innerText = `${element.colour_name}`
                parent.appendChild(op)
            })
        })
}

colourDisplayproduct()


const AllcountryNameDisplayproduct = () => {

    fetch('http://127.0.0.1:8000/courntrypost/')
        .then((res) => res.json())
        .then((data) => {

            data.forEach(element => {

                const parent = document.getElementById('country_option')
                const op = document.createElement('option')
                op.value = `${element.id}`
                op.innerText = `${element.country_name}`
                parent.appendChild(op)

            })
        })
}

AllcountryNameDisplayproduct()

const AllMEtarialsproduct = () => {


    fetch('http://127.0.0.1:8000/mainmetarials/')
        .then((res) => res.json())
        .then((data) => {
            data.forEach(element => {

                const parent = document.getElementById('meta_option')
                const op = document.createElement('option')
                op.value = `${element.id}`
                op.innerText = `${element.name}`
                parent.appendChild(op)


            })
        })
}
AllMEtarialsproduct()


const DisplayAllTypeOfJacketproduct = () => {

    fetch('http://127.0.0.1:8000/TypeOfjaceketPost/')
        .then((res) => res.json())
        .then((data) => {

            console.log(data)

            data.forEach(element => {
                const parent = document.getElementById('jac_option')
                const op = document.createElement('option')
                op.value = `${element.id}`
                op.innerText = `${element.name}`
                parent.appendChild(op)
            })
        })
}

DisplayAllTypeOfJacketproduct()


const AllSizeDisplayproduct = () => {

    fetch('http://127.0.0.1:8000/SizeApiView/')
        .then((res) => res.json())
        .then((data) => {

            data.forEach(element => {
                const parent = document.getElementById('size_option')
                const op = document.createElement('option')
                op.value = `${element.id}`
                op.innerText = `${element.size_name}`
                parent.appendChild(op)

            })
        })
}
AllSizeDisplayproduct()


const AllMovementWacthprodcut = () => {


    fetch('http://127.0.0.1:8000/MoveMentWatchPostGEt/')
        .then((res) => res.json())
        .then((data) => {


            data.forEach(element => {
                const parent = document.getElementById('move_option')
                const op = document.createElement('option')
                op.value = `${element.id}`
                op.innerText = `${element.title}`
                parent.appendChild(op)


            })
        })
}

AllMovementWacthprodcut()
const ProductPostFunction = (event) => {
    event.preventDefault();

    const form_data = new FormData();
    const imageInputs = [
        document.getElementById('image_1').files[0],
        document.getElementById('image_2').files[0]
    ];

    let myArray = [];
    let promises = []; // Create an array to store promises
    let index = 0
    imageInputs.forEach((imageInput) => {
        form_data.append('file', imageInput);
        form_data.append('upload_preset', 'online_shope');

        // Store each fetch request as a promise
        const promise = fetch('https://api.cloudinary.com/v1_1/dr9b7k8n7/image/upload', {
            method: 'POST',
            body: form_data
        })
            .then((res) => res.json())
            .then((uploadData) => {
                myArray[index] = uploadData.secure_url;
                index += 1;
            });

        promises.push(promise); // Add the promise to the promises array
    });

    // Wait for all promises to finish before logging the result
    Promise.all(promises)
        .then(() => {
            console.log(myArray);  // Now myArray will be populated correctly
            console.log(myArray[0]); // Should output the first image URL
            console.log(myArray[1]); // Should output the second image URL



            const obj =
            {
                type_your_product: document.getElementById('type_product').value,
                sports_Type: document.getElementById('sports').value,
                product_title: document.getElementById('product_title').value,
                display_image: myArray[0],
                font_image: myArray[1],
                quantity: parseInt(document.getElementById('qantity').value),
                fixed_price: parseFloat(document.getElementById('price').value).toFixed(2),
                description: document.getElementById('des').value,
                abailable: "is stock",
                eyes: 0,
                TypeOFJacket: parseInt(document.getElementById('jac_option').value),
                Brand: parseInt(document.getElementById('brand_option').value),
                cetagory: parseInt(document.getElementById('cetagory_option').value),
                team: parseInt(document.getElementById('team_option').value),
                version: parseInt(document.getElementById('version_option').value),
                range_of_price: parseInt(document.getElementById('price_option').value),
                colour: parseInt(document.getElementById('colour_optioin').value),
                country: parseInt(document.getElementById('country_option').value),
                MainMetariails: parseInt(document.getElementById('meta_option').value),
                size: parseInt(document.getElementById('size_option').value),
                warenty_watch: 1,
                Movement_Watch: parseInt(document.getElementById('move_option').value)
            }

            console.log("object of product", obj)


            fetch(`http://127.0.0.1:8000/productpost/`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(obj)
            })
                .then((res) => res.json())
                .then((data) => {
                    alert("post done"),
                        console.log("Done")
                })

            if (myArray.length === 3) {
                console.log("YES, all 3 images are uploaded!");
            }
        })
        .catch((error) => {
            console.error("Error uploading images:", error);
        });
};




