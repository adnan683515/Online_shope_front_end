
const login = (event) => {
    event.preventDefault()

    const form = document.getElementById('form_login')


    const formDATA = new FormData(form)

    const login_Obj = {

        username: formDATA.get('username'),
        password: formDATA.get('password')
    }

    document.getElementById('username').value = ""
    document.getElementById('password').value = ""

    fetch('https://online-shope-backend.vercel.app/login', {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(login_Obj)
    })
        .then((res) => {
            if (!res.ok) {
    
                throw new Error("User not valid");
            }
            else {

                return res.json();
            }
        })
        .then((data) => {
            localStorage.setItem('Token', data.token);
            localStorage.setItem('user_id', data.user_id);
    


            window.location.href = 'index.html';
        })
        .catch((error) => {
            // document.getElementById('user-not').innerText = "username or password not valid"
            // alert("Login failed. Please check your credentials and try again.");
        });



}