import React from 'react'
import styles from './footer.module.css'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.logo}>
                        <NavLink
                            style={{ color: 'black', textDecoration: 'none' }}
                            to='/'
                        >
                        </NavLink>
                    </div>
                    <div className={styles.storeAddress}>
                    <p>Dirección: </p>
                    <p>Horario: </p>
                </div>
                <div className={styles.contactInfo}>
                    <p>Contacto:  </p>
                </div>
                    <div className={styles.socialIcons}>
                        <a href={''}>
                            <i
                                className={'fa-brands fa-square-facebook fa-xl'}
                            ></i>
                        </a>
                        <a href={''}>
                            <i className={'fa-brands fa-instagram fa-xl'}></i>
                        </a>
                        <a href={''}>
                            <i className={'fa-brands fa-x-twitter fa-xl'}></i>
                        </a>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    © 2024 Derechos reservados. | Politicas de privacidad | terminos de servicio
                </div>
            </footer>
        </>
    )
}

export default Footer