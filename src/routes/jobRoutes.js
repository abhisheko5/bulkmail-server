import express from 'express';
import getJobsByStatus from '../controllers/jobController.js';

const router = express.Router();

router.route('/get-jobs').get(getJobsByStatus);

export default router;