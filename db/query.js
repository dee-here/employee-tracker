const db = require('./connection');

class Query {
    constructor(db)  {
        this.connection = db;
    }
    viewAllEmployees() {
        return this.connection.promise().query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary , CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON d.id = r.id
        LEFT JOIN employee m ON e.manager_id = m.id;`);
    }
    addEmployee() {
        
    }
    updateEmployeeRole() {
        
    }
    viewAllRoles() {
        return this.connection.promise().query(`SELECT r.id, r.title, r.salary, d.name
        FROM role r
        JOIN department d ON r.department_id = d.id;`);
    }

    addRole(title, salary, department_id) {
        console.log("Add ROLE ", title, salary, department_id);
        const sql = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);";
        return this.connection.promise().query(sql, [title, salary, department_id] );
    }
    viewAllDepartments() {
        return this.connection.promise().query('SELECT * FROM department');
    }

    addDepartment(name) {
        console.log("Add departname ", name );
        const sql = "INSERT INTO department (name) VALUES (?)";
        return this.connection.promise().query(sql, name );
    }
}

// module.export = new Query(db);
module.exports = new Query(db);