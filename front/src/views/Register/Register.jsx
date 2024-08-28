import { useEffect, useState } from "react";
import axios from "axios";
import { validate } from "../../helpers/validate";
import style from "./Register.module.css";

const Register = () => {

    const initialState = {
        name: "",
        email: "",
        birthdate: "",
        nDni: "",
        username: "",
        password: "",
        repeatPassword: ""
    };

    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    const postData = async () => {
        try {
            const response = await axios.post("http://localhost:3000/users/register", form)
            alert("Usario registrado con éxito")
        } catch (error) {
            console.log("Error al realizar la petición", error);
            alert("Error al registrar el usuario");
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
                <h2 className={style.title} >¡Bienvenido!</h2>
                <form onSubmit={handleSubmit}>
                    {[
                        { placeholder: "Nombre", name: "name", type: "text" },
                        { placeholder: "Correo", name: "email", type: "text" },
                        { placeholder: "DNI", name: "nDni", type: "text" },
                        { placeholder: "Fecha de nacimiento", name: "birthdate", type: "date" },
                        { placeholder: "Usuario", name: "username", type: "text" },
                        { placeholder: "Contraseña", name: "password", type: "password" },
                        { placeholder: "Repetir contraseña", name: "repeatPassword", type: "password" }
                    ].map(({ placeholder, name, type }) => {
                        return (
                            <div key={name} className={style.divInput}>
                                <input className={style.input} type={type} onChange={handleChange} name={name} value={form[name]} placeholder={placeholder} />
                                {errors[name] && <span key={name}>{errors[name]}</span>}
                            </div>
                        )
                    })
                    }
                    <button className={style.buttons} disabled={errors.name || errors.username || errors.password || errors.nDni || errors.email} type='submit'>Registrarse</button>
                </form>
                <img className={style.contorno1} src="/contornoCafe1.svg" alt="mancha contorno taza de café" />
                <img className={style.contorno2} src="/contornoCafe2.svg" alt="mancha contorno taza de café" />
                <img className={style.granosSupIzq} src="/granosSI.svg" alt="granos de café" />
                <img className={style.cafeFooter} src="/cafeFooter.svg" alt="mancha y granos de café" />
            </div>
        </div>
    )
};

export default Register;