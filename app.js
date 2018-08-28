const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//http接口
app.get('/', function(req, res) {
    let data = {
        code: 200,
        message: 'success',
        data: [{
            name: 'xc',
            age: 24
        }]
    }
    res.send(data);
});

//websocket
io.on('connection', function(socket){
    console.log('a user connected');

    socket.on("disconnect", function() {
        console.log("a user go out");
    });

    socket.on("message", function(obj) {
        //延迟3s返回信息给客户端
        setTimeout(function(){
            console.log('the websokcet message is'+obj);
            io.emit("message", obj);
        },3000);
    });
});

//开启端口监听socket
server.listen(3001);

app.listen(3000);