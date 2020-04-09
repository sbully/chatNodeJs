var socket = io.connect('http://localhost:8080');


socket.on('login', function (message) {
	alert("Message du serveur :\n" + message);
})