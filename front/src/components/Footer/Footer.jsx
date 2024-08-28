import style from "./Footer.module.css";

const Footer = () => {
    return (
        <>
            <div className={style.divFooter}>
                    <div className={style.divRubro}>
                        <h3>Cafetería</h3>
                        <h3>Pastelería</h3>
                    </div>
                    <img className={style.marca} src="/marca.png" alt="Empresa" />
                    <div className={style.contacto}>
                        <div className={style.filaContacto}><img className={style.icon} src="/phone.svg" alt="Logo telefono" /><p>2804110320</p></div>
                        <div className={style.filaContacto}><img className={style.icon} src="/instagram.svg" alt="logo Instagram" /><p>coffe.time</p></div>
                        <div className={style.filaContacto}><img className={style.icon} src="/map.svg" alt="logo Ubicacion" /><p>Av. Coffe 123</p></div>
                        <div className={style.filaContacto}><img className={style.icon} src="/email.svg" alt="logo Email" /><p>coffe.time@gmail.com</p></div>
                    </div>
                </div>
            
        </>
    )
}
export default Footer;