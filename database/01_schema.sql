-- ============================================================
-- Manufacturing Database Schema
-- Tool Wear Prediction System
-- Part 1 - Master Tables
-- PostgreSQL
-- ============================================================

-- ============================================================
-- TABLE 1 : ROLES
-- ============================================================

CREATE TABLE mf_roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE 2 : USERS
-- ============================================================

CREATE TABLE mf_users (
    user_id SERIAL PRIMARY KEY,

    role_id INT NOT NULL,

    employee_id VARCHAR(30) NOT NULL UNIQUE,

    first_name VARCHAR(50) NOT NULL,

    last_name VARCHAR(50),

    email VARCHAR(120) NOT NULL UNIQUE,

    phone VARCHAR(20),

    password_hash TEXT NOT NULL,

    status VARCHAR(20) DEFAULT 'Active'
        CHECK(status IN ('Active','Inactive')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_users_roles
        FOREIGN KEY(role_id)
        REFERENCES mf_roles(role_id)
);

-- ============================================================
-- TABLE 3 : MACHINE TYPES
-- ============================================================

CREATE TABLE mf_machine_types (

    machine_type_id SERIAL PRIMARY KEY,

    machine_type_name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ============================================================
-- TABLE 4 : MACHINES
-- ============================================================

CREATE TABLE mf_machines (

    machine_id SERIAL PRIMARY KEY,

    machine_type_id INT NOT NULL,

    machine_code VARCHAR(30) NOT NULL UNIQUE,

    machine_name VARCHAR(100) NOT NULL,

    manufacturer VARCHAR(100),

    model_number VARCHAR(100),

    installation_date DATE,

    location VARCHAR(100),

    status VARCHAR(20)
        DEFAULT 'Active'
        CHECK(status IN ('Active','Inactive','Maintenance')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_machine_type
        FOREIGN KEY(machine_type_id)
        REFERENCES mf_machine_types(machine_type_id)

);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_users_employee
ON mf_users(employee_id);

CREATE INDEX idx_users_email
ON mf_users(email);

CREATE INDEX idx_machine_code
ON mf_machines(machine_code);

CREATE INDEX idx_machine_type
ON mf_machines(machine_type_id);
-- ============================================================
-- TABLE 5 : TOOL TYPES
-- ============================================================

CREATE TABLE mf_tool_types (

    tool_type_id SERIAL PRIMARY KEY,

    tool_type_name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ============================================================
-- TABLE 6 : TOOLS
-- ============================================================

CREATE TABLE mf_tools (

    tool_id SERIAL PRIMARY KEY,

    tool_type_id INT NOT NULL,

    tool_code VARCHAR(30) NOT NULL UNIQUE,

    tool_name VARCHAR(100) NOT NULL,

    manufacturer VARCHAR(100),

    expected_life_hours INT NOT NULL,

    current_life_hours INT DEFAULT 0,

    tool_status VARCHAR(20)
        DEFAULT 'Available'
        CHECK(tool_status IN
        ('Available','Installed','Maintenance','Retired')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tool_type
        FOREIGN KEY(tool_type_id)
        REFERENCES mf_tool_types(tool_type_id)

);

-- ============================================================
-- TABLE 7 : MACHINE TOOLS
-- ============================================================

CREATE TABLE mf_machine_tools (

    machine_tool_id SERIAL PRIMARY KEY,

    machine_id INT NOT NULL,

    tool_id INT NOT NULL,

    install_date DATE NOT NULL,

    remove_date DATE,

    tool_position VARCHAR(50),

    status VARCHAR(20)
        DEFAULT 'Installed'
        CHECK(status IN ('Installed','Removed')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_mt_machine
        FOREIGN KEY(machine_id)
        REFERENCES mf_machines(machine_id),

    CONSTRAINT fk_mt_tool
        FOREIGN KEY(tool_id)
        REFERENCES mf_tools(tool_id)

);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_tool_code
ON mf_tools(tool_code);

CREATE INDEX idx_tool_type
ON mf_tools(tool_type_id);

CREATE INDEX idx_machine_tool_machine
ON mf_machine_tools(machine_id);

CREATE INDEX idx_machine_tool_tool
ON mf_machine_tools(tool_id);
-- ============================================================
-- TABLE 8 : MACHINE HEALTH
-- ============================================================

CREATE TABLE mf_machine_health (

    health_id SERIAL PRIMARY KEY,

    machine_id INT NOT NULL,

    health_score DECIMAL(5,2)
        CHECK (health_score BETWEEN 0 AND 100),

    temperature DECIMAL(6,2),

    vibration DECIMAL(6,2),

    operating_hours INT,

    health_status VARCHAR(20)
        DEFAULT 'Good'
        CHECK (health_status IN
        ('Excellent','Good','Warning','Critical')),

    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_health_machine
        FOREIGN KEY(machine_id)
        REFERENCES mf_machines(machine_id)

);

-- ============================================================
-- TABLE 9 : TOOL WEAR PREDICTIONS
-- ============================================================

CREATE TABLE mf_tool_wear_predictions (

    prediction_id SERIAL PRIMARY KEY,

    machine_id INT NOT NULL,

    tool_id INT NOT NULL,

    wear_percentage DECIMAL(5,2)
        CHECK (wear_percentage BETWEEN 0 AND 100),

    remaining_life_hours DECIMAL(8,2),

    confidence_score DECIMAL(5,2)
        CHECK (confidence_score BETWEEN 0 AND 100),

    prediction_status VARCHAR(20)
        DEFAULT 'Normal'
        CHECK (prediction_status IN
        ('Normal','Warning','Critical')),

    predicted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_prediction_machine
        FOREIGN KEY(machine_id)
        REFERENCES mf_machines(machine_id),

    CONSTRAINT fk_prediction_tool
        FOREIGN KEY(tool_id)
        REFERENCES mf_tools(tool_id)

);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_machine_health_machine
ON mf_machine_health(machine_id);

CREATE INDEX idx_prediction_machine
ON mf_tool_wear_predictions(machine_id);

CREATE INDEX idx_prediction_tool
ON mf_tool_wear_predictions(tool_id);

CREATE INDEX idx_prediction_status
ON mf_tool_wear_predictions(prediction_status);

CREATE INDEX idx_prediction_date
ON mf_tool_wear_predictions(predicted_at);
-- ============================================================
-- TABLE 10 : AI RECOMMENDATIONS
-- ============================================================

CREATE TABLE mf_ai_recommendations (

    recommendation_id SERIAL PRIMARY KEY,

    prediction_id INT NOT NULL,

    recommendation TEXT NOT NULL,

    priority VARCHAR(20)
        DEFAULT 'Medium'
        CHECK (priority IN ('Low','Medium','High','Critical')),

    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_recommendation_prediction
        FOREIGN KEY(prediction_id)
        REFERENCES mf_tool_wear_predictions(prediction_id)

);

-- ============================================================
-- TABLE 11 : ALERTS
-- ============================================================

CREATE TABLE mf_alerts (

    alert_id SERIAL PRIMARY KEY,

    prediction_id INT NOT NULL,

    machine_id INT NOT NULL,

    tool_id INT NOT NULL,

    alert_type VARCHAR(50) NOT NULL,

    severity VARCHAR(20)
        DEFAULT 'Medium'
        CHECK (severity IN ('Low','Medium','High','Critical')),

    message TEXT NOT NULL,

    alert_status VARCHAR(20)
        DEFAULT 'Open'
        CHECK (alert_status IN ('Open','Acknowledged','Resolved')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_alert_prediction
        FOREIGN KEY(prediction_id)
        REFERENCES mf_tool_wear_predictions(prediction_id),

    CONSTRAINT fk_alert_machine
        FOREIGN KEY(machine_id)
        REFERENCES mf_machines(machine_id),

    CONSTRAINT fk_alert_tool
        FOREIGN KEY(tool_id)
        REFERENCES mf_tools(tool_id)

);

-- ============================================================
-- TABLE 12 : PREDICTION HISTORY
-- ============================================================

CREATE TABLE mf_prediction_history (

    history_id SERIAL PRIMARY KEY,

    prediction_id INT NOT NULL,

    action VARCHAR(50) NOT NULL,

    changed_by INT,

    remarks TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_history_prediction
        FOREIGN KEY(prediction_id)
        REFERENCES mf_tool_wear_predictions(prediction_id),

    CONSTRAINT fk_history_user
        FOREIGN KEY(changed_by)
        REFERENCES mf_users(user_id)

);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_recommendation_prediction
ON mf_ai_recommendations(prediction_id);

CREATE INDEX idx_alert_prediction
ON mf_alerts(prediction_id);

CREATE INDEX idx_alert_machine
ON mf_alerts(machine_id);

CREATE INDEX idx_alert_tool
ON mf_alerts(tool_id);

CREATE INDEX idx_alert_status
ON mf_alerts(alert_status);

CREATE INDEX idx_prediction_history_prediction
ON mf_prediction_history(prediction_id);

CREATE INDEX idx_prediction_history_user
ON mf_prediction_history(changed_by);