
const socket = io("http://localhost:3333");
const smsSound = new Audio('happy-pop-2-185287.mp3');

const smstimeInSocket = async () => {
    let current = new Date();
    let minutes = current.getMinutes();
    let hours = current.getHours();
    let date = current.getDate();
    let meridiem = 'AM';
    minutes < 10 ? minutes = `0${minutes}` : minutes = minutes;
    if (current.getDate() === date && hours > 2) {
        if (hours > 12) {
            hours -= 12;
            meridiem = 'PM';
            return `${hours}:${minutes} ${meridiem}`;
        }
        meridiem = 'AM';
        return `${hours}:${minutes} ${meridiem}`;
    }
}

const profile_data_in_socket = async () => {
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
            const { username } = response_data.profile;
            socket.emit('new-user-add', username);
        }
    } catch (error) {
        console.log(error);
    }
}
profile_data_in_socket();

const onlineUser = (data) => {
    let allOnlineUser = ''
    let onineUseContent = document.getElementsByClassName('all-online-user')[0];
    data.forEach(async (element) => {
        allOnlineUser += `<div class="user-profile online-user-details" >
             <img src=${element.userDetails.image}/>
             <small class="online-username">${element.userDetails.username}</small>
         </div>`
    })
    onineUseContent.innerHTML = allOnlineUser;
}

const send_sms = document.getElementById('sms-btn');
const chat_sms_content = document.getElementsByClassName('chat-sms')[0]
const sms = document.getElementById('sender-sms');
const username_chat = document.getElementById('chat_username');
const notification_section = document.getElementsByClassName('notification')[0];

const scrollToBottonSocketIO = () => {
    chat_sms_content.scrollTop = chat_sms_content.scrollHeight;
}

const showNotification = () => {
    notification_section.style.right = '0rem'
    setTimeout(() => {
        notification_section.style.right = '-100rem';
        notification_section.removeChild(notification_section.lastElementChild);
    }, 4000);
}

const notification = (sms, image, sender) => {
    smsSound.play();
    let notification_content = document.createElement('div');
    notification_content.classList.add('notification-content');
    let img = document.createElement('img');
    img.classList.add('chat-user-dp');
    img.src = image;
    let sms_content = document.createElement('div');
    sms_content.classList.add('sms-content');
    let sms_details = document.createElement('div');
    sms_details.classList.add('sms-details');
    let username = document.createElement('div');
    username.innerText = sender;
    let time = document.createElement('small');
    time.innerText = 'Just now';
    let reciver_sms = document.createElement('div');
    reciver_sms.innerText = `Say ${sms}`;

    sms_details.appendChild(username);
    sms_details.appendChild(time);
    sms_content.appendChild(sms_details);
    sms_content.appendChild(reciver_sms);
    notification_content.appendChild(img);
    notification_content.appendChild(sms_content)
    notification_section.appendChild(notification_content);
    showNotification();
}

const reciver_sms_using_socket_io = (sms, image, sender, time) => {
    if (sender !== username_chat.innerText) {
        notification(sms, image, sender);
    } else {
        smsSound.play();
        let span = document.createElement('div');
        span.classList.add('receive-sms');
        span.classList.add('receiver-sms');
        let div = document.createElement('div');
        div.classList.add('sms');
        div.innerHTML = `${sms}<small class="time-content">${time}</small>`;
        let img = document.createElement('img');
        img.classList.add('chat-user-dp');
        img.src = image;
        span.appendChild(img);
        span.appendChild(div);
        chat_sms_content.appendChild(span);
    }
}

const shareFileWithSocketIo = (src, time) => {
    smsSound.play();
    if (src.split('.')[1] === 'mp4') {
        const video = document.createElement('video');
        video.classList.add('send_sms')
        video.classList.add('shareFile');
        video.src = src;
        video.setAttribute('controls', 'true');
        chat_sms_content.appendChild(video);
        video.addEventListener('click', function () {
            document.getElementById('video').src = src;
            fullscreen.style.width = '100%';
        });
    }
    else if(src.split('.')[1] === 'pdf'){
        let pdf = document.createElement('a');
        pdf.classList.add('send_sms');
        pdf.classList.add('sms');
        pdf.classList.add('pdf');
        pdf.href = src;
        pdf.target='_blanck';
        pdf.setAttribute("filename", `Open ${src.split("__filename")[0].split("shareFIles/")[1].concat(".pdf")}`);
        pdf.innerHTML = `<i class="bi bi-filetype-pdf style="font-size:1.5rem"></i> ${src.split("__filename")[0].split("shareFIles/")[1].concat(".pdf")}<small class="time-content-sender">${time}</small>`;
        chat_sms_content.appendChild(pdf);
    }
    else {
        const img = document.createElement('img');
        img.classList.add('send_sms')
        img.classList.add('shareFile');
        img.src = src;
        chat_sms_content.appendChild(img);
        img.addEventListener('click', function () {
            document.getElementById('dp').src = src;
            fullscreen.style.width = '100%';
        });
    }
}

