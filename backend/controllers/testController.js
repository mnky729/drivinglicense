const db = require('../config/database');
const { updateOverallStatus } = require('../utils/statusUpdater');

exports.recordPhysicalTest = (req, res) => {
    const {
        applicant_id,
        color_blind_check,
        farsightedness_check,
        astigmatism_check,
        body_reflex_check
    } = req.body;

    const passed_checks = [
        color_blind_check,
        farsightedness_check,
        astigmatism_check,
        body_reflex_check
    ].filter(check => check).length;

    const status = passed_checks >= 3 ? 'Pass' : 'Fail';

    const query = `
        INSERT INTO physical_tests 
        (applicant_id, color_blind_check, farsightedness_check, astigmatism_check, body_reflex_check, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [applicant_id, color_blind_check, farsightedness_check, astigmatism_check, body_reflex_check, status],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            updateOverallStatus(applicant_id);
            res.json({ id: result.insertId, status });
        }
    );
};

exports.recordTheoreticalTest = (req, res) => {
    const {
        applicant_id,
        traffic_signs_score,
        traffic_lines_score,
        right_of_way_score
    } = req.body;

    const total_score = (traffic_signs_score + traffic_lines_score + right_of_way_score) / 3;
    const status = total_score >= 80 ? 'Pass' : 'Fail';

    const query = `
        INSERT INTO theoretical_tests 
        (applicant_id, traffic_signs_score, traffic_lines_score, right_of_way_score, total_score, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [applicant_id, traffic_signs_score, traffic_lines_score, right_of_way_score, total_score, status],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            updateOverallStatus(applicant_id);
            res.json({ id: result.insertId, status, total_score });
        }
    );
};

exports.recordPracticalTest = (req, res) => {
    const { applicant_id, status } = req.body;
    const query = 'INSERT INTO practical_tests (applicant_id, status) VALUES (?, ?)';

    db.query(query, [applicant_id, status], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        updateOverallStatus(applicant_id);
        res.json({ id: result.insertId, status });
    });
};