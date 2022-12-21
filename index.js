const fs = require("fs");
const inquirer = require("inquirer");

// generate HTMl
const generateHTML = ({ managerName, managerID, managerEmail, managerNumber }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Team Profile Generator</title>
</head>
<body>
<div>${managerName}</div>
<div>${managerID}</div>
<div>${managerEmail}</div>
<div>${managerNumber}</div>
</body>
</html>`;

// prompt for manager name, employee id, email address, and office number
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
    {
      type: "list",
      message: "Add an engineer or an Intern or Finish",
      name: "mainMenu",
      choices: ["Engineer", "Intern", "Finish"],
    },
  ])
  .then((answers) => {
    console.log(answers);
    const parsedHTML = generateHTML(answers);
    // write to file
    fs.writeFile("team.html", parsedHTML, (err) => (err ? console.error(err) : console.log("Success!")));
  });

// menu to add an engineer or an intern
// select engineer: engineer name, id, email, and github username, and taken back to the menu
// select intern: intern name, id, email, and school, and taken back to the menu
// select finish
// generate HTML file
