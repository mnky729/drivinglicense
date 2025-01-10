const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicantController');
const testController = require('../controllers/testController');
const statsController = require('../controllers/statsController');

// Applicant routes
router.get('/applicants', applicantController.getAllApplicants);
router.get('/applicants/search', applicantController.searchApplicants);
router.post('/applicants', applicantController.createApplicant);

// Test routes
router.post('/physical-test', testController.recordPhysicalTest);
router.post('/theoretical-test', testController.recordTheoreticalTest);
router.post('/practical-test', testController.recordPracticalTest);

// Statistics routes
router.get('/daily-stats', statsController.getDailyStats);

module.exports = router;
