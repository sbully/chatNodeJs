let socket = io.connect('http://localhost:8080');
let sendbut = document.querySelector('.submit');
let messageText = document.querySelector('.Message');
let chat = document.querySelector('#chatsection');

console.log(chat);


socket.on('login', function (message) {
	console.log(message);
});

socket.on('message', function (message) {
	console.log(message);
});

sendbut.addEventListener('click', (event) => {
	console.log(messageText.value);
	socket.emit('message', messageText.value);
	event.preventDefault();
});

