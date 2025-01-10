const db = require('../config/database');

exports.getDailyStats = (req, res) => {
    const { date } = req.query;
    const query = `
        SELECT 
            overall_status,
            COUNT(*) as count
        FROM applicants
        WHERE DATE(updated_at) = ?
        GROUP BY overall_status
    `;

    db.query(query, [date], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};
