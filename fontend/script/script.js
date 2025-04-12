const token = localStorage.getItem("token");
if (!token) {
  location.replace("login.html");
}
const profile_about = document.getElementsByClassName(
  "chat_user_profile_details"
)[0];
const profile_name = document.getElementsByClassName(
  "chat_user_profile_details"
)[1];
const profile_username = document.getElementsByClassName(
  "chat_user_profile_details"
)[2];
const profile_phone = document.getElementsByClassName(
  "chat_user_profile_details"
)[3];
const profile_email = document.getElementsByClassName(
  "chat_user_profile_details"
)[4];
const profile_bio = document.getElementsByClassName(
  "chat_user_profile_details"
)[5];


const username_title = document.getElementById('username_title');

const user_dp = document.getElementById("user-dp_image");
const profile_nav_dp = document.getElementById("profile-lable");
const chat_list_user_dp = document.getElementById("chat-list-user-dp");
const about_data = document.getElementsByClassName("about_data")[0];
const about_profile_data = document.getElementsByClassName("about_data")[1];
const user_online_status = document.getElementById("user_online_status");
const home_user_dp = document.getElementById("home_user_dp");

// notification function 
const showNotificationFunction = () => {
  let notification_section = document.getElementsByClassName("notification")[0];
  notification_section.style.right = "0rem";
  setTimeout(() => {
    notification_section.style.right = "-100rem";
    notification_section.removeChild(notification_section.lastElementChild);
  }, 4000);
};



// Date and time formating class
class timeFormat {
  // cunstructor of time format class
  constructor(time) {
    this.time = new Date(time);
    this.meridiem = "AM";
  }
  yeare = async () => {
    return this.time.getFullYear();
  };
  months = async () => {
    let monthsName = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthsName[this.time.getMonth() + 1];
  };
  date = async () => {
    return this.time.getDate();
  };
  hours = async () => {
    return this.time.getHours();
  };
  minutes = async () => {
    return this.time.getMinutes();
  };
}


// Return the time of sms 
const smstime = async (time) => {
  let current = new Date();
  const smstimeFormating = new timeFormat(time);
  let year = await smstimeFormating.yeare();
  let minutes = await smstimeFormating.minutes();
  let hours = await smstimeFormating.hours();
  let date = await smstimeFormating.date();
  let month = await smstimeFormating.months();
  minutes < 10 ? (minutes = `0${minutes}`) : (minutes = minutes);
  if (current.getDate() === date && hours > 2) {
    if (hours > 12) {
      hours -= 12;
      smstimeFormating.meridiem = "PM";
      return `${hours}:${minutes} ${smstimeFormating.meridiem}`;
    }
    smstimeFormating.meridiem = "AM";
    return `${hours}:${minutes} ${smstimeFormating.meridiem}`;
  } else {
    return `${date} ${month} ${year}`;
  }
};

// Login notification
const loginNotification = document.getElementsByClassName("notification")[0];
const notificationFunction = (status, sms) => {
  smsSound.play();
  let notification_content = document.createElement("div");
  notification_content.classList.add("notification-content");
  let img = document.createElement("img");
  img.classList.add("chat-user-dp");
  img.src = image;
  let sms_content = document.createElement("div");
  sms_content.classList.add("sms-content");
  let sms_details = document.createElement("div");
  sms_details.classList.add("sms-details");
  let username = document.createElement("div");
  username.innerText = sender;
  let time = document.createElement("small");
  time.innerText = "Just now";
  let reciver_sms = document.createElement("div");
  reciver_sms.innerText = sms;

  sms_details.appendChild(username);
  sms_details.appendChild(time);
  sms_content.appendChild(sms_details);
  sms_content.appendChild(reciver_sms);
  notification_content.appendChild(img);
  notification_content.appendChild(sms_content);
  loginNotification.appendChild(notification_content);
  showNotificationFunction();
};


// fetch the user profile data 
const profile_data = async () => {
  try {
    const url = "http://localhost:4240/api/chatserver/user/profile";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: token,
      },
    });
    const response_data = await response.json();
    if (response_data.status) {
      const { about, name, username, phone, email, bio } =
        response_data.profile;
      profile_about.innserText = about;
      profile_name.innerText = name;
      profile_username.innerText = username;
      username_title.innerText = username
      profile_phone.innerText = phone ? phone : "Add phone no";
      profile_email.innerText = email;
      profile_bio.innerText = bio ? bio : "Add bio";
      user_dp.src = response_data.image;
      profile_nav_dp.src = response_data.image;
      chat_list_user_dp.src = response_data.image;
      about_data.innerText = about;
      about_profile_data.innerText = about;
      
      home_user_dp.innerText = username;
    } else {
      notificationFunction(response_data.status, response_data.error);
    }
  } catch (error) {
    console.log(error);
  }
};
profile_data();


