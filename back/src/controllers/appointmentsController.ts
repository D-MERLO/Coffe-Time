import { Request, Response } from 'express';
import IAppointmentDto from "../dto/IAppointmentDto";
import { getAppointmentsService, getAppointmentByIdService, createAppointmentService, cancelAppointmentByIdService } from '../services/appointmentsService';
import { AppointmentModel } from "../config/data-source";

export const getAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await getAppointmentsService();
        res.status(200).json(appointments);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const getAppointmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const appointment = await getAppointmentByIdService(Number(id));
        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const scheduleAppointment = async (req: Request, res: Response) => {
    try {
        const { date, time, userId, numberOfPeople }: IAppointmentDto = req.body;
        const newAppointment = await createAppointmentService({ date, time, userId, numberOfPeople });
        res.status(201).json(newAppointment); // Devolviendo el turno creado
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const cancelAppointment = async (req: Request, res: Response) => {
    try {
        const appointmentId = parseInt(req.params.id);
        await cancelAppointmentByIdService(appointmentId);
        res.status(200).json({ message: "Turno cancelado" });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const createAppointmentController = async (req: Request, res: Response) => {
    try {
        const { date, time, userId, numberOfPeople } = req.body;
        await createAppointmentService({
            date: new Date(date).toISOString().split('T')[0], // Asegúrate de que `date` sea una cadena
            time,
            userId,
            numberOfPeople
        });
        res.status(201).json({ message: "Reserva creada con éxito" });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};
