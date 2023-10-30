const db = require('./connection');

class Query {
    constructor(db)  {
        this.connection = db;
    }
    viewAllDepartments() {
        return this.connection.promise().query('SELECT id, name FROM department');
    }
    viewAllRoles() {
        return this.connection.promise().query('SELECT * FROM role');
    }
}

// module.export = new Query(db);
module.exports = new Query(db);