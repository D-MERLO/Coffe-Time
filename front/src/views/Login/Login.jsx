import { useEffect, useState } from "react";
import { validate } from "../../helpers/validate";
import axios from "axios";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserActive } from "../../redux/reducer";
import { Link } from "react-router-dom";
import "../../App.css";

const Login = () => {

    const initialState = {
        username: "",
        password: ""
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    const postData = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/users/login`, form)
            alert("Inicio de sesión exitoso!")
            dispatch(setUserActive(response.data.user))
            navigate("/")
            setForm(initialState)
        } catch (error) {
            console.log("Error al realizar la petición", error.response);
            alert("Error al iniciar sesión");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };

    useEffect(() => {
        setErrors(validate(form))
    }, [form])

    const handleSubmit = (event) => {
        event.preventDefault();
        postData();
        setForm(initialState);
    };

    return (
        <div className={style.marco}>
            <div className={style.divForm}>
                <h2 className={style.title}>¡Hola de nuevo!</h2>
                <form onSubmit={handleSubmit}>
                    {[
                        { name: "username", type: "text", placeholder:"Usuario" },
                        { name: "password", type: "password", placeholder:"Contraseña" }
                    ].map(({ name, type, placeholder }) => {
                        return (
                            <div key={name}>
                                <input className={style.input} type={type} onChange={handleChange} name={name} value={form[name]} placeholder={placeholder}/>
                                {errors[name] && <span key={name}>{errors[name]}</span>}
                            </div>
                        )
                    })
                    }
                    <button className={style.buttons} disabled={errors.username || errors.password} >Iniciar sesión</button>
                    <h3 className={style.noRegister}>¿No estás registrado aún?</h3>
                    <Link to="/register" className={style.link}>Registrarse</Link>
                </form>
            </div>
        </div>
    )
};

export default Login;

