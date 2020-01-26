const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "Tyler",
  password: "eevee",
  database: "HW11DB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "View all departments",
          "View all Roles",
          "View all Employees",
          "Update Employee Roles"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
            case "Add a Department":
              addDepartment();
              break;
      
            case "Add a Role":
              addRole();
              break;
      
            case "Add an Employee":
              addEmployee();
              break;
      
            case "View all Departments":
              viewDepartments();
              break;
      
            case "View all Roles":
              viewRoles();
              break;

              case "View all Employees":
              viewEmployees();
              break;

              case "Update Employee Roles":
              updateRoles();
              break;
            }
          });
      }