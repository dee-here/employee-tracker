const mainMenuQuestions = () => [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'mainMenuChoice',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'View Utilized Budget department wise',
            'Quit'
        ]
    }
];

const addEmployeeQuestions = (roleChoices, managerChoices) => [
    {
        message: 'Employee First Name?',
        name: 'firstName'
    },
    {
        message: 'Employee Last Name?',
        name: 'lastName'
    },
    {
        type: 'list',
        message: 'What would the employee role be?',
        name: 'role',
        choices: roleChoices
    },
    {
        type: 'list',
        message: 'What will the employee manager be?',
        name: 'manager',
        choices: managerChoices
    }
];

const departmentNameQuestion = () =>[
    {
        message: 'Department name ?',
        name: 'departmentName'
    }
];

const roleQuestions = (departmentChoices) => [
    {
        name: 'roleTitle',
        message: 'Enter Role Title',
    },
    {
        name: 'roleSalary',
        message: 'Enter Role Salary',
    },
    {
        type: 'list',
        name: 'roleDepartment',
        message: 'Select Role Department',
        choices: departmentChoices,
    }
  ];

const updateEmployeeRoleQuestions = (allEmployees, allroles) => [
    {
        type: 'list',
        name: 'employeeChoice',
        message: 'Select Employee to update Role for',
        choices: allEmployees,
    },
    {
        type: 'list',
        name: 'roleChoice',
        message: `Select Employee's new Role`,
        choices: allroles,
    }

]


module.exports = {
  addEmployeeQuestions,
  mainMenuQuestions,
  departmentNameQuestion,
  roleQuestions,
  updateEmployeeRoleQuestions,
};