const userChat = document.getElementsByClassName("user-chat")[0];
let menu_toggle_mode = document.getElementById("menu-controler");
let sidenavWidth = document.getElementsByClassName("sidename")[0];

// menu toggle mode function
const menu_toggle_mode_function = () => {
  sidenavWidth.style.width === "0rem"
    ? (sidenavWidth.style.width = "4rem")
    : (sidenavWidth.style.width = "0rem");
};

// event of menu bar
menu_toggle_mode.addEventListener("click", menu_toggle_mode_function);

let userchatWidth = document.getElementsByClassName("user-chat")[0];
let userChatboxWidth = document.getElementsByClassName("chat-box")[0];
const userChatProfile = document.querySelectorAll("user-profile")[0];
const mediaQuery = window.matchMedia("(max-width: 600px)");
const exitFromChatBox = document.getElementById("exit_data");
const mediaQueryProfile = window.matchMedia("(max-width: 400px)");
let userProfile = document.getElementsByClassName("user-details")[0];
const chat_box_nav_dp = document.getElementById("profile_function_run-1");
const chat_username = document.getElementById("chat_username");
const chat_username_profile = document.getElementById('chat_username_profile_title');
const start_chat_box = document.getElementsByClassName("start_chat_box")[0];
userChatboxWidth.style.display = "none";
let chat_sms_contaner = document.getElementsByClassName("chat-sms")[0];
const scroll_bottom = document.getElementById("scroll_bottom");

// chat box scroll to botton function
const scrollToBotton = () =>chat_sms_contaner.scrollTop = chat_sms_contaner.scrollHeight;

chat_sms_contaner.addEventListener("scroll", () => {
  console.log(chat_sms_contaner.scrollTop, chat_sms_contaner.scrollHeight);
  chat_sms_contaner.scrollTop
    ? (scroll_bottom.style.visibility = "hidden")
    : (scroll_bottom.style.visibility = "visible");
});

scroll_bottom.addEventListener("click", () => {
  scrollToBotton();
});


// fetch the sender'share file from database, whitch share file is stored and send by sender for sender  
const shareFileInDatabase = (src, time) => {
  // video fromating statement
  if (src.split(".")[1] === "mp4") {
    const video = document.createElement("video");
    video.classList.add("send_sms");
    video.classList.add("shareFile");
    video.src = `http://localhost:4240/shareFiles/${src}`;
    video.setAttribute("loop", "true");
    video.setAttribute("muted", "true");
    video.setAttribute("controls", "true");
    chat_sms_contaner.appendChild(video);
     
  } 
   // pdf fromating statement
   else if (src.split(".")[1] === "pdf") {
    let pdf = document.createElement("a");
    pdf.classList.add("send_sms");
    pdf.classList.add("sms");
    pdf.classList.add("pdf");
    pdf.href = `http://localhost:4240/shareFiles/${src}`;
    pdf.target = "_blank";
    pdf.setAttribute(
      "filename",
      `Open ${src.split("__filename")[0].concat(".pdf")}`
    );
    pdf.innerHTML =
      pdf.innerHTML = `<i class="bi bi-filetype-pdf style="font-size:1.5rem"></i> ${src
        .split("__filename")[0]
        .concat(".pdf")}<small class="time-content-sender">${time}</small>`;
    chat_sms_contaner.appendChild(pdf);
  } 
  // Image fromating statement
  else {
    const img = document.createElement("img");
    img.classList.add("send_sms");
    img.classList.add("shareFile");
    img.src = `http://localhost:4240/shareFiles/${src}`;
    chat_sms_contaner.appendChild(img);
  }
};

