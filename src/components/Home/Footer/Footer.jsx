import './Footer.css'

import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Footer = () => {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <footer>
      <section className='office-hours'>
        <h2>Horario de atención</h2>
        <ul className='office-hours__lista'>
          <li className='office-hours__item'>
            <strong>Lunes a Viernes</strong> 7:00 - 5:00 pm
          </li>
          <li className='office-hours__item'>
            <strong>Sábado</strong> 8:00 - 12:00 pm
          </li>
          <li className='office-hours__item'>
            <strong>Domingo y Festivos</strong> Cerrado
          </li>
        </ul>
      </section>
      <section className='footer__contact-info'>
        <ul className='footer__contact-info-list'>
          <li className='footer__contact-item'>
            <strong>Dirección:</strong> Calle 61A # 55A - 29
          </li>
          <li className='footer__contact-item'>
            <strong>Teléfono:</strong> +57 314 756 1960
          </li>
          <li className='footer__contact-item'>
            <strong>Correo:</strong> fademetmontajes@gmail.com
          </li>
        </ul>
      </section>
      <section className='footer__contact-links'>
        <a
          href='https://api.whatsapp.com/send/?phone=573147561960&text=¡Hola!%20Quisiera%20saber%20más%20sobre%20sus%20servicios.&type=phone_number&app_absent=0'
          target={'_blank'}
          rel='noreferrer'
        >
          <LazyLoadImage
            src='/whatsapp.png'
            loading='lazy'
            efect='blur'
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
            efect='blur'
            width={32}
            height={32}
            alt='Página de INSTAGRAM de Fademet Montajes'
          />
        </a>
      </section>
      <section className='footer__bottom'>
        <article className='footer__logo'>
          <Link to='/'>
            <LazyLoadImage
              src='/logotype-small.png'
              width={64}
              loading='lazy'
              efect='blur'
              alt='Logo de la empresa FADEMET'
            />
          </Link>
          <p>Copyright © {year} FADEMET S.A.S</p>
        </article>
        <article className='footer__copyright'>
          <Link to='/'>Aspectos legales</Link>
          <Link to='/'>Política de privacidad</Link>
          <Link to='/'>Seguridad</Link>
        </article>
      </section>
    </footer>
  )
}

export { Footer }
