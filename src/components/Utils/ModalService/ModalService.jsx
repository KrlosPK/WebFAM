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

// ? Context
import { SessionContext } from '../../../context/SessionContext'
import { ToastifyContext } from '../../../context/ToastifyContext'

const ModalService = ({ nombre_servicio = '', id_servicio = '' }) => {
  const nombreInputEl = useRef()
  const correoInputEl = useRef()
  const numCelularInputEl = useRef()
  const descripcionCitaInputEl = useRef()

  const { session } = useContext(SessionContext)
  const { setToastify } = useContext(ToastifyContext)

  const [openModal, setOpenModal] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const handleModalClick = () => {
    openModal ? setOpenModal(false) : setOpenModal(true)
    validateSession()
  }
  const handleSnackbarClick = () => (openSnackbar ? setOpenSnackbar(false) : setOpenSnackbar(true))
  const focusInput = (input) => input.current.focus()

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

    const fecha = new Date()
    const hora_creacion_cita =
      fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds()
    const fecha_creacion_cita =
      fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear()

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
      })
      .catch(() => {
        setToastify('citaAgendadaError')
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
        <form>
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
            <div className='main-form'>
              <Input
                text='Nombre *'
                innerDefaultValue={
                  userData.name && userData.lastname ? `${userData.name} ${userData.lastname}` : ''
                }
                innerRef={nombreInputEl}
                nameID='nombre'
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
              />
            </div>
            <Button onClick={validateForm} variant='outlined' color='warning'>
              Agendar
            </Button>
            <Typography sx={style.modalSpan} id='modal-modal-description'>
              Asegúrate de evitar incluir cualquier información confidencial que no desees compartir
              con esta empresa.
            </Typography>
          </Box>
        </form>
      </Modal>
    </div>
  )
}

export { ModalService }
