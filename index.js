const inquirer = require('inquirer');

const db = require('./db/query');



// const promptQuestions = [
//     {
//         message: 'Checking Prompts',
//         name: 'testPrompt',
//         deafult: 'HELLO PROMPT !!',
//     }
// ];



// function init() {
//     inquirer.prompt(promptQuestions)
//         .then(answers => console.log('Prompt Answers : ', answers))
//         .catch(error => console.log('Error is: ', error))
// }

// Query database
// db.query('SELECT * FROM department', function (err, results) {
//     console.log(results);
//   });
// db.promise().query('SELECT * FROM department')
//   .then(([data]) => console.table( data))
//   .catch(err => console.log('Error: ', err));

db.viewAllDepartments()
.then(([data]) => console.log( data))
.catch(err => console.log('Error: ', err));
// init();

db.viewAllRoles()
.then(([data]) => console.table( data))
.catch(err => console.log('Error: ', err));