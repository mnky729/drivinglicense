CREATE DATABASE IF NOT EXISTS driver_license_db;
USE driver_license_db;

CREATE TABLE IF NOT EXISTS applicants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    overall_status ENUM('Pass', 'On Progress', 'Fail') DEFAULT 'On Progress'
);

CREATE TABLE IF NOT EXISTS physical_tests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    applicant_id INT,
    test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    color_blind_check BOOLEAN,
    farsightedness_check BOOLEAN,
    astigmatism_check BOOLEAN,
    body_reflex_check BOOLEAN,
    status ENUM('Pass', 'Fail') NOT NULL,
    FOREIGN KEY (applicant_id) REFERENCES applicants(id)
);

CREATE TABLE IF NOT EXISTS theoretical_tests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    applicant_id INT,
    test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    traffic_signs_score DECIMAL(5,2),
    traffic_lines_score DECIMAL(5,2),
    right_of_way_score DECIMAL(5,2),
    total_score DECIMAL(5,2),
    status ENUM('Pass', 'Fail') NOT NULL,
    FOREIGN KEY (applicant_id) REFERENCES applicants(id)
);

CREATE TABLE IF NOT EXISTS practical_tests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    applicant_id INT,
    test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pass', 'Fail') NOT NULL,
    FOREIGN KEY (applicant_id) REFERENCES applicants(id)
);