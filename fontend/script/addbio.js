const token = localStorage.getItem('token')
const bio_data = document.getElementById('textarea_data');
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
            const {bio} = response_data.profile;
            bio_data.value = bio?bio:'Add bio'
        }
    } catch (error) {
        console.log(error);
    }
}
profile_data();
const addbioFunction = async(e) => {
    e.preventDefault();
    try{
        const url = 'http://localhost:4240/api/chatserver/user/add-bio';
        const response = await fetch(url,{
            method:'PUT',
            headers:{
                'Content-type':'application/json',
                'token':token
            },
            body:JSON.stringify({
                bio:bio_data.value
            })
        })
        const response_data = await response.json();
        console.log(response_data)
        if(response_data.status){
            location.replace('index.html');
        }
    }catch(error){
        console.log(error);
    }
}
document.getElementById('bio-submit').addEventListener('click', addbioFunction);