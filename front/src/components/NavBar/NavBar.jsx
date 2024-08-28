import style from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../../redux/reducer";

const NavBar = () => {

    const user = useSelector((state) => state.userActive)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <>
            <div className={style.divNav}>
                <div >
                    <Link to="/" className={style.linkNav}>HOME</Link>
                    <Link to="/aboutUs" className={style.linkNav}>NOSOTROS</Link>
                    {user.name && <Link to="/appointments" className={style.linkNav}>MIS RESERVAS</Link>}
                    <Link to="/contact" className={style.linkNav}>CONTACTO</Link>
                </div>
                <div>
                    {user.name ? (
                        <label>
                            <p>Hola {user.name}!</p>
                            <button className={style.buttons} id="session" onClick={() => {
                                dispatch(removeUser());
                                navigate("/");
                            }}>Cerrar sesión</button>
                        </label>
                    ) : (
                        <button className={style.buttons}>
                            <Link to="/login" id="session">INICIA SESIÓN</Link>
                        </button>
                    )}
                </div>
            </div>
        </>
    )
};

export default NavBar;

