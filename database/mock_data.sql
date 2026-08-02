-- ============================================================
-- MOCK DATA
-- Tool Wear Prediction System
-- ============================================================

-- =========================
-- ROLES
-- =========================
INSERT INTO mf_roles (role_name, description) VALUES
('Admin', 'System Administrator'),
('Manager', 'Production Manager'),
('Operator', 'Machine Operator');

-- =========================
-- USERS
-- =========================
INSERT INTO mf_users
(role_id, employee_id, first_name, last_name, email, phone, password_hash)
VALUES
(1, 'EMP001', 'Admin', 'User', 'admin@test.com', '9876543210', 'admin123'),
(2, 'EMP002', 'John', 'Smith', 'john@test.com', '9876543211', 'john123'),
(3, 'EMP003', 'Ravi', 'Kumar', 'ravi@test.com', '9876543212', 'ravi123');

-- =========================
-- MACHINE TYPES
-- =========================
INSERT INTO mf_machine_types (machine_type_name, description)
VALUES
('CNC', 'Computer Numerical Control Machine'),
('Lathe', 'Lathe Machine'),
('Milling', 'Milling Machine');

-- =========================
-- MACHINES
-- =========================
INSERT INTO mf_machines
(machine_type_id, machine_code, machine_name, manufacturer, model_number,
installation_date, location, status)
VALUES
(1,'MC001','CNC Machine 1','DMG','DMG-100','2025-01-10','Plant A','Active'),
(2,'MC002','Lathe Machine 1','Mazak','MZ-200','2025-02-15','Plant B','Maintenance'),
(1,'MC003','CNC Machine 2','DMG','DMG-200','2025-03-20','Plant C','Active');

-- =========================
-- TOOL TYPES
-- =========================
INSERT INTO mf_tool_types
(tool_type_name, description)
VALUES
('Drill Bit','High Speed Drill'),
('End Mill','Cutting Tool'),
('Turning Insert','Turning Tool');

-- =========================
-- TOOLS
-- =========================
INSERT INTO mf_tools
(tool_type_id, tool_code, tool_name, manufacturer,
expected_life_hours, current_life_hours, tool_status)
VALUES
(1,'TL001','Drill Bit 10mm','Bosch',1000,300,'Installed'),
(2,'TL002','End Mill 8mm','Sandvik',1200,850,'Installed'),
(1,'TL003','Drill Bit 12mm','Bosch',1000,950,'Maintenance');

-- =========================
-- MACHINE TOOLS
-- =========================
INSERT INTO mf_machine_tools
(machine_id,tool_id,install_date,tool_position,status)
VALUES
(1,1,'2025-07-01','Spindle-1','Installed'),
(2,2,'2025-07-05','Spindle-2','Installed'),
(3,3,'2025-07-08','Spindle-1','Installed');

-- =========================
-- MACHINE HEALTH
-- =========================
INSERT INTO mf_machine_health
(machine_id,health_score,temperature,vibration,
operating_hours,health_status)
VALUES
(1,95,42.5,1.2,500,'Excellent'),
(2,68,58.3,3.8,950,'Warning'),
(3,38,74.2,5.5,1800,'Critical');

-- =========================
-- TOOL WEAR PREDICTIONS
-- =========================
INSERT INTO mf_tool_wear_predictions
(machine_id,tool_id,wear_percentage,
remaining_life_hours,confidence_score,prediction_status)
VALUES
(1,1,22,700,96,'Normal'),
(2,2,78,150,91,'Warning'),
(3,3,95,20,98,'Critical');

-- =========================
-- ALERTS
-- =========================
INSERT INTO mf_alerts
(prediction_id,machine_id,tool_id,
alert_type,severity,message,alert_status)
VALUES
(2,2,2,'Tool Wear','High',
'Tool wear exceeded warning limit.','Open'),

(3,3,3,'Critical Wear','Critical',
'Replace tool immediately.','Open');

-- =========================
-- PREDICTION HISTORY
-- =========================
INSERT INTO mf_prediction_history
(prediction_id,changed_by,action,remarks)
VALUES
(1,1,'Prediction Created','Initial prediction generated'),
(2,2,'Warning Generated','Wear crossed warning threshold'),
(3,1,'Critical Alert','Replacement recommended');