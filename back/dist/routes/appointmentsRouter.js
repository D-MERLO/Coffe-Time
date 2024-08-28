"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointmentsController_1 = require("../controllers/appointmentsController");
const router = express_1.default.Router();
router.get('/', appointmentsController_1.getAppointments);
router.get('/:id', appointmentsController_1.getAppointmentById);
router.post('/schedule', appointmentsController_1.scheduleAppointment);
router.put('/cancel/:id', appointmentsController_1.cancelAppointment);
exports.default = router;
