const inquirer = require('inquirer');

const promptQuestions = [
    {
        message: 'Checking Prompts',
        name: 'testPrompt',
        deafult: 'HELLO PROMPT !!',
    }
];


function init() {
    inquirer.prompt(promptQuestions)
        .then(answers => console.log('Prompt Answers : ', answers))
        .catch(error => console.log('Error is: ', error))
}

init();