// fetch the sender'share file from database, whitch share file is stored and send by sender for receiver has received
const shareFileWithDataBaseReceive = (image, src, time) => {
  // video fromating statement
  if (src.split(".")[1] === "mp4") {
    let span = document.createElement("div");
    span.classList.add("receive-sms");
    span.classList.add("receiver-sms");
    let video = document.createElement("video");
    video.classList.add("shareFile");
    video.src = `http://localhost:4240/shareFiles/${src}`;
    video.setAttribute("loop", "true");
    video.setAttribute("controls", "true");
    video.setAttribute("muted", "true");
    let img = document.createElement("img");
    img.classList.add("chat-user-dp");
    img.src = image;
    span.appendChild(img);
    span.appendChild(video);
    chat_sms_contaner.appendChild(span);
  } 
  // Pdf fromating statement
  else if (src.split(".")[1] === "pdf") {
    let span = document.createElement("div");
    span.classList.add("receive-sms");
    span.classList.add("receiver-sms");
    const pdf = document.createElement("a");
    pdf.classList.add("pdf");
    pdf.classList.add("sms_second");
    pdf.href = `http://localhost:4240/shareFiles/${src}`;
    pdf.target = "_blanck";
    pdf.setAttribute(
      "filename",
      `Open ${src.split("__filename")[0].concat(".pdf")}`
    );
    pdf.innerHTML = `<i class="bi bi-filetype-pdf style="font-size:1.5rem"></i> ${src
      .split("__filename")[0]
      .concat(".pdf")}<small class="time-content-sender">${time}</small>`;
    let img = document.createElement("img");
    img.classList.add("chat-user-dp");
    img.src = image;
    span.appendChild(img);
    span.appendChild(pdf);
    chat_sms_contaner.appendChild(span);
  } 
  //Image fromating statement
  else {
    let span = document.createElement("div");
    span.classList.add("receive-sms");
    span.classList.add("receiver-sms");
    let shareImage = document.createElement("img");
    shareImage.classList.add("shareFile");
    shareImage.src = `http://localhost:4240/shareFiles/${src}`;
    let img = document.createElement("img");
    img.classList.add("chat-user-dp");
    img.src = image;
    span.appendChild(img);
    span.appendChild(shareImage);
    chat_sms_contaner.appendChild(span);
  }
};
// sender send sms function with check condition , whitch type of information for example video, image, sms, and pdf 
const sender_sms = async (sms, time) => {
  if (
    sms.split(".")[1] === "jpg" ||
    sms.split(".")[1] === "png" ||
    sms.split(".")[1] === "mp4" ||
    sms.split(".")[1] === "pdf"
  ) {
    // Call the function with perameters or argumants
    shareFileInDatabase(sms, time);
  } else {
    let span = document.createElement("span");
    span.classList.add("send_sms");
    span.classList.add("sms");
    span.innerHTML = `${sms}<small class="time-content-sender">${time}</small>`;
    chat_sms_contaner.appendChild(span);
  }
};

// receiver receive sms function with check condition , whitch type of information for example video, image, sms, and pdf 
const reciver_sms = async (sms, image, time) => {
  if (
    sms.split(".")[1] === "jpg" ||
    sms.split(".")[1] === "png" ||
    sms.split(".")[1] === "mp4" ||
    sms.split(".")[1] === "pdf"
  ) {
    // Call the function with perameters or argumants
    shareFileWithDataBaseReceive(image, sms, time);
  } else {
    let span = document.createElement("div");
    span.classList.add("receive-sms");
    span.classList.add("receiver-sms");
    let div = document.createElement("div");
    div.classList.add("sms");
    div.innerHTML = `${sms}<small class="time-content">${time}</small>`;
    let img = document.createElement("img");
    img.classList.add("chat-user-dp");
    img.src = image;
    span.appendChild(img);
    span.appendChild(div);
    chat_sms_contaner.appendChild(span);
  }
  //Call the function and no arguments
  scrollToBotton();
};

//Find the user throught of this function
const chat_user = async (chatuser) => {
  try {
    const url = `http://localhost:4240/api/chatserver/chat/chatting/${chatuser}`;
    const response = await fetch(url);
    const response_data = await response.json();
    return response_data.chatuser;
  } catch (error) {
    console.log(error);
  }
};

