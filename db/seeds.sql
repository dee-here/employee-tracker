INSERT INTO department (name)
VALUES  ("IT"),
        ("HR"),
        ("Facilities"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Developer", 150000, 1),
        ("Manager", 250000, 2),
        ("Senior Manager", 350000, 3),
        ("Director", 450000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, NULL),
        ("Ant", "Man", 1, NULL),
        ("Spider", "Man", 1, 1),
        ("Sherlock", "Holmes", 2, 1),
        ("Super", "Man", 2, 2),
        ("Captain", "America", 2, 2);


