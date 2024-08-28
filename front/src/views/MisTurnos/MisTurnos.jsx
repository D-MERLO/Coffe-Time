import axios from 'axios';
import { useEffect } from "react";
import Turno from "../../components/Turno/Turno";
import style from "./MisTurnos.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserAppointments } from "../../redux/reducer";

const MisTurnos = () => {
    const user = useSelector((state) => state.userActive);
    const appointments = useSelector((state) => state.userAppointments);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.name) {
            navigate("/login");
        }
    }, [user.name, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${user.id}`);
                const sortedAppointments = response.data.appointments
                    .filter(app => app.status !== "cancelled")
                    .sort((a, b) => {
                        const dateA = new Date(`${a.date}T${a.time}`);
                        const dateB = new Date(`${b.date}T${b.time}`);
                        return dateA - dateB;
                    });
                dispatch(setUserAppointments(sortedAppointments));
                console.log(sortedAppointments);
            } catch (error) {
                console.log("Error al obtener los datos", error);
            }
        };
        if (user.name) {
            fetchData();
        }
    }, [user.name, user.id, dispatch]);

    return (
        <>
            {!user.name ? (
                <div>Loading...</div>
            ) : (
                <div className={style.marco}>
                    <h2 className={style.tituloMarco}>Mis Reservas</h2>
                    <button className={style.buttons} onClick={() => navigate("/newAppointment")}>Nueva Reserva</button>
                    <div>
                        {!appointments.length ? (
                            <p>No tienes reservas aún...</p>
                        ) : (
                            appointments.map((appointment) => (
                                <div className={style.turno} key={appointment.id}>
                                    <Turno
                                        date={new Date(`${appointment.date}T${appointment.time}`).toLocaleDateString()}
                                        time={appointment.time}
                                        status={appointment.status}
                                        numberOfPeople={appointment.numberOfPeople}
                                        id={appointment.id}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                    <img className={style.cafeFooter} src="/cafeFooter.svg" alt="mancha y grano de café" />
                </div>
            )}
        </>
    );
};

export default MisTurnos;
