const db = require('../config/database');

exports.getAllApplicants = (req, res) => {
    const query = `
        SELECT 
            a.*,
            pt.status as physical_test_status,
            tt.status as theoretical_test_status,
            prt.status as practical_test_status
        FROM applicants a
        LEFT JOIN physical_tests pt ON a.id = pt.applicant_id
        LEFT JOIN theoretical_tests tt ON a.id = tt.applicant_id
        LEFT JOIN practical_tests prt ON a.id = prt.applicant_id
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

exports.searchApplicants = (req, res) => {
    const { name } = req.query;
    const query = `
        SELECT * FROM applicants 
        WHERE first_name LIKE ? OR last_name LIKE ?
    `;
    
    db.query(query, [`%${name}%`, `%${name}%`], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

exports.createApplicant = (req, res) => {
    const { first_name, last_name } = req.body;
    const query = 'INSERT INTO applicants (first_name, last_name) VALUES (?, ?)';
    
    db.query(query, [first_name, last_name], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: result.insertId, first_name, last_name });
    });
};