import { Card, CardContent, Typography } from '@mui/material'
import axios from 'axios'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { useContext, useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import { SessionContext } from '../../context/SessionContext'
import { ToastifyContext } from '../../context/ToastifyContext'
import { Footer } from '../Home/Footer/Footer'
import { API_URL, Button, Button2, Navbar, ResponsiveNav } from '../Utils'
import './FAQ.css'
import { style } from './FAQStyle'

const FAQ = () => {
  const { session } = useContext(SessionContext)
  const { toastify, setToastify } = useContext(ToastifyContext)

  const [button, setButton] = useState(null)
  const [idRol, setIdRol] = useState(null)
  const [userPhoto, setUserPhoto] = useState(null)
  const [faqs, setFaqs] = useState(null)

  useEffect(() => {
    if (toastify === 'faqCreado') {
      toast.success('Pregunta frecuente creada con éxito', {
        theme: 'colored'
      })
      setToastify(false)
    }

    !session ? setButton(1) : setButton(2)

    window.scrollTo(0, 0)

    document.title = 'FADEMET Montajes | Preguntas Frecuentes'
  }, [])

  useEffect(() => {
    const token = Cookies.get('token')

    if (!token) return

    new Promise((resolve, reject) => {
      const decoded = jwtDecode(token)
      resolve(decoded.data)
      reject(new Error('Error al decodificar el token'))
    }).then((decoded) => {
      setIdRol(decoded[0].id_rol)
      setUserPhoto(decoded[0].foto_perfil)
    })
  }, [])

  const getFaqs = async () => {
    const { data } = await axios.get(API_URL('faq'))
    const { faq } = data
    setFaqs(faq)
  }

  useEffect(() => {
    getFaqs()
  }, [])

  return (
    <>
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      <ResponsiveNav
        linkText={
          !session
            ? ['Inicio', 'Servicios']
            : idRol && idRol === 2
              ? ['Inicio', 'Servicios', 'Mis Agendas']
              : ['Inicio', 'Agendas', 'Servicios']
        }
        linkUrl={
          !session
            ? ['/', '/services']
            : idRol && idRol === 2
              ? ['/', '/services', '/mis-citas']
              : ['/', '/citas', '/services']
        }
        renderButtons={button}
      />
      <Navbar
        linkText={
          !session
            ? ['Inicio', 'Servicios']
            : idRol && idRol === 2
              ? ['Inicio', 'Servicios', 'Mis Agendas']
              : ['Inicio', 'Agendas', 'Servicios']
        }
        linkUrl={
          !session
            ? ['/', '/services']
            : idRol && idRol === 2
              ? ['/', '/services', '/mis-citas']
              : ['/', '/citas', '/services']
        }
        renderButtons={button}
      />
      <main className='faq'>
        <h1 className='faq__title'>Preguntas Frecuentes</h1>
        <p className='faq__text'>
          Todo lo que necesitas saber sobre nuestros servicios. ¿No encontraste lo que buscabas? Por
          favor, contacta con nuestro equipo.
        </p>
        {idRol && idRol !== 2 && (
          <Link to='/add-frequent-question'>
            <Button text='Crear Pregunta' innerClassName='faq__button' />
          </Link>
        )}
        <div className='faq__cards'>
          {!faqs && <div className='citas-loader'>Cargando...</div>}
          {faqs &&
            faqs.map(({ id_faq, titulo, respuesta }) => (
              <Card key={id_faq} variant='outlined' style={style.card}>
                <CardContent>
                  <Typography style={style.cardTitle} component='div'>
                    {titulo}
                  </Typography>
                  <Typography style={style.cardText} variant='body2'>
                    {respuesta}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </div>
        <section className='get-in-touch'>
          <article className='get-in-touch__info'>
            <LazyLoadImage
              src={userPhoto || '/default-avatar.png'}
              loading='lazy'
              efect='blur'
              width={64}
              height={64}
              alt='Whatsapp de Fademet Montajes'
            />
            <div className='info__text'>
              <h3 className='info-text__title'>¿Todavía tienes dudas?</h3>
              <p className='info-text__text'>Por favor, contacta con nuestro equipo y te responderemos lo más pronto posible.</p>
            </div>
          </article>
          <a
            href='https://api.whatsapp.com/send/?phone=573147561960&text=¡Hola!%20Quisiera%20saber%20más%20sobre%20sus%20servicios.&type=phone_number&app_absent=0'
            target={'_blank'}
            rel='noreferrer'
          >
            <Button2 text='Contáctanos' />
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}

export { FAQ }