//Fetch the chater chat sms function with api and pass the reciver name
const chat_sms = async (reciver) => {
  try {
    const url = `http://localhost:4240/api/chatserver/chat/get-chat/${reciver}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const response_data = await response.json();
    if (response_data.status) {
      if (response_data.chat.length === 0) {
        let span = document.createElement("h3");
        span.classList.add("chat-top-style");
        span.innerText = `Start chat with ${reciver}`;
        chat_sms_contaner.appendChild(span);
      } else {
        response_data.chat.map(async (element) => {
          let time = await smstime(element.time);
          if (element.sender !== profile_username.innerText) {
            reciver_sms(element.sms, response_data.image, time);
          } else {
            sender_sms(element.sms, time);
          }
          scrollToBotton();
          let shareFileShowOnFullScreen =
            document.querySelectorAll(".shareFile");
          for (let i = 0; i < shareFileShowOnFullScreen.length; i++) {
            shareFileShowOnFullScreen[i].addEventListener(
              "dblclick",
              async function () {
                const url = shareFileShowOnFullScreen[i].src;
                if (url.split(".")[1] === "mp4") {
                  document.getElementById("dp").style.display = "none";
                  document.getElementById("pdf").style.display = "none";
                  document.getElementById("video").style.display = "";
                  document.getElementById("video").src = url;
                  fullscreen.style.width = "100%";
                } else {
                  document.getElementById("dp").style.display = "";
                  document.getElementById("video").style.display = "none";
                  document.getElementById("pdf").style.display = "none";
                  document.getElementById("dp").src = url;
                  fullscreen.style.width = "100%";
                }
              }
            );
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const useChatWidth = async (event) => {
  if (mediaQuery.matches) {
    userchatWidth.style.width = "0";
    userChatboxWidth.style.width = "100%";
    exitFromChatBox.innerHTML = " &#x2190;";
    sidenavWidth.style.width = "0rem";
  }
  const chat = await chat_user(event.target.innerText.split("\n")[0]);
  const { username, image, online } = chat;
  chat_username_profile.innerText = username;
  chat_box_nav_dp.src = `http://localhost:4240/images/${image}`;
  chat_username.innerText = username;
  user_online_status.innerText = online === 1 ? "Online" : "Offline";
  user_online_status.innerText === "Online"
    ? (user_online_status.style.color = "green")
    : (user_online_status.style.color = "red");
  chat_username.innerText === ""
    ? (start_chat_box.style.display = "")
    : (start_chat_box.style.display = "none");
  chat_username.innerText === ""
    ? (userChatboxWidth.style.display = "none")
    : (userChatboxWidth.style.display = "");
  chat_sms_contaner.innerHTML = "";
  chat_sms(event.target.innerText.split("\n")[0]);
};

const all_user = async () => {
  try {
    const url = "http://localhost:4240/api/chatserver/chat/all-user";
    const response = await fetch(url);
    const response_data = await response.json();
    let user_chat_available = "";
    if (response_data.status) {
      response_data.findUser.forEach((element) => {
        user_chat_available += `<div class="user-profile hover-effect" onclick="useChatWidth(event)">
            <img loading="lazy" src="${"http://localhost:4240/images/".concat(
              element.image
            )}"/>
            <div class="user-detials">
                <b style="color: blue">${element.username}</b>
                <small>Message</small>
            </div>
        </div>`;
      });
    }
    available_user.innerHTML = user_chat_available;
  } catch (error) {
    console.log(error);
  }
};
all_user();

let available_user = document.getElementsByClassName("available-user-chat")[0];
const find_user = document.getElementById("find-user");
find_user.addEventListener("change", async () => {
  if (find_user.value == "") {
    all_user();
  } else {
    const url = `http://localhost:4240/api/chatserver/chat/find/${find_user.value}`;
    const response = await fetch(url);
    const response_data = await response.json();
    let user_chat_available = "";
    if (response_data.status) {
      response_data.findUser.length !== 0
        ? response_data.findUser.map((element) => {
            user_chat_available += `<div class="user-profile hover-effect" onclick="useChatWidth(event)">
            <img loading="lazy" src="${"http://localhost:4240/images/".concat(
              element.image
            )}"/>
            <div class="user-detials">
                <b style="color: blue">${element.username}</b>
                <small>${element.online == 0 ? "Message" : "Active"}</small>
            </div>
        </div>`;
          })
        : (user_chat_available = `
        <div class='not-found-content'>
        <b>${find_user.value}</b>
        <div> Not found / not exist</div> 
        </div>`);
    }
    available_user.innerHTML = user_chat_available;
  }
});
const logout = document.getElementById("logout");
const logout_function = () => {
  localStorage.removeItem("token");
  location.replace("login.html");
};
logout.addEventListener("click", logout_function);

let userProfilePage = document.getElementsByClassName(
  "user-profile-details"
)[0];
const profileIcon = document.getElementById("profile-toggle-icon");
const profileIconSecond = document.getElementById("profile-lable");
const mediaQueryProfilePage = window.matchMedia("(max-width: 500px)");
const toggle_mode = () => {
  if (mediaQueryProfilePage.matches) {
    if (userProfilePage.style.height == "0vh") {
      userProfilePage.style.height = "100vh";
      userProfilePage.style.width = "100%";
    } else {
      userProfilePage.style.height = "0vh";
    }
  } else {
    userProfilePage.style.width = "25rem";
    userProfilePage.style.height === "0vh"
      ? (userProfilePage.style.height = "100vh")
      : (userProfilePage.style.height = "0vh");
  }
};
profileIcon.addEventListener("click", toggle_mode);
profileIconSecond.addEventListener("click", toggle_mode);

let image = document.getElementById("101");
const fullscreen = document.getElementsByClassName(
  "upload-image-full-screen"
)[0];
image.addEventListener("change", function () {
  let url = URL.createObjectURL(image.files[0]);
  document.getElementById("dp").src = url;
  fullscreen.style.width = "100%";
});

const _fullscreen = document.getElementsByClassName(
  "upload-image-full-screen"
)[1];
chat_list_user_dp.addEventListener("click", function () {
  let set_dp = document.getElementById("chat_dp");
  set_dp.src = chat_list_user_dp.src;
  _fullscreen.style.width = "100%";
});

user_dp.addEventListener("click", function () {
  let set_dp = document.getElementById("chat_dp");
  set_dp.src = user_dp.src;
  _fullscreen.style.width = "100%";
});

document.getElementById("hide_full_screen").addEventListener("click", () => {
  fullscreen.style.width === "100%"
    ? (fullscreen.style.width = "0")
    : (fullscreen.style.width = "100%");
});

document.getElementById("hide_full_screen-1").addEventListener("click", () => {
  _fullscreen.style.width === "100%"
    ? (_fullscreen.style.width = "0")
    : (_fullscreen.style.width = "100%");
});

document
  .getElementById("image-submit-label")
  .addEventListener("click", async () => {
    try {
      let path = user_dp.src.split("images/")[1];
      const formdata = new FormData();
      formdata.append("upload", image.files[0]);
      const url = `http://localhost:4240/api/chatserver/user/upload/${path}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          token: token,
        },
        body: formdata,
      });
      const response_data = await response.json();
      if (response_data) {
        location.replace("index.html");
      }
    } catch (error) {
      console.log(error);
    }
  });

const userChatboxWidthFunction = () => {
  if (userChatboxWidth.style.width === "100%") {
    userchatWidth.style.width = "100%";
    userChatboxWidth.style.width = "0";
  }
};

let emoji = document.getElementsByClassName("emoji-section")[0];
const emojiToggleFunction = () => {
  if (emoji.style.visibility === "hidden") {
    emoji.style.visibility = "visible";
  } else {
    emoji.style.visibility = "hidden";
  }
};
document
  .getElementById("emoji-screen")
  .addEventListener("click", emojiToggleFunction);

const emoji_ = document.querySelectorAll(".emoji-text");
let input_sms = document.getElementById("sender-sms");

for (let i = 0; i < emoji_.length; i++) {
  emoji_[i].addEventListener("click", (event) => {
    input_sms.value = input_sms.value.concat(event.target.innerHTML);
  });
}

const emojiHidden = () => (emoji.style.visibility = "hidden");
input_sms.addEventListener("click", emojiHidden);
chat_sms_contaner.addEventListener("click", emojiHidden);
available_user.addEventListener("click", emojiHidden);
exitFromChatBox.addEventListener("click", emojiHidden);

const showUserProfile = async () => {
  if (userProfile.style.width === "0rem") {
    mediaQueryProfile.matches
      ? (userProfile.style.width = "100%")
      : (userProfile.style.width = "20rem");
  } else {
    userProfile.style.width = "0rem";
  }
  try {
    const url = `http://localhost:4240/api/chatserver/user/chatUserProfile/${chat_username.innerText}`;
    const response = await fetch(url);
    const response_data = await response.json();
    const { image, status, profile } = response_data;
    const { name, username, about, bio, created } = profile;
    const chater_username = document.getElementById(
      "chat-user-profile-username"
    );
    const chater_image = document.getElementById("chat-user-profile-image");
    const chater_about = document.getElementById("chat-user-profile-about");
    const chater_profile = document.getElementsByClassName(
      "chater-user-profile"
    )[0];
    if (status) {
      chater_username.innerText = username;
      chater_image.src = image;
      chater_about.innerText = about;
      chater_profile.innerHTML = `
              <div>Name : ${name}</div>
              <div>Username : ${username}</div>
              <div>BIO : ${bio}</div>
              <div>Created at : ${created.slice(0, 10)}</div>
      `;
    } else {
      chater_profile.innerHTML = `
      <div>Username : ${response_data.error}</div>
      `;
    }
  } catch (error) {
    console.log(error);
  }
};

const backToProfile = document.getElementById("backToprofile");
chat_box_nav_dp.addEventListener("click", showUserProfile);
backToProfile.addEventListener("click", showUserProfile);
