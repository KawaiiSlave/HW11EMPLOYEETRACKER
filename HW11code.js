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
          "View all Departments",
          "View all Roles",
          "View all Employees",
          "Update Employee Roles",
          "Exit"
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

              case "Exit":
              connection.end();
              process.exit;
              break;  
            }
          });
      }

      
function addDepartment() {
      inquirer.prompt({
            name: "Department",
            type: "input",
            message: "Which department would you like to add?",
          
          
    }).then(function (data) {
      
      let query = "INSERT INTO department (name) VALUES (?)";
      connection.query(query, data.name);
      runSearch();
  });
};




function addRole() {

  connection.query("SELECT * FROM department", function (err, result) {
      if (err) throw err;
      let choices = result.map((department) => {return department.name});
      inquirer.prompt([
          {
              name: "title",
              type: "input",
              message: "Which role do you want to add?"
          },
          {
              name: "salary",
              type: "input",
              message: "What does the salary for this job look like?"
          },
          {
              name: "department",
              type: "list",
              message: "Which department is the employee in?",
              choices: choices
          }
      ]).then(function (data) {
          let departmentID = "";
          for (let i = 0; i < result.length; i++) {
              if (data.department === result[i].name) {
                  departmentID = parseInt(result[i].id);
              }
          }
          let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
          connection.query(query, [data.title, parseInt(data.salary), departmentID]);
          runSearch();
      });
  });
};



function addEmployee() {
  connection.query("SELECT * FROM role", function (err, result) {
      if (err) throw err;
      let choices = result.map((role) => {return role.title});
      inquirer.prompt([
          {
              name: "firstName",
              type: "input",
              message: "What is the employees first name?"
          },
          {
              name: "lastName",
              type: "input",
              message: "What is the employees last name?"
          },
          {
              name: "role",
              type: "list",
              message: "Which role does this employee belong to?",
              choices: choices
          }
      ]).then(function (data) {

          let roleID = "";
          for (let i = 0; i < result.length; i++) {
              if (data.role === result[i].title) {
                  roleID = parseInt(result[i].id);
              }
          }
          let query = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)";
          connection.query(query, [data.firstName, data.lastName, roleID]);
          runSearch();
      });
  });
};


function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, result) {
      if (err) throw err;
      let choices = result.map((department)=> department);
      inquirer.prompt({
          name: "department",
          type: "list",
          message: "What department would you like to see?",
          choices: choices
      }).then(function (info) {
          let query = "SELECT CONCAT(e.first_name, ' ', e.last_name) AS employee, r.title, r.salary, d.name, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee AS e INNER JOIN role AS r ON r.id = e.role_id INNER JOIN department AS d ON d.id = r.department_id LEFT JOIN employee AS m ON m.id = e.manager_id WHERE d.name = ?;"
          connection.query(query, info.department, function (err, data) {
              if (err) throw err;
              if (data.length === 0) {
                  console.log("There are no employees in this department");
              }
              console.table(data);
              runSearch();
          });
      });
  });
};


function viewRoles() {
  connection.query("SELECT * FROM role;", function (err, result) {
      if (err) throw err;
      let choices = result.map((role) => {return role.title});
      inquirer.prompt({
          name: "role",
          type: "list",
          message: "What role would you like to view?",
          choices: choices
      }).then(function (info) {
          let query = "SELECT CONCAT(e.first_name, ' ', e.last_name) AS employee, r.title, r.salary, d.name, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee AS e INNER JOIN role AS r ON r.id = e.role_id INNER JOIN department AS d ON d.id = r.department_id LEFT JOIN employee AS m ON m.id = e.manager_id WHERE r.title = ?;"
          connection.query(query, info.role, function (err, data) {
              if (err) throw err;
              if (data.length === 0) {
                  console.log("There are no employees in this role");
              };
              console.table(data);
              runSearch();
          });
      });
  });
};


function viewEmployees() {
  connection.query("SELECT CONCAT(e.first_name, ' ', e.last_name) AS employee, r.title, r.salary, d.name, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee AS e INNER JOIN role AS r ON r.id = e.role_id INNER JOIN department AS d ON d.id = r.department_id LEFT JOIN employee AS m ON m.id = e.manager_id;", function (err, data) {
      if (err) throw err;
      if (data.length === 0) {
          console.log("There are no employees");
      };
      console.table(data);
      runSearch();
  });
};


function updateRoles() {
  connection.query("SELECT * FROM role;", function (err, result) {
      if (err) throw err;
      let roles = result.map((role) => {return role.title})
      connection.query("SELECT e.first_name, e.last_name, e.role_id, r.title, r.id FROM employee AS e INNER JOIN role as r ON e.role_id = r.id;", function (err, info) {
          if (err) throw err;
          let employees = info.map((employee) => {return employee.first_name + " " + employee.last_name});
          inquirer.prompt([
              {
                  name: "employee",
                  type: "list",
                  message: "Which employee would you like to update?",
                  choices: employees
              },
              {
                  name: "role",
                  type: "list",
                  message: "What is their new role?",
                  choices: roles
              }
          ]).then(function (data) {
              for (let i = 0; i < employees.length; i++) {
                  if (data.employee === employees[i] && data.role === info[i].title) {
                      console.log("That is already this employee's role.");
                      return updateRoles();
                  };
              };
              let newID = "";
              let name = data.employee.split(" ");
              let firstName = name[0];
              let lastName = name[1];
              for (let i = 0; i < result.length; i++) {
                  if (result[i].title === data.role) {
                      newID = result[i].id;
                  }
              };
              let query = "UPDATE employee SET employee.role_id = ? WHERE employee.first_name = ? AND employee.last_name = ?;";
              connection.query(query, [newID, firstName, lastName]);
              runSearch();
          });
      });
  });
};





