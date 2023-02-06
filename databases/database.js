const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456@Abc',
    database: 'todo_app'
})

module.exports = connection;
