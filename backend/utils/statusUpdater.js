const db = require('../config/database');

exports.updateOverallStatus = (applicant_id) => {
    const query = `
        SELECT 
            pt.status as physical_status,
            tt.status as theoretical_status,
            prt.status as practical_status
        FROM applicants a
        LEFT JOIN physical_tests pt ON a.id = pt.applicant_id
        LEFT JOIN theoretical_tests tt ON a.id = tt.applicant_id
        LEFT JOIN practical_tests prt ON a.id = prt.applicant_id
        WHERE a.id = ?
    `;

    db.query(query, [applicant_id], (err, results) => {
        if (err) return;

        const result = results[0];
        let overall_status = 'On Progress';

        if (result.physical_status === 'Fail' || 
            result.theoretical_status === 'Fail' || 
            result.practical_status === 'Fail') {
            overall_status = 'Fail';
        } else if (result.physical_status === 'Pass' && 
                   result.theoretical_status === 'Pass' && 
                   result.practical_status === 'Pass') {
            overall_status = 'Pass';
        }

        db.query(
            'UPDATE applicants SET overall_status = ? WHERE id = ?',
            [overall_status, applicant_id]
        );
    });
};