// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require("fs");
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'What is the name of project? (Required)',
            validate: projectNameInput => {
                if (projectNameInput) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description of your project. (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter your project description!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'install',
            message: 'What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running. (Required)',
            validate: installInput => {
                if (installInput) {
                    return true;
                } else {
                    console.log('Please enter how to install your project!');
                    return false;
                }
            }    
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions and examples for use. Include screenshots as needed. (Required)',
            validate: usageInput => {
                if (usageInput) {
                    return true;
                } else {
                    console.log('Please enter how to use your project!');
                    return false;
                }
            }    
        },
        {
            type: 'confirm',
            name: 'confirmScrnShot',
            message: 'Would you like to include a screen shot in your "Usage" section?',
            default: true
        },
        {
            type: 'input',
            name: 'scrnShot',
            message: 'To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then type the name of the screenshot file here:',
            when: ({ confirmScrnShot }) => confirmScrnShot
        },
        {
            type: "list",
            name: "license",
            message: "Chose the appropriate license for this project: ",
            choices: [
                "Apache",
                "GP1-v3",
                "MIT",
                "Open"
            ]
        },
        {
            type: "input",
            name: "contributing",
            message: "Who are the contributors of this projects?"
        },
        {
            type: "input",
            name: "tests",
            message: "Is there a test included?"
        },
        {
            type: "input",
            name: "questions",
            message: "What do I do if I have an issue? "
        },
        {
            type: "input",
            name: "email",
            message: "Please enter your email: "
        }
    ]);

};

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function(err){
        if(err){
            return console.log(err);
        } else {
            console.log("Generating README.md");
        }
    })
}

// TODO: Create a function to initialize app
function init() {
    questions()
    .then(function(data){
        writeToFile('README.md', generateMarkdown(data));
    });
}


// Function call to initialize app
init();