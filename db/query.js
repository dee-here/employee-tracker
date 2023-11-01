const db = require('./connection');

class Query {
    constructor(db)  {
        this.connection = db;
    }
    viewAllEmployees() {
        return this.connection.promise().query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary , CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON d.id = r.department_id
        LEFT JOIN employee m ON e.manager_id = m.id
        ORDER BY e.id;`);
    }
    getAllEmployeesAsSelectOptions(){
        return this.connection.promise().query(`SELECT CONCAT(first_name, " ", last_name) as name, id AS value FROM employee;`)
    }
    getAllRolesAsSelectOptions(){
        return this.connection.promise().query(`SELECT title AS name, id as value FROM role;`)
    }
    addEmployee(first_name, last_name, role_id, manager_id) {
        const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);";
        return this.connection.promise().query(sql, [first_name, last_name, role_id, manager_id]);
    }
    updateEmployeeRole(employee_id, role_id) {
        return this.connection.promise().query(`UPDATE employee
        SET role_id = ?
        WHERE id = ?;`, [role_id, employee_id]);
    }
    viewAllRoles() {
        return this.connection.promise().query(`SELECT r.id, r.title, r.salary, d.name
        FROM role r
        JOIN department d ON r.department_id = d.id
        ORDER BY r.id;`);
    }

    addRole(title, salary, department_id) {
        const sql = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);";
        return this.connection.promise().query(sql, [title, salary, department_id] );
    }
    viewAllDepartments() {
        return this.connection.promise().query('SELECT * FROM department');
    }

    addDepartment(name) {
        const sql = "INSERT INTO department (name) VALUES (?)";
        return this.connection.promise().query(sql, name );
    }

    viewCombinedSalaryForAllEmployeesPerDept() {
        return this.connection.promise().query(`SELECT department.name, SUM(role.salary) AS total_budget
        FROM
        employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON  role.department_id = department.id
        GROUP BY
        department.name;`);
    }
}

module.exports = new Query(db);