const fs = require("fs");
const connection = require("../databases/database")
class TodoHandle {
    async getTemplate(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    async querySQL(sql) {
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }

    async showListTodos(req, res) {
        let html = await this.getTemplate('./src/views/todo.html');
        res.write(html);
        res.end();
    }

    async getTodoList(req, res) {
        // lay data csdl
        let sql = 'SELECT * FROM tasks';
        let todos = await this.querySQL(sql);
        res.end(JSON.stringify(todos))
    }

    async deleteTask(id) {
        const sql = `DELETE FROM tasks WHERE id = ${id}`;
        await this.querySQL(sql);
    }

    async addTask(name) {
        const sql = `INSERT INTO tasks(name, create_at) VALUES ('${name}', null)`;
        await this.querySQL(sql);
    }

 }

module.exports = new TodoHandle();
