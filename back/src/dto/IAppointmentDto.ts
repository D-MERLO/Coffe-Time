interface IAppointmentDto {
    date: string; // YYYY-MM-DD
    time: string; // HH:mm
    userId: number;
    numberOfPeople: number;
}

export default IAppointmentDto;
