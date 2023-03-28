import axios from 'axios'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import { SessionContext } from '../../../context/SessionContext'
import { ToastifyContext } from '../../../context/ToastifyContext'
import { Footer } from '../../Home/Footer/Footer'
import { API_URL, Button2, Input, Navbar, ResponsiveNav, TextArea } from '../../Utils'

const EditFAQ = () => {
  const { faqId } = useParams()
  const { session } = useContext(SessionContext)
  const { setToastify } = useContext(ToastifyContext)

  const tituloInputEl = useRef(null)
  const respuestaInputEl = useRef(null)

  const [button, setButton] = useState(null)
  const [textFaq, setTextFaq] = useState(null)
  const [idRol, setIdRol] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    !session ? setButton(1) : setButton(2)

    window.scrollTo(0, 0)

    document.title = `FADEMET Montajes | Editar Pregunta Frecuente ${faqId}`
  }, [])

  // * Validate if user is admin
  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      navigate('/login')
      return
    }
    const decode = jwtDecode(token)
    const { id_rol } = decode.data[0]
    setIdRol(id_rol)
    if (id_rol === 2) navigate('/', { replace: true })
  }, [])

  const focusInput = (input) => input.current.focus()

  const validarInputs = (e) => {
    e.preventDefault()

    const titulo = e.target[0].value
    const respuesta = e.target[1].value

    setDisabled(true)

    if (disabled) return

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
    axios
      .patch(API_URL(`editFaq/${faqId}`), {
        titulo,
        respuesta
      })
      .then(() => {
        toast.success('¡Pregunta frecuente editada con éxito!', {
          theme: 'colored'
        })
        setDisabled(false)
        setToastify('faqEditado')
        navigate('/frequent-questions')
      })
      .catch(() => {
        setDisabled(false)
        toast.error('¡Hubo un error al editar la pregunta frecuente!', {
          theme: 'colored'
        })
      })
  }

  const getFaqData = () => {
    axios
      .get(API_URL(`faq/${faqId}`))
      .then(({ data }) => {
        const [faq] = data.faq
        setTextFaq({
          titulo: faq.titulo,
          respuesta: faq.respuesta
        })
      })
      .catch((err) => {
        throw new Error('Error al obtener los datos del servicio')
      })
  }

  useEffect(() => {
    faqId && getFaqData()
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
      <section className='add-service-form'>
        <div className='info-create'>
          <p>Edita este formulario para modificar {textFaq && textFaq.titulo.toLowerCase()}</p>
        </div>
        <form className='service-form' onSubmit={validarInputs}>
          <div className='main-form'>
            <Input
              text='Título de la pregunta'
              innerId='titulo-pregunta'
              type='text'
              nameID='titulo-pregunta'
              max={30}
              innerDefaultValue={textFaq && textFaq.titulo}
              innerRef={tituloInputEl}
            />
            <TextArea
              innerRef={respuestaInputEl}
              placeholder='Respuesta de la pregunta'
              innerDefaultValue={textFaq && textFaq.respuesta}
              rows={10}
              cols={10}
              max={100}
            />
          </div>
          <div className='send'>
            <Button2 text={'Editar'} width={150} disable={disabled} textDisabled={'Cargando'} />
          </div>
        </form>
      </section>
      <Footer />
    </>
  )
}

export { EditFAQ }
