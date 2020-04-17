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
	addMessageServer(message);
	scrollMessage();
});

sendbut.addEventListener('click', (event) => {
	console.log(messageText.value);
	socket.emit('message', messageText.value);
	addMessagePerso(messageText.value);
	event.preventDefault();
	scrollMessage();
});

// container pour message entrant provenant d autre utilisateur
function addMessageServer(_message) {
	let div = document.createElement('div');
	div.className = 'card';
	let divinside = document.createElement('div');
	divinside.className = "divinside";
	let img = document.createElement('img');
	img.className = "image";
	img.src = "../../img/profil.png";
	let parag = document.createElement('p');
	parag.className = "parag";
	parag.textContent = _message;
	let span = document.createElement('span');
	span.className = "timeright";
	span.textContent = getStringDate();
	divinside.appendChild(img);
	divinside.appendChild(parag);

	div.appendChild(divinside);
	div.appendChild(span);
	chat.appendChild(div);

}



// container pour message emis par l utilisateur
function addMessagePerso(_message) {
	let div = document.createElement('div');
	div.className = 'card user';
	let divinside = document.createElement('div');
	divinside.className = "divinside right";
	let img = document.createElement('img');
	img.className = "image";
	img.src = "../../img/profil.png";
	let parag = document.createElement('p');
	parag.className = "parag userparag";
	parag.textContent = _message;
	let span = document.createElement('span');
	span.className = "timeleft";
	span.textContent = getStringDate();
	divinside.appendChild(parag);
	divinside.appendChild(img);
	div.appendChild(divinside);
	div.appendChild(span);
	chat.appendChild(div);
}

function getStringDate() {
	let date = new Date();
	let hours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
	let minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();

	return (hours + ":" + minutes);
}

function scrollMessage() {
	chat.scrollTop = chat.scrollHeight;
}

scrollMessage();