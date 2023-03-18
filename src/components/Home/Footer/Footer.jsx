import './Footer.css'

import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

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
          rel='noreferrer'
        >
          <LazyLoadImage
            src='/whatsapp.png'
            loading='lazy'
            width={32}
            height={32}
            alt='Whatsapp de Fademet Montajes'
          />
        </a>
        <a
          href='https://www.instagram.com/fademetmontajes/?hl=es'
          target={'_blank'}
          rel='noreferrer'
        >
          <LazyLoadImage
            src='/instagram.png'
            loading='lazy'
            width={32}
            height={32}
            alt='Página de INSTAGRAM de Fademet Montajes'
          />
        </a>
      </div>
      <div className='footer__bottom'>
        <div className='footer__logo'>
          <Link to='/'>
            <LazyLoadImage
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
