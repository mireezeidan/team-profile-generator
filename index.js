const fs = require("fs");
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const team = [];

// create manager
function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Add an engineer or an Intern or Finish",
        name: "mainMenu",
        choices: ["Engineer", "Intern", "Finish"],
      },
    ])
    .then((answers) => {
      if (answers.mainMenu === "Engineer") {
        createEngineer();
      } else if (answers.mainMenu === "Intern") {
        createIntern();
      } else {
        const parsedHTML = generateHTML(team);
        // write to file
        fs.writeFile("team.html", parsedHTML, (err) => (err ? console.error(err) : console.log("Success!")));
      }
    });
}
function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the manager's name?",
        name: "managerName",
      },
      {
        type: "input",
        message: "What is the manager's employee ID?",
        name: "managerID",
      },
      {
        type: "input",
        message: "What is the manager's email",
        name: "managerEmail",
      },
      {
        type: "input",
        message: "What is the manager's number?",
        name: "managerNumber",
      },
    ])
    .then((answers) => {
      console.log(answers);
      // Create a new manager object from the manager class.
      const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerNumber);
      // push manager onto team array
      team.push(manager);
      createTeam();
    });
}
function createEngineer() {
  inquirer
    .prompt([
      // if engineer choosen input engineer’s name, ID, email, and GitHub username
      {
        type: "input",
        message: "What is the engineer's name?",
        name: "engineerName",
      },
      {
        type: "input",
        message: "What is the engineer's ID?",
        name: "engineerID",
      },
      {
        type: "input",
        message: "What is the engineer's email?",
        name: "engineerEmail",
      },
      {
        type: "input",
        message: "What is the engineer's GitHub username?",
        name: "engineerUsername",
      },
    ])
    .then((answers) => {
      console.log(answers);
      // Create a new manager object from the manager class.
      const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerUsername);
      // push manager onto team array
      team.push(engineer);
      createTeam();
    });
}
function createIntern() {
  inquirer
    .prompt([
      // if engineer choosen input engineer’s name, ID, email, and GitHub username
      {
        type: "input",
        message: "What is the intern's name?",
        name: "internName",
      },
      {
        type: "input",
        message: "What is the intern's ID?",
        name: "internID",
      },
      {
        type: "input",
        message: "What is the intern's email?",
        name: "internEmail",
      },
      {
        type: "input",
        message: "What is the intern's school?",
        name: "internSchool",
      },
    ])
    .then((answers) => {
      console.log(answers);
      // Create a new manager object from the manager class.
      const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
      // push manager onto team array
      team.push(intern);
      createTeam();
    });
}

// generate HTMl
const generateHTML = (team) => {
  const managerTemplate = `<div class= "manager-card">
  <div>${team[0].getName()}</div>
<div>${team[0].getId()}</div>
<div>${team[0].getEmail()}</div>
<div>${team[0].getOfficeNumber()}</div> 
</div>`;

  const engineers = team.filter((employee) => employee.getRole() === "Engineer");
  console.log(engineers);
  let engineerTemplate = "";

  engineers.forEach((engineer) => {
    engineerTemplate += `<div class= "engineer-card"> 
    <div>${engineer.getName()}</div>
<div>${engineer.getId()}</div>
<div>${engineer.getEmail()}</div>
<div>${engineer.getGithub()}</div> 
</div>`;
  });

  const interns = team.filter((employee) => employee.getRole() === "Intern");
  let internTemplate = "";

  interns.forEach((intern) => {
    internTemplate += `<div class= "intern-card"> 
    <div>${intern.getName()}</div>
<div>${intern.getId()}</div>
<div>${intern.getEmail()}</div>
<div>${intern.getSchool()}</div> 
</div>`;
  });

  const document = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Team Profile Generator</title>
</head>
<body>
${managerTemplate}
${engineerTemplate}
${internTemplate}

</body>
</html>`;

  return document;
};

// prompt for manager name, employee id, email address, and office number

// menu to add an engineer or an intern
// select engineer: engineer name, id, email, and github username, and taken back to the menu
// select intern: intern name, id, email, and school, and taken back to the menu
// select finish
// generate HTML file
createManager();
