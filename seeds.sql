INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Developement");

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Prosecutor", 300000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Secretary", 70000, 7);

INSERT INTO role (title, salary, department_id)
VALUES ("Front End Dev", 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Back End Dev", 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Assisstant", 50000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 75000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Product Manager", 80000, 8);

INSERT INTO role (title, salary, department_id)
VALUES ("Data Analyst",120000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tyler", "Goodman", 4, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mark", "Nichols", 4, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Cody", "Hollis", 4, 1);