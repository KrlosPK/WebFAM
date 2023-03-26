// ? Hooks
import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ? Components
import { API_URL, Input, TextArea } from '../../Utils'
import { Button2 } from '../Button2/Button2'

// ? MUI
import { Alert, AlertTitle, Button, Modal, Snackbar, Typography } from '@mui/material'
import { Box } from '@mui/system'

// ? Styles
import { style } from './ModalStyle'

// ? Libraries
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import emailjs from '@emailjs/browser'

// ? Context
import { SessionContext } from '../../../context/SessionContext'
import { ToastifyContext } from '../../../context/ToastifyContext'

const ModalService = ({ nombre_servicio = '', id_servicio = '' }) => {
  const nombreInputEl = useRef()
  const correoInputEl = useRef()
  const numCelularInputEl = useRef()
  const descripcionCitaInputEl = useRef()
  const form = useRef(null)

  const { session } = useContext(SessionContext)
  const { setToastify } = useContext(ToastifyContext)

  const [openModal, setOpenModal] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const fecha = new Date()
  const hora_creacion_cita_correo =
    fecha.getHours().toString().padStart(2, '0') +
    ':' +
    fecha.getMinutes().toString().padStart(2, '0')
  const fecha_creacion_cita_correo =
    fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate()

  const handleModalClick = () => {
    openModal ? setOpenModal(false) : setOpenModal(true)
    validateSession()
  }

  const handleSnackbarClick = () => (openSnackbar ? setOpenSnackbar(false) : setOpenSnackbar(true))

  const focusInput = (input) => input.current.focus()

  const sendEmail = () => {
    emailjs.sendForm('service_nl11uxr', 'template_nxx5woka', form.current, '-cZX9PkvRspHkBQSX')
  }

  const validateSession = () => {
    if (!session) {
      navigate('/login')
      setToastify('citaValidar')
    }
  }

  const validateForm = () => {
    const nombre = nombreInputEl.current.value
    const correo = correoInputEl.current.value
    const num_celular = numCelularInputEl.current.value
    const descripcion_cita = descripcionCitaInputEl.current.value
    const hora_creacion_cita =
      fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds()
    const fecha_creacion_cita =
      fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + (fecha.getDate() + 1)

    if (nombre.length === 0 || /^\s+$/.test(nombre)) {
      handleSnackbarClick()
      setAlertMessage('¡El nombre no puede estar vacío!')
      focusInput(nombreInputEl)
    } else if (nombre.length < 2) {
      handleSnackbarClick()
      setAlertMessage('¡El Nombre debe tener mínimo 2 letras!')
      focusInput(nombreInputEl)
    } else if (correo.length === 0 || /^\s+$/.test(correo)) {
      handleSnackbarClick()
      setAlertMessage('¡El correo no puede estar vacío!')
      focusInput(correoInputEl)
    } else if (!/\S+@\S+/.test(correo)) {
      handleSnackbarClick()
      setAlertMessage('¡El correo debe contener "@dominio.com"!')
    } else if (!/\S+\.\S+/.test(correo)) {
      handleSnackbarClick()
      setAlertMessage('¡El correo debe contener "@dominio.com"!')
      focusInput(correoInputEl)
    } else if (num_celular.length === 0) {
      handleSnackbarClick()
      setAlertMessage('¡El Número de Celular no puede estar vacío!')
      focusInput(numCelularInputEl)
    } else if (num_celular.length < 9 || num_celular.length >= 12) {
      handleSnackbarClick()
      setAlertMessage('¡El Número de Celular debe tener entre 9 y 11 dígitos!')
      focusInput(numCelularInputEl)
    }
    // * Si ya tiene una cita pendiente, no puede agendar una nueva
    axios
      .get(API_URL(`citasPendientesUsuario/${userData.id_usuario}`))
      .then((res) => {
        const { cita } = res.data
        if (cita.length > 0) {
          setOpenModal(false)
          setToastify('citaAgendadaRepetida')
        } else {
          // * Si no tiene una cita pendiente, se agendará una nueva
          axios
            .post(API_URL('citas'), {
              nombre_completo: nombre,
              correo,
              num_celular,
              hora_creacion_cita,
              fecha_creacion_cita,
              id_usuario: userData.id_usuario,
              nombre_servicio,
              descripcion_cita,
              id_servicio
            })
            .then(() => {
              setToastify('citaAgendada')
              setOpenModal(false)
              sendEmail()
            })
            .catch(() => {
              setToastify('citaAgendadaError')
            })
        }
      })
  }

  useEffect(() => {
    setToastify(false)
  }, [setToastify])

  const getUserData = async () => {
    const token = Cookies.get('token')

    if (!session) return

    if (!token) return

    const decoded = await jwtDecode(token)

    if (decoded.data) {
      const { data } = decoded
      setUserData({
        ...userData,
        id_usuario: data[0].id_usuario,
        name: data[0].nombre,
        lastname: data[0].apellidos,
        email: data[0].correo,
        phoneNumber: data[0].num_celular
      })
    }
  }

  //* Get User Data from API
  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div>
      <Button2 innerOnClick={handleModalClick} text='Solicitar' width={220} />
      <Modal
        open={openModal}
        onClose={handleModalClick}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div>
          <Snackbar
            open={openSnackbar}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={6000}
            onClose={handleSnackbarClick}
          >
            <Alert
              onClose={handleSnackbarClick}
              variant='filled'
              severity='error'
              sx={{ width: '100%' }}
            >
              <AlertTitle sx={{ fontWeight: '800', fontSize: '1.2rem' }}>Error</AlertTitle>
              {alertMessage}
            </Alert>
          </Snackbar>
          <Box sx={style.modal}>
            <Typography sx={style.modalTitle} id='modal-modal-title' variant='h2' component='h2'>
              Agendar cita
            </Typography>
            <form className='main-form' ref={form}>
              <Input
                text='Nombre *'
                innerDefaultValue={
                  userData.name && userData.lastname ? `${userData.name} ${userData.lastname}` : ''
                }
                innerRef={nombreInputEl}
                nameID='nombre_completo'
              />
              <Input
                text='Correo *'
                innerDefaultValue={userData.email}
                innerRef={correoInputEl}
                nameID='correo'
                type='email'
              />
              <Input
                text='Número de Celular *'
                innerDefaultValue={userData.phoneNumber}
                innerRef={numCelularInputEl}
                nameID='num_celular'
                type='number'
              />
              <TextArea
                innerRef={descripcionCitaInputEl}
                placeholder='Describe brevemente que quieres'
                max={400}
                name='descripcion_cita'
              />
              <input
                style={{ display: 'none' }}
                readOnly
                type='text'
                id='nombre_servicio'
                name='nombre_servicio'
                value={nombre_servicio}
              />
              <input
                style={{ display: 'none' }}
                readOnly
                type='text'
                id='hora_creacion_cita'
                name='hora_creacion_cita'
                value={hora_creacion_cita_correo}
              />
              <input
                style={{ display: 'none' }}
                readOnly
                type='text'
                id='fecha_creacion_cita'
                name='fecha_creacion_cita'
                value={fecha_creacion_cita_correo}
              />
            </form>
            <Button onClick={validateForm} variant='outlined' color='warning'>
              Agendar
            </Button>
            <Typography sx={style.modalSpan} id='modal-modal-description'>
              Asegúrate de evitar incluir cualquier información confidencial que no desees compartir
              con esta empresa.
            </Typography>
          </Box>
        </div>
      </Modal>
    </div>
  )
}

export { ModalService }
