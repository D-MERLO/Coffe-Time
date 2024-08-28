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
        <div>
            <h2 className={style.title} >Regístrate!</h2>
            <form onSubmit={handleSubmit}>
                {[
                    {label: "NOMBRE", name: "name", type:"text"},
                    {label: "CORREO", name: "email", type:"text"},
                    {label: "DNI", name: "nDni", type:"text"},
                    {label: "FECHA DE NACIMIENTO", name: "birthdate", type:"date"},
                    {label: "USUARIO", name: "username", type:"text"},
                    {label: "CONTRASEÑA", name: "password", type:"password"},
                    {label: "REPETIR CONTRASEÑA", name: "repeatPassword", type:"password"}
                ].map(({name, label, type}) => {
                    return (
                        <div key={name}>
                            <label>{label}</label>
                            <input className={style.input} type={type} onChange={handleChange} name={name} value={form[name]}/>
                            {errors[name] && <span key={name}>{errors[name]}</span>}
                        </div>
                    )
                })
                }
                 <button className={style.buttons} disabled={errors.name || errors.username || errors.password || errors.nDni || errors.email} type='submit'>Registrarse</button>
            </form>
        </div>
  )
};

export default Register;