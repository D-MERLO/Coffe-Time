import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    const [countDown, setCountDown] = useState(5);

    useEffect(() => {
        const countDownInterval = setInterval(() =>{
            setCountDown((prevCountDown) => preveCountDown -1);
        }, 1000);

        setTimeout(() => {
            clearInterval(countDownInterval);
            navigate("/")
        }, 5000);

        return() => clearInterval(countDownInterval);
    }, [navigate])

    return (
        <div>
            <h1>Página no encontrada</h1>
            <p>Redireccionando a home en {countDown} segundos...</p>
        </div>
    )
}

export default ErrorPage;