import express from 'express';
import {getAppointments, getAppointmentById, scheduleAppointment, cancelAppointment} from '../controllers/appointmentsController';

const router = express.Router();

router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.post('/schedule', scheduleAppointment);
router.put('/cancel/:id', cancelAppointment);

export default router;
