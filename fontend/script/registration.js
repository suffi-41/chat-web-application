const token = localStorage.getItem('token');
if(token){
    location.replace('index.html');
}
const registration_name = document.getElementById('registration-name');
const registration_username = document.getElementById('registration-username');
const registration_email = document.getElementById('registration-email');
const registration_password = document.getElementById('registration-password');
const registration_confirm_password = document.getElementById('registration-confirm-password');
const registration_sumbit = document.getElementById('registration-submit');

const onResitrationFormSubmit = async(e) => {
    e.preventDefault();
    try{
        const url = 'http://localhost:4240/api/chatserver/user/registor';
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                name:registration_name.value,
                username:registration_username.value,
                email:registration_email.value,
                password:registration_password.value,
                confirmPassword:registration_confirm_password.value
            })
        })
        const response_data = await response.json();
        console.log(response_data)
        if(response_data.status){
            localStorage.setItem('token', response_data.token);
            console.log(response_data.message);
            location.replace('index.html');
        }else{
            location.replace('registration.html');
        }
    }catch(error){
        console.log(error);
    }
}
registration_sumbit.addEventListener('click', onResitrationFormSubmit);