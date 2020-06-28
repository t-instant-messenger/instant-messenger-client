// File is to communication with the front end hmtl

// Make coonection

const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");
const electron = require('electron');
const axios = require('axios');
// import Qs from 'querystring';
// Get username and room from URL
const { username, room, lang} = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// const socket = io();
//const remote = "http://35.193.213.85:8080/"
const key = 'AIzaSyDy8703fBn4Hf1gaMd3a8GIb-e35EnMKcw'
const socket = io.connect('http://localhost:8080/');

// Join chatroom
socket.emit("joinRoom", { username, room, lang});

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on("message", async (message) => {
  console.log(message);
  const {data} = await axios.post(`https://translation.googleapis.com/language/translate/v2?q=${message.text}&target=${message.lang}&format=text&key=${key}`)
   message.text = data.data.translations[0].translatedText
  //message.text = data;
  outputMessage(message);

  const notif = {
    title: 'New Message',
    body:  message.username+ ': '+ message.text
  }
  if(!document.hasFocus()){
    const newNotification = new Notification(notif.title, notif);
  }
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit("chatMessage", msg);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}
  `;
}
