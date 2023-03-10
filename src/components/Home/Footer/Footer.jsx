import './Footer.css'

import { BsWhatsapp, BsInstagram } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className='office-hours'>
        <h2>Horario de atención</h2>
        <ul className='office-hours__lista'>
          <li className='office-hours__item'>
            <strong>Lunes a Viernes</strong> 7:00 - 5:00 pm
          </li>
          <li className='office-hours__item'>
            <strong>Sábado</strong> 8:00 - 12:00 pm
          </li>
          <li className='office-hours__item'>
            <strong>Domingo</strong> Cerrado
          </li>
        </ul>
      </div>
      <div className='footer__contact-links'>
        <a
          href='https://api.whatsapp.com/send/?phone=573147561960&text=¡Hola!%20Quisiera%20saber%20más%20sobre%20sus%20servicios.&type=phone_number&app_absent=0'
          target={'_blank'}
        >
          <BsWhatsapp />
        </a>
        <a href='https://www.instagram.com/fademetmontajes/?hl=es' target={'_blank'}>
          <BsInstagram />
        </a>
      </div>
      <div className='footer__bottom'>
        <div className='footer__logo'>
          <Link to='/'>
            <img
              src='/logotype-small.png'
              width={64}
              loading='lazy'
              alt='Logo de la empresa FADEMET'
            />
          </Link>
          <p>Copyright © 2023 FADEMET, Inc.</p>
        </div>
        <div className='footer__copyright'>
          <Link to='/'>Aspectos legales</Link>
          <Link to='/'>Política de privacidad</Link>
          <Link to='/'>Seguridad</Link>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
