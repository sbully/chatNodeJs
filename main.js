const express = require('express');
const app = express();
const server = app.listen(8080);
const path = require('path');
const io = require("socket.io").listen(server)
const session = require('express-session')

/* variable static pointant sur le dossier public, sert pour le link css */
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'sessionsecret' }));


app.get('/', function (requete, reponse) {

	reponse.setHeader("Content-Type", "text/html");
	reponse.status(200);
	reponse.render('logpage.ejs');
});
app.get('/home', function (requete, reponse) {
	reponse.redirect('/');
});

app.get('/chat', function (requete, reponse) {
	reponse.setHeader("Content-Type", "text/html");
	reponse.status(200);
	reponse.render('chatpage.ejs');
});

app.use(function (requete, reponse) {
	reponse.setHeader('Content-Type', 'text/plain');
	reponse.status(404).send("Erreur 404 : Page introuvable");
});

io.sockets.on('connection', function (socket) {
	console.log('New Client');
	socket.broadcast.emit('message', "nouveau utilisateur connecté")
	socket.emit('login', 'Bienvenue, vous êtes connecté!');
	socket.on('message', function (message) {
		socket.broadcast.emit('message', message);
	});

});



/* app.listen(8080); */