var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


io.on('connection', function (socket) {
    console.log('a user connected');
    // Detect disconnect
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    // Router message using topic "chat message"
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});