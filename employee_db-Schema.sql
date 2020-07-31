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
    salary DECIMAL (10,2) NOT NULL,
    department_id INT NOT NULL -- NEEDS TO HOLD REFERENCE TO DEPARTMENT ROLE BELONGS TO --
);

CREATE TABLE employees (
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL -- NEEDS TO HOLD REFERENCE TO EMPLOYEE MANAGER MAY BE NULL IF HAS NO MANAGER --
);


INSERT INTO departments (name) 
VALUES ("Business Technology"), ("Sales"), ("Marketing"), ("Operations");

INSERT INTO roles (title, salary) 
VALUES ("Director of Business Technology", 178000), ("Sales Rep", 95000), ("Marketer", 65000);



-- ROLE 
-- INSERT INTO role (title, salary, department_id) VALUES
-- ("Engineer", 100,000, 1)


SELECT * FROM departments;


