DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments ( 
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(90) NOT NULL
);


CREATE TABLE roles (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (10,2),
    department_id INT NOT NULL -- NEEDS TO HOLD REFERENCE TO DEPARTMENT ROLE BELONGS TO --
);

CREATE TABLE employees (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL -- NEEDS TO HOLD REFERENCE TO EMPLOYEE MANAGER MAY BE NULL IF HAS NO MANAGER --
);


INSERT INTO departments (name) VALUES 
 ("Engineering", "Sale", "Tyler", "Gabe", "Joey", "Stacey", "Memo");

-- ROLE 
-- INSERT INTO role (title, salary, department_id) VALUES
-- ("Engineer", 100,000, 1)


SELECT * FROM departments;


