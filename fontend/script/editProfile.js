const token = localStorage.getItem('token')
let edit_name = document.getElementById('edit-name');
let edit_username = document.getElementById('edit-username');
let edit_email = document.getElementById('edit-email');
let edit_phone = document.getElementById('edit-phone');
let edit_about = document.getElementById('edit-about');
let edit_sumbit = document.getElementById('edit-submit');


const profile_data = async () => {
    try {
        const url = 'http://localhost:4240/api/chatserver/user/profile';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'token': token
            }
        })
        const response_data = await response.json();
        if (response_data.status) {
            const { about, name, username, phone, email} = response_data.profile;
            edit_about.value = about;
            edit_name.value = name;
            edit_username.value = username;
            edit_phone.value = phone ? phone : 'Add phone no';
            edit_email.value = email;
            edit_phone.value = phone;
            
        }
    } catch (error) {
        console.log(error);
    }
}
profile_data();

edit_sumbit.addEventListener('click', async () => {
    try {
        const url = `http://localhost:4240/api/chatserver/user/editProfile`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                name: edit_name.value,
                username: edit_username.value,
                phone:edit_phone.value,
                email: edit_email.value,
                about:edit_about.value
            })
        })
        const response_data = await response.json();
        if (response_data.status) {
            location.replace('index.html');
        }
    } catch (error) {
        console.log(error)
    }
})



