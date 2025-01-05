

const register = (event) => {
    event.preventDefault()

    const form = document.getElementById('form_register')


    const Form_Data = new FormData(form)

    const user_Data = {
        username: Form_Data.get('username'),
        first_name: Form_Data.get('first_name'),
        last_name: Form_Data.get('last_name'),
        email: Form_Data.get('email'),
        password: Form_Data.get('password'),
        confirm_password: Form_Data.get('confirm_password')
    }

    console.log(user_Data)


    if (user_Data.password == user_Data.confirm_password) {

        // document.getElementById('error').innerText = ''



        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`|-]).{8,}$/.test(user_Data.password)) {


            fetch('http://127.0.0.1:8000/register/', {
                method: "POST",
                headers: { "Content-type": 'application/json' },
                body: JSON.stringify(user_Data)
            })
                .then((res) => res.json())
                .then((data) => {
                    document.getElementById('email_text').innerText = 'Check Your Email!'

                })

        }
        else {
            document.getElementById('validation').innerText = "password must be lowercase letters, uppercase letters, and special characters, and it ensures that the total length is at least 8 characters"
        }


    }
    else {
        document.getElementById('error').innerText = 'Password and Confirm Password not Match'
        alert('Password and Confirm Password not Match')
    }





    document.getElementById('username').value = ""
    document.getElementById('first_name').value = ""
    document.getElementById('last_name').value = ""
    document.getElementById('password').value = ""
    document.getElementById('confirm_password').value = ""
    document.getElementById('email').value = ""


}