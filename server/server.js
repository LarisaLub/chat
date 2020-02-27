const express = require('express');
const app = express();
const nunjucks = require('nunjucks')
const server = require('http').Server(app);
const io = require('socket.io')(server, { serverClient: true });


nunjucks.configure('./client/views', {
    autoescape: true,
    express: app
});

app.use('/assets', express.static('client/public'))

app.get('/', (req, res) => {
    res.render('index.html', { date: new Date() })
});

io.on('connection', function (socket) {
    socket.emit('connected', "You are connected! YEAH");
    socket.on('msg', content => {
        const obj = {
            date: new Date(),
            content: content,
            username: "Larisa"
        };
        socket.emit("message", obj);
    })
});


server.listen(7777, () => {
    console.log('server started on port 7777');
});
