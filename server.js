const http = require('http');
const url = require("url");
const PORT = 8080;
const TodoHandle = require('./handles/TodoHandle');
const {Server} = require('socket.io');

const server = http.createServer((req, res) => {
    const urlPath = url.parse(req.url);
    const pathName = urlPath.pathname;

    switch (pathName) {
        case "/":
            TodoHandle.showListTodos(req, res).catch(err => {
                console.log(err.message);
            })
           break;
        case "/getTodo":
            TodoHandle.getTodoList(req, res).catch(err => {
                console.log(err.message);
            });
            break

        default:
            res.end();
    }

});

const io = new Server(server)

io.on('connection', (socket) => {
    socket.on('deleteTask', (taskID) => {
        TodoHandle.deleteTask(taskID).then(() => {
            let message = 'delete task success!'
            io.emit('queryDatabaseDone', message)
        });

    })

    socket.on('addTask', (data) => {
        TodoHandle.addTask(data).then(() => {
            let message = 'create task success!'
            io.emit('queryDatabaseDone', message)
        });
    })
})



server.listen(PORT, 'localhost', () => {
    console.log('server listening in http://localhost:' + PORT)
});


