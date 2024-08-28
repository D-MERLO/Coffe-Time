import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./NewAppointment.module.css";
import axios from "axios";

const NewAppointment = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.userActive);
    const initialState = {
        date: "",
        time: "",
        numberOfPeople: 1,
    };

    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState(initialState);
    const [availableTimes, setAvailableTimes] = useState([]);

    useEffect(() => {
        if (!user.name) navigate("/");
    }, [user.name, navigate]);

    const postData = async () => {
        const selectedDate = new Date(`${form.date}T${form.time}`);
        const dayOfWeek = selectedDate.getDay();
        const hour = selectedDate.getHours();

        if (
            (dayOfWeek >= 0 && dayOfWeek <= 4 && (hour < 6 || hour >= 24)) ||
            (dayOfWeek === 5 && (hour < 9 || hour >= 22)) ||
            (dayOfWeek === 6 && (hour < 9 || hour >= 22))
        ) {
            alert("Horario no permitido. Lunes a viernes de 06 a 00, sábados y domingos de 09 a 22.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/appointments/schedule", {
                date: selectedDate.toISOString().split('T')[0],  
                time: form.time,
                userId: user.id,
                numberOfPeople: form.numberOfPeople
            });
            alert("Reserva solicitada con éxito");
            navigate("/appointments")
        } catch (error) {
            console.log("Error al realizar la petición", error);
            alert("No se ha podido realizar la reserva");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    
        if (name === "date") {
            const selectedDate = new Date(value);
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const isYesterday = selectedDate.toDateString() === yesterday.toDateString();
            const dayOfWeek = selectedDate.getDay();
            let startHour, endHour;
    
            if (isYesterday) {
                startHour = today.getHours() + 1;
                endHour = 24;
            } else {
                if (dayOfWeek >= 0 && dayOfWeek <= 4) {
                    startHour = 6;
                    endHour = 24;
                } else if (dayOfWeek === 5 || dayOfWeek === 6) {
                    startHour = 9;
                    endHour = 22;
                }
            }
    
            const times = [];
            for (let hour = startHour; hour < endHour; hour++) {
                times.push(`${hour.toString().padStart(2, '0')}:00`);
            }
            setAvailableTimes(times);
        }
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const minute = parseInt(form.time.split(":")[1]);
        if (minute !== 0) {
            alert("Los turnos deben ser cada 1 hora.");
            return;
        }
        postData();
        setForm(initialState);
    };

    return (
        <div>
            <h2 className={style.title}>Nueva Reserva</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>FECHA</label>
                    <input
                        className={style.input}
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                    />
                    {errors.date && <span>{errors.date}</span>}
                </div>
                <div>
                    <label>HORA</label>
                    <select
                        className={style.input}
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                    >
                        <option value="">Seleccionar Hora</option>
                        {availableTimes.map((time) => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                    {errors.time && <span>{errors.time}</span>}
                </div>
                <div>
                    <label>Número de Personas</label>
                    <input
                        className={style.input}
                        type="number"
                        name="numberOfPeople"
                        value={form.numberOfPeople}
                        onChange={handleChange}
                        min="1" 
                    />
                </div>
                <button
                    className={style.buttons}
                    disabled={!form.date || !form.time}
                    type="submit"
                >
                    Solicitar
                </button>
            </form>
        </div>
    );
};

export default NewAppointment;