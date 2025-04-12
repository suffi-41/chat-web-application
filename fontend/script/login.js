const token = localStorage.getItem('token');
if(token){
    location.replace('index.html');
}
const username = document.getElementById('login-username');
const password = document.getElementById('login-password');
const submit = document.getElementById('login-submit')

const login_data_submit = async(event) => {
    event.preventDefault();
    try{
        const url = 'http://localhost:4240/api/chatserver/user/login';
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                username:username.value,
                password:password.value
            })
        })
        const response_data = await response.json();
        console.log(response_data)
        if(response_data.status){
            localStorage.setItem('token', response_data.token);
            console.log(response_data.message);
            location.replace('index.html');
        }else{
            location.replace('login.html');
        }
    }catch(error){
        console.log(error);
    }
}
submit.addEventListener('click', login_data_submit);




