var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


io.on('connection', function (socket) {
    console.log('user connected => '+socket.id);
   
    // console.log('a user connected');
    // Detect disconnect
    socket.on('disconnect', function () {
        console.log('user disconnected =>'+socket.id);
    });

    // Router message using topic "chat message"
    socket.on('chat message', function (idroom,msg) {
        io.to(idroom).emit('chat message', msg);
        console.log('message: ' + msg);
        // io.emit('chat message', msg);
    });

    socket.on('join', function (idroom) {
        socket.join (idroom); 
        console.log('join : '+idroom);
        io.to(idroom).emit('join', idroom);
    });

    socket.on('leave', function (idroom) {
        socket.leave (idroom); 
        console.log('leave : '+idroom);
    });

    



  
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});