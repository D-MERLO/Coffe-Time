import "../../App.css"
import style from "./Home.module.css"
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const user = useSelector((state) => state.userActive);
    const navigate = useNavigate();

    const handleClick = () => {
        if (user.name) {
            navigate("/appointments");
        } else {
            navigate("/login");
        }
    };

    return (
        <div>
            <div className={style.portada}>
                <img className={style.imgPortada} src="https://exploracafe.weebly.com/uploads/8/0/9/6/80962076/caf-grano-rectangulo_orig.jpg" alt="granos de café" />
                <img className={style.nombrePortada} src="/NombreEmpresa.png" alt="Nombre de Empresa" />
                <h1 className={style.rubro}>CAFETERIA - PASTELERIA</h1>
            </div>
            <div className={style.marco}>
                <h2 className={style.tituloMarco}>Nuestros servicios</h2>
                <section>
                    <div>
                        <img className={style.circuloA1} src="/circuloA.svg" alt="circulo amarillo" />
                        <img className={style.circuloM1} src="/circuloM1.svg" alt="circulo marron" />
                        <img className={style.cafeRapido} src="/cafeRapido.svg" alt="cafe para llevar" />
                        <img className={style.reloj} src="/reloj.svg" alt="reloj" />
                    </div>
                    <div>
                        <h2 className={style.tarde}>TARDE?</h2>
                        <h3 className={style.en5}>En 5'</h3>
                        <p className={style.tuCafe}>tenés tu café!</p>
                        <h2 className={style.etiqueta}>PARA LLEVAR</h2>
                    </div>
                </section>
                <section>
                    <img className={style.granos} src="/granos.svg" alt="granos de café" />
                    <img className={style.manchacafe} src="/manchacafe.svg" alt="mancha de café" />
                    <img className={style.taza} src="/taza.svg" alt="taza de café" />
                    <img className={style.medialunas} src="/medialunas.svg" alt="medialunas" />
                    <div className={style.reservaCafe}>
                        <h3 className={style.en5}>Café</h3>
                        <h2 className={style.tuCafe}>y algo rico para acompañar</h2>
                        <h3 className={style.conocenos}>Vení a conocernos<br />y elegí entre las delicias<br />que tenemos para vos!</h3>
                        <button className={style.botonReserva} onClick={handleClick}>RESERVAR</button>
                        <h2 className={style.etiqueta2}>DARSE UN GUSTO</h2>
                    </div>
                </section>
                <section className={style.eventos}>
                    <div>
                        <img className={style.circuloA2} src="/circuloA.svg" alt="circulo amarillo" />
                        <img className={style.circuloM2} src="/circuloM1.svg" alt="circulo marron" />

                    </div>
                    <div>
                        <h3 className={style.tituloMesa}>Mesa<br />dulce</h3>
                        <p className={style.subMesa}>a tu gusto!</p>
                    </div>
                    <ul className={style.candybar}>
                        <li>Tortas</li>
                        <li>Tartas</li>
                        <li>Cupcakes</li>
                        <li>Bombones</li>
                        <li>y MÁS!</li>
                    </ul>
                    <img className={style.mesaDulceImg} src="/mesaDulce.svg" alt="mesa dulce para eventos" />
                    <img className={style.granosD} src="/granosD.svg" alt="granos de café" />
                    <h2 className={style.etiqueta3}>PARA EVENTOS</h2>
                    <Link to="/contact" className={style.contactanos}>CONTACTANOS</Link>
                </section>
                <section className={style.paraRegalar}>
                    <h3 className={style.tituloBox}>Box</h3>
                    <p className={style.subBox}>¿Querés quedar bien?</p>
                    <ul className={style.boxs}>
                        <div className={style.divStar}><img className={style.star} src="/star.svg" alt="estrella"/><li>Box mini-tartas</li></div>
                        <div className={style.divStar}><img className={style.star} src="/star.svg" alt="estrella"/><li>Box alfajores</li></div>
                        <div className={style.divStar}><img className={style.star} src="/star.svg" alt="estrella"/><li>Box bombones</li></div>
                    </ul>
                    <Link to="/contact" className={style.contactanos2}>CONTACTANOS</Link>
                    <img className={style.box1} src="/box1.svg" alt="box mini tartas" />
                    <img className={style.box2} src="/box2.svg" alt="box bombones" />
                    <h2 className={style.etiqueta4}>PARA REGALAR</h2>
                </section>
                <img className={style.cafeFooter} src="/cafeFooter.svg" alt="mancha y grano de café" />
            </div>
        </div>
    )
};
export default Home;