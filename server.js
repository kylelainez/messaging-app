require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');

require('./config/database');

// Require controllers here

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
	pingInterval: 15000,
	pignTimeout: 10000
});

// add in when the app is ready to be deployed
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(require('./config/auth'));
// api routes must be before the "catch all" route
app.use('/api/message', require('./routes/api/message'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/conversations', require('./routes/api/conversation'));
// "catch all" route
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;
const activeUsers = {};

io.on('connection', function (socket) {
	console.log('Made socket connection');

	socket.on('logged in', function (data) {
		if(!(data === null || data=== undefined)){
			const newUser = data;
			newUser.clientId = socket.id;
			activeUsers[data._id]  = newUser;
			socket.broadcast.emit('new user', data);
		}
		
	});

	socket.on('disconnect', () => {
		for(let user in activeUsers){
			if(socket.id === activeUsers[user].clientId){
				delete activeUsers[user];
				io.emit('user disconnected', socket.userId);
			}
		}
		
	});

	socket.on('message', function (data) {
		for(let member of data.conversation.members){
			if(activeUsers[member] !== undefined){
				io.to(activeUsers[member].clientId).emit('message', data)
			}
		}
	});
});

http.listen(port, function () {
	console.log(`Express app listening on port ${port}`);
});
