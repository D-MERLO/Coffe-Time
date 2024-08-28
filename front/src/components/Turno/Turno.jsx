import axios from "axios";
import style from "./Turno.module.css";
import { useDispatch } from "react-redux";
import { removeAppointmentAction } from "../../redux/reducer";

const Turno = ({ id, date, time, status, numberOfPeople }) => {
    const dispatch = useDispatch();

    const cancelAppointment = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/appointments/cancel/${id}`);
            console.log(response);
            dispatch(removeAppointmentAction(id));
        } catch (error) {
            console.log("Error al obtener los datos", error);
        }
    };

    const handleCancel = () => {
        cancelAppointment();
    };

    return (
        <div className={style.turno}>
            <h3 className={style.datos}>Fecha: <br/> {date}</h3>
            <h3 className={style.datos}>Horario: <br/> {time}</h3>
            <h3 className={style.datos}>Mesa para: <br/> {numberOfPeople} {numberOfPeople === 1 ? 'persona' : 'personas'}</h3>
            {/* <h4 className={style[status]}>{status.toUpperCase()}</h4> */}
            <button className={style.button} onClick={handleCancel}>Cancelar</button>
        </div>
    );
};

export default Turno;
