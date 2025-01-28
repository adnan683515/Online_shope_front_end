
const pass_word_cng = (event) => {
    event.preventDefault()

    const form = document.getElementById('form_pass')
    const form_data = new FormData(form)
    obj =
    {
        new_password: form_data.get('new_pass'),
        confirm_password: form_data.get('con_pass')
    }

    if (obj.new_password != obj.confirm_password) {
        document.getElementById('wrong').innerText = "Password Does'not match!"
        return
    }
    document.getElementById('new_pass').value = ""
    document.getElementById('con_pass').value = ""

    const token = localStorage.getItem('Token')

    fetch('http://127.0.0.1:8000/pass/', {
        method: "POST",
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then((res) =>{
        res.json(),
        document.getElementById('suc').innerText="Password Update Successfully!"
    })
    document.getElementById('suc').innerText=""
    // http://127.0.0.1:8000/pass/

}