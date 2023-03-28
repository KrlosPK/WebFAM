import axios from 'axios'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import { SessionContext } from '../../../context/SessionContext'
import { ToastifyContext } from '../../../context/ToastifyContext'
import { Footer } from '../../Home/Footer/Footer'
import { API_URL, Button2, Input, Navbar, ResponsiveNav, TextArea } from '../../Utils'

const AddFAQ = () => {
  const { session } = useContext(SessionContext)
  const { setToastify } = useContext(ToastifyContext)

  const tituloInputEl = useRef(null)
  const respuestaInputEl = useRef(null)

  const [button, setButton] = useState(null)
  const [idRol, setIdRol] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    !session ? setButton(1) : setButton(2)

    window.scrollTo(0, 0)

    document.title = 'FADEMET Montajes | Crear Pregunta'
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
    })
  }, [])

  const focusInput = (input) => input.current.focus()

  const postFAQ = (e) => {
    e.preventDefault()

    const titulo = e.target[0].value
    const respuesta = e.target[1].value

    if (titulo.length === 0 || /^\s+$/.test(titulo)) {
      toast.error('¡El título no puede estar vacío!', {
        theme: 'colored'
      })
      focusInput(tituloInputEl)
      setDisabled(false)
      return
    } else if (respuesta.length === 0 || /^\s+$/.test(respuesta)) {
      toast.error('¡La respuesta no puede estar vacía!', {
        theme: 'colored'
      })
      focusInput(respuestaInputEl)
      setDisabled(false)
      return
    }
    setDisabled(true)
    axios
      .post(API_URL('createFaq'), {
        titulo,
        respuesta
      })
      .then(() => {
        toast.success('¡Pregunta frecuente creada con éxito!', {
          theme: 'colored'
        })
        setDisabled(false)
        setToastify('faqCreado')
        navigate('/frequent-questions')
      })
      .catch(() => {
        setDisabled(false)
        toast.error('¡Hubo un error al crear la pregunta frecuente!', {
          theme: 'colored'
        })
      })
  }

  return (
    <>
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      <ResponsiveNav
        linkText={
          !session
            ? ['Inicio', 'Servicios']
            : idRol && idRol === 2
              ? ['Inicio', 'Servicios', 'Mis Agendas', 'Preguntas Frecuentes']
              : ['Inicio', 'Agendas', 'Servicios', 'Preguntas Frecuentes']
        }
        linkUrl={
          !session
            ? ['/', '/services']
            : idRol && idRol === 2
              ? ['/', '/services', '/mis-citas', '/frequent-questions']
              : ['/', '/citas', '/services', '/frequent-questions']
        }
        renderButtons={button}
      />
      <Navbar
        linkText={
          !session
            ? ['Inicio', 'Servicios']
            : idRol && idRol === 2
              ? ['Inicio', 'Servicios', 'Mis Agendas', 'Preguntas Frecuentes']
              : ['Inicio', 'Agendas', 'Servicios', 'Preguntas Frecuentes']
        }
        linkUrl={
          !session
            ? ['/', '/services']
            : idRol && idRol === 2
              ? ['/', '/services', '/mis-citas', '/frequent-questions']
              : ['/', '/citas', '/services', '/frequent-questions']
        }
        renderButtons={button}
      />
      <section className='add-service-form'>
        <div className='info-create'>
          <p>Llena este formulario para crear una nueva pregunta frecuente</p>
          <div className='buttons'></div>
        </div>
        <form className='service-form' onSubmit={postFAQ}>
          <div className='main-form'>
            <Input
              text='Título de la pregunta'
              innerId='titulo-pregunta'
              nameID='titulo-pregunta'
              max={30}
              innerRef={tituloInputEl}
            />
            <TextArea
              innerRef={respuestaInputEl}
              placeholder='Respuesta de la pregunta'
              rows={10}
              cols={10}
              max={100}
            />
          </div>
          <div className='send'>
            <Button2 text={'Crear'} width={150} disable={disabled} textDisabled={'Cargando'} />
          </div>
        </form>
      </section>
      <Footer />
    </>
  )
}

export { AddFAQ }
