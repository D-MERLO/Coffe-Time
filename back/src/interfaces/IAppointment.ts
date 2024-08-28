export enum AppointmentStatus {
    Active = 'active',
    Cancelled = 'cancelled'
}

interface IAppointment {
    id: number,
    date: string,
    time: number,
    userId: number,
    status: AppointmentStatus
    numberOfPeople: number;
}

export default IAppointment;