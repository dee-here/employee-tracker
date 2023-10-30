INSERT INTO department (name)
VALUES  ("IT"),
        ("HR"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Developer", 150000, 1),
        ("Manager", 250000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, 1),
        ("Ant", "Man", 1, 1),
        ("Spider", "Man", 1, 1),
        ("Sherlock", "Holmes", 1, 1),
        ("Super", "Man", 1, 1);


