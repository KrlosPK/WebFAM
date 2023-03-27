// * Hooks
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// * Context
import { SessionContext } from '../../../context/SessionContext'
import { ToastifyContext } from '../../../context/ToastifyContext'

// * Libraries
import { toast, ToastContainer, Zoom } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import Cookies from 'js-cookie'

// * Utils
import {
  API_URL,
  Button,
  Button2,
  Input,
  inputChangeCheck,
  Navbar,
  ResponsiveNav,
  storage
} from '../../Utils'
import './EditService.css'
import Swal from 'sweetalert2'

const EditService = () => {
  // * Navigate
  const navigate = useNavigate()

  // ? Context
  const { session } = useContext(SessionContext)
  const { setToastify } = useContext(ToastifyContext)

  // * States
  const [button, setButton] = useState(null)
  const [lastId, setLastId] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [textServices, setTextServices] = useState(null)
  const { serviceId } = useParams()

  // * Inputs
  const nombre_servicioInputEl = useRef(null)
  const descripcion_servicioInputEl = useRef(null)
  const resumen_servicioInputEl = useRef(null)
  const foto_servicioInputEl = useRef(null)
  const galeria_serviciosInputEl = useRef(null)
  const showTextDisabled = 'Editar'

  // * Focus input
  const focusInput = (input) => input.current.focus()

  // * Toastify context false
  useEffect(() => {
    setToastify(false)
  }, [setToastify])

  // * Validación de inputs
  const validarInputs = async (e) => {
    e.preventDefault()

    setDisabled(true)
    if (disabled) return

    const nombre_servicio = e.target[0].value
    const descripcion_servicio = e.target[1].value
    const resumen_servicio = e.target[2].value

    if (nombre_servicio.length === 0 || /^\s+$/.test(nombre_servicio)) {
      toast.error('¡El nombre del servicio no puede estar vacío!', {
        theme: 'colored'
      })
      focusInput(nombre_servicioInputEl)
      setDisabled(false)
      return
    } else if (nombre_servicio.length < 3) {
      toast.error('¡El nombre del servicio debe tener mínimo 3 letras!', {
        theme: 'colored'
      })
      focusInput(nombre_servicioInputEl)
      setDisabled(false)
      return
    } else if (descripcion_servicio.length === 0 || /^\s+$/.test(descripcion_servicio)) {
      toast.error('¡La descripción no puede estar vacía!', {
        theme: 'colored'
      })
      focusInput(descripcion_servicioInputEl)
      setDisabled(false)
      return
    } else if (descripcion_servicio.length < 3) {
      toast.error('¡La descripción deben tener mínimo 3 letras!', {
        theme: 'colored'
      })
      focusInput(descripcion_servicioInputEl)
      setDisabled(false)
      return
    } else if (resumen_servicio.length === 0) {
      toast.error('¡El resumen del servicio no puede estar vacío!', {
        theme: 'colored'
      })
      focusInput(resumen_servicioInputEl)
      setDisabled(false)
      return
    } else if (resumen_servicio.length < 3) {
      toast.error('¡El resumen del servicio debe tener mínimo 3 letras!', {
        theme: 'colored'
      })
      focusInput(resumen_servicioInputEl)
      setDisabled(false)
      return
    } else if (
      foto_servicioInputEl.current.files[0] &&
      foto_servicioInputEl.current.files[0].type.split('/')[0] !== 'image'
    ) {
      toast.error('¡El formato de la foto debe ser jpg, jpeg o png!', {
        theme: 'colored'
      })
      setDisabled(false)
      return
    } else if (foto_servicioInputEl && foto_servicioInputEl.current.files[0].size > 5000000) {
      toast.error('¡El tamaño de la foto debe ser menor a 5MB!', {
        theme: 'colored'
      })
      setDisabled(false)
      return
    } else if (galeria_serviciosInputEl && galeria_serviciosInputEl.current.files.size > 5000000) {
      toast.error('¡El tamaño de la foto de la galería debe ser menor a 5MB!', {
        theme: 'colored'
      })
      setDisabled(false)
      return
    }
    const foto_servicio = await uploadPhoto()
    const galeria_servicios = await uploadGallery()
    setToastify('serviceModified')
    return {
      nombre_servicio,
      descripcion_servicio,
      resumen_servicio,
      foto_servicio,
      galeria_servicios
    }
  }
  const getServiceData = () => {
    axios
      .get(API_URL(`servicios/${serviceId}`))
      .then(({ data }) => {
        const [service] = data.service
        setTextServices({
          nombre_servicio: service.nombre_servicio,
          descripcion_servicio: service.descripcion_servicio,
          resumen_servicio: service.resumen_servicio,
          estado: service.estado
        })
        setDisabled(true)
      })
      .catch(() => {
        throw new Error('Error al obtener los datos del servicio')
      })
  }

  useEffect(() => {
    serviceId && getServiceData()
  }, [serviceId])

  useEffect(() => {
    !session ? setButton(1) : setButton(2)
    window.scrollTo(0, 0)

    document.title = 'FADEMET Montajes | Crear Servicio'
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
    if (id_rol === 2) navigate('/', { replace: true })
  }, [])

  // * Upload photo to firebase and bd
  useEffect(() => {
    axios.get(API_URL('ultimoId')).then(({ data }) => {
      setLastId(data.lastID[0].lastID)
    })
  }, [])

  // * Upload Gallery to firebase
  const uploadGallery = async () => {
    const galeria_servicios = galeria_serviciosInputEl.current.files
    if (!galeria_servicios || !galeria_servicios.length) return null

    const urls = []
    toast.info('¡Subiendo imágenes!', {
      theme: 'colored'
    })
    for (let i = 0; i < galeria_servicios.length; i++) {
      const galeria_servicio = galeria_servicios[i]
      const imgRef = ref(
        storage,
        `servicesGaleria${lastId + 1}/${galeria_servicio.name + uuidv4()}`
      )
      await uploadBytes(imgRef, galeria_servicio)
      const url = await getDownloadURL(imgRef)
      urls.push(url)
    }
    const galeria_serviciosString = urls.join(', ')
    return galeria_serviciosString
  }

  // * Upload photo to firebase
  const uploadPhoto = async () => {
    try {
      const foto_servicio = foto_servicioInputEl.current.files[0]
      if (!foto_servicio) return null
      const imgRef = ref(storage, `servicesPhoto${lastId + 1}/${foto_servicio.name + uuidv4()}`)
      toast.info('¡Subiendo imagen', {
        theme: 'colored'
      })
      await uploadBytes(imgRef, foto_servicio)
      const url = await getDownloadURL(imgRef)
      return url
    } catch (error) {
      throw new Error(error)
    }
  }

  const submitService = async (e) => {
    e.preventDefault()
    setDisabled(true)
    if (disabled) return
    const body = await validarInputs(e)
    if (!body) return
    postForm(body)
  }

  const postForm = (body) => {
    axios
      .patch(API_URL(`servicios/${serviceId}`), body)
      .then(() => {
        setToastify('serviceModified')
        navigate(`/services/${serviceId}`)
      })
      .catch(() => {
        toast.error('¡Ha ocurrido un error al modificar el servicio!', {
          theme: 'colored'
        })
        setDisabled(false)
      })
  }

  const handleInputChange = (e) => inputChangeCheck(e, { data: textServices, setDisabled })

  const handleFileInputChange = (e) => setDisabled(false)

  const deletePhoto = () => {
    foto_servicioInputEl.current.value = ''
    setDisabled(true)
  }
  const deleteGallery = () => {
    galeria_serviciosInputEl.current.value = ''
    setDisabled(true)
  }

  const desactiveService = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir este cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    })
      .then((result) => {
        if (result.isDismissed) return
        axios
          .patch(API_URL(`inhabilitarServicios/${serviceId}`), { estado: 'inactivo' })
          .then(() => {
            setToastify('serviceDesactive')
            navigate('/services')
          })
          .catch(() => {
            toast.error('¡Ha ocurrido un error al desactivar el servicio!', {
              theme: 'colored'
            })
            setDisabled(false)
          })
      })
      .catch(() => {
        toast.error('¡Ha ocurrido un error al desactivar el servicio!', {
          theme: 'colored'
        })
        setDisabled(false)
      })
  }

  const activeService = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir este cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    })
      .then((result) => {
        if (result.isDismissed) return
        axios
          .patch(API_URL(`inhabilitarServicios/${serviceId}`), { estado: 'activo' })
          .then(() => {
            setToastify('serviceActive')
            navigate('/services')
          })
          .catch(() => {
            toast.error('¡Ha ocurrido un error al activar el servicio!', {
              theme: 'colored'
            })
            setDisabled(false)
          })
      })
      .catch(() => {
        toast.error('¡Ha ocurrido un error al activar el servicio!', {
          theme: 'colored'
        })
        setDisabled(false)
      })
  }

  return (
    <>
      <ResponsiveNav
        linkText={['Inicio', 'Agendas', 'Servicios']}
        linkUrl={['/', '/citas', '/services']}
        renderButtons={button}
      />
      <Navbar
        linkText={['Inicio', 'Agendas', 'Servicios']}
        linkUrl={['/', '/citas', '/services']}
        renderButtons={button}
      />
      <div className='service-div'>
        <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
        <section className='add-service-form'>
          <div className='info-create'>
            <p>
              Edita este formulario para modificar{' '}
              {textServices && textServices.nombre_servicio.toLowerCase()}
            </p>
            {textServices && textServices.estado === 'activo'
              ? (
                <Button
                  text={'Deshabilitar Servicio'}
                  width={150}
                  innerClassName='center'
                  innerOnClick={desactiveService}
                />
              )
              : (
                <Button
                  text={'Habilitar Servicio'}
                  width={150}
                  innerClassName='center'
                  innerOnClick={activeService}
                />
              )}
            <div className='buttons'></div>
          </div>
          <form className='service-form' onSubmit={submitService}>
            <div className='main-form'>
              <Input
                text='Nombre del servicio'
                innerId='nombre-servicio'
                type='text'
                nameID='nombre_servicio'
                max={100}
                innerOnChange={handleInputChange}
                innerDefaultValue={textServices && textServices.nombre_servicio}
                innerRef={nombre_servicioInputEl}
              />
              <Input
                text='Descripción del servicio'
                innerId='descripcion-servicio'
                type='text'
                max={600}
                innerOnChange={handleInputChange}
                nameID='descripcion_servicio'
                innerDefaultValue={textServices && textServices.descripcion_servicio}
                innerRef={descripcion_servicioInputEl}
              />
              <Input
                text='Resumen del servicio'
                innerId='resumen-servicio'
                type='text'
                max={100}
                innerOnChange={handleInputChange}
                nameID='resumen_servicio'
                innerDefaultValue={textServices && textServices.resumen_servicio}
                innerRef={resumen_servicioInputEl}
              />
              <Input
                text='Foto del servicio'
                innerId='foto-servicio'
                type='file'
                accept='image/*'
                nameID='foto_servicio'
                innerRef={foto_servicioInputEl}
                innerOnChange={handleFileInputChange}
              />
              <Input
                text='Galería de los servicios'
                innerId='galeria-servicio'
                type='file'
                accept='image/*'
                nameID='galeria_servicios'
                innerRef={galeria_serviciosInputEl}
                innerOnChange={handleFileInputChange}
                multiple='multiple'
              />
              <p className='info-alert-edit-user'>
                Nota: Si al ingresar nuevas fotos, no ingresas las fotos anteriores, se perderán
              </p>
            </div>
            <div className='send'>
              <Button2
                text={'Editar'}
                width={150}
                disable={disabled}
                animation={false}
                textDisabled={showTextDisabled}
              />
            </div>
          </form>
          <div className='flex mb-5 edit-photos-service'>
            <Button2 text={'Borrar foto'} width={150} innerOnClick={deletePhoto} />
            <Button2 text={'Borrar galeria'} width={150} innerOnClick={deleteGallery} />
          </div>
        </section>
      </div>
    </>
  )
}

export { EditService }
