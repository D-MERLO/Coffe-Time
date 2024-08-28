import { AppointmentModel, UserModel } from "../config/data-source";
import { Appointment } from "../entities/Appointment";
import { User } from "../entities/User";
import IAppointmentDto from "../dto/IAppointmentDto";

export const getAppointmentsService = async (): Promise<Appointment[]> => {
    return await AppointmentModel.find();
};

export const getAppointmentByIdService = async (id: number): Promise<Appointment> => {
    const foundAppointment = await AppointmentModel.findOne({ where: { id }, relations: { user: true } });
    if (!foundAppointment) throw new Error("No se encontró el turno en la DB");
    return foundAppointment;
};

export const createAppointmentService = async (params: IAppointmentDto): Promise<void> => {
    const date = new Date(`${params.date}T${params.time}:00Z`);
    const now = new Date();
    const dayOfWeek = date.getUTCDay();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();

    if (date <= now) {
        throw new Error("La fecha y hora de la reserva deben ser futuras.");
    }

    if (minute !== 0) {
        throw new Error("Los turnos deben ser cada 1 hora en punto.");
    }

    if (
        (dayOfWeek >= 1 && dayOfWeek <= 4 && (hour < 6 || hour >= 24)) ||
        (dayOfWeek === 0 && (hour < 9 || hour >= 22)) ||
        (dayOfWeek === 6 && (hour < 9 || hour >= 22))
    ) {
        throw new Error("Horario no permitido. Lunes a viernes de 6 a 24, sábados y domingos de 9 a 22.");
    }

    const existingAppointments = await AppointmentModel.find({ where: { date: params.date, time: params.time } });

    const totalPeople = existingAppointments.reduce((acc, appointment) => acc + appointment.numberOfPeople, 0);

    if (totalPeople + params.numberOfPeople > 30) {
        throw new Error("El horario ya está reservado completamente.");
    }

    const user: User | null = await UserModel.findOneBy({ id: params.userId });
    if (user) {
        const newAppointment: Appointment = AppointmentModel.create(params);
        newAppointment.user = user;
        await AppointmentModel.save(newAppointment);
    } else {
        throw new Error("El id no pertenece a un usuario");
    }
};

export const cancelAppointmentByIdService = async (id: number): Promise<void> => {
    const foundAppointment = await AppointmentModel.findOneBy({ id });
    if (foundAppointment) {
        await AppointmentModel.remove(foundAppointment);
    } else {
        throw new Error("El id no corresponde a un turno existente");
    }
};