const shareFileWithSocketIoRecive = (image, src, time) => {
    smsSound.play();
    let span = document.createElement('div');
    span.classList.add('receive-sms');
    span.classList.add('receiver-sms');
    if (src.split('.')[1] === 'mp4') {
        const video = document.createElement('video');
        video.classList.add('shareFile');
        video.src = src;
        video.setAttribute('controls', 'true')
        video.setAttribute('loop', 'true');
        let img = document.createElement('img');
        img.classList.add('chat-user-dp');
        img.src = image;
        span.appendChild(img);
        span.appendChild(video);
        chat_sms_content.appendChild(span);
        shareImage.addEventListener('click', function () {
            document.getElementById('video').src = src;
            fullscreen.style.width = '100%';
        });
    }else if(src.split('.')[1] === 'pdf'){
        const pdf = document.createElement('a');
        pdf.classList.add('pdf');
        pdf.classList.add('sms_second');
        pdf.href = src;
        pdf.target='_blanck';
        pdf.setAttribute("filename", `Open ${src.split("__filenasme")[0].split("shareFIles/")[1].concat(".pdf")}`);
        pdf.innerHTML = `<i class="bi bi-filetype-pdf style="font-size:1.5rem"></i> ${src.split("__filename")[0].split("shareFIles/")[1].concat(".pdf")}<small class="time-content-sender">${time}</small>`;
        let img = document.createElement('img');
        img.classList.add('chat-user-dp');
        img.src = image;
        span.appendChild(img);
        span.appendChild(pdf);
        chat_sms_content.appendChild(span);
    } else {
        let shareImage = document.createElement('img');
        shareImage.classList.add('shareFile');
        shareImage.src = src;
        let img = document.createElement('img');
        img.classList.add('chat-user-dp');
        img.src = image;
        span.appendChild(img);
        span.appendChild(shareImage);
        chat_sms_content.appendChild(span);
        shareImage.addEventListener('click', function () {
            document.getElementById('dp').src = src;
            fullscreen.style.width = '100%';
        });
    }
}

const sender = (sms, time) => {
    smsSound.play();
    let span = document.createElement('span');
    span.classList.add('send_sms');
    span.classList.add('sms');
    span.innerHTML = `${sms}<small class="time-content-sender">${time}</small>`;
    chat_sms_content.appendChild(span);
}

let file = document.getElementById('sender-file');
const fullscreen_send_file = document.getElementsByClassName('upload-image-full-screen')[0];
file.addEventListener('change', function () {
    const url = URL.createObjectURL(file.files[0]);
    if (file.files[0].type === "video/mp4") {
        document.getElementById('video').src = url
        document.getElementById('dp').style.display = 'none';
        document.getElementById('pdf').style.display = 'none'
    }else if(file.files[0].type === "application/pdf"){
        document.getElementById('pdf').src = url
        document.getElementById('dp').style.display = 'none';
        document.getElementById('video').style.display = 'none'
    } else {
        document.getElementById('video').style.display = 'none'
        document.getElementById('pdf').style.display = 'none'
        document.getElementById('dp').src = url;
    }
    fullscreen_send_file.style.width = '100%';
});

const sharefile = document.getElementById('file-share-label');
file ? document.getElementById('image-submit-label').style.display = 'none' : getElementById('image-submit-label').style.display = '';

sharefile.addEventListener('click', async () => {
    try {
        const reciver = document.getElementById('chat_username');
        const formdata = new FormData();
        formdata.append('shareFile', file.files[0]);
        formdata.append('reciver', reciver.innerText);
        const url = 'http://localhost:4240/api/chatserver/chat/share-file';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'token': localStorage.getItem('token')
            },
            body: formdata
        })
        const response_data = await response.json();
        if (response_data.status) {
            let time = await smstimeInSocket();
            fullscreen_send_file.style.width = '0';
            shareFileWithSocketIo(response_data.shareFile, time);
            scrollToBottonSocketIO();
            socket.emit('send-file', { sender: response_data.sender, reciver: response_data.reciver, shareFile: response_data.shareFile,time});
            file.files[0] = '';
        }
    } catch (error) {
        console.log(error)
    }
})

send_sms.addEventListener('click', async (e) => {
    e.preventDefault();
    if (sms.value !== '') {
        try {
            const reciver = document.getElementById('chat_username');
            const url = 'http://localhost:4240/api/chatserver/chat/chat-sms';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    sms: sms.value,
                    reciver: reciver.innerText
                })
            })
            const response_data = await response.json();
            if (response_data.status) {
                let time = await smstimeInSocket();
                sender(sms.value, time);
                scrollToBottonSocketIO();
                socket.emit('send-sms', { sender: response_data.sender, reciver: response_data.reciver, sms: sms.value, time: time });
                sms.value = '';
            }
        } catch (error) {
            console.log(error)
        }
    }
})

socket.on('recive-sms', (data) => {
    const { sender, sms, image, time } = data;
    reciver_sms_using_socket_io(sms, image, sender, time);
    scrollToBottonSocketIO();
})

socket.on('recive-file', (data) => {
    const { sender, image, shareFile, time } = data;
    shareFileWithSocketIoRecive(image, shareFile, time);
    scrollToBottonSocketIO();
})










