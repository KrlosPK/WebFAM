import './EditUser.css'

// ? Components
import { Footer } from '../Home/Footer/Footer'
import {
  API_URL,
  Button2,
  Input,
  Navbar,
  validatePassword,
  ResponsiveNav,
  storage,
  Button,
  inputChangeCheck
} from '../Utils'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// ? Hooks
import { useState, useEffect, useRef, useContext } from 'react'

// ? Context
import { SessionContext } from '../../context/SessionContext'

//* Libraries
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { ToastContainer, toast, Zoom } from 'react-toastify'
import { uuidv4 } from '@firebase/util'
import Swal from 'sweetalert2'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Cookies from 'js-cookie'

// ? Icons
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const EditUser = () => {
  // ? Context
  const { session } = useContext(SessionContext)
  const navigate = useNavigate()

  // ! Cambiar título de la página
  useEffect(() => {
    !session ? setButton(1) : setButton(2)
    document.title = 'FADEMET Montajes | Editar Perfil'
  }, [])

  //* Mostrar contraseña
  const [showContrasena, setShowContrasena] = useState(true)
  const [idRol, setIdRol] = useState(null)

  const handleShowContrasenaClick = () => {
    showContrasena ? setShowContrasena(false) : setShowContrasena(true)
  }
  //* Función para hacer focus en el input que no cumpla con los requisitos
  const focusInput = (input) => input.current.focus()

  //* Variables para hacer la validación
  const contrasenaActualEl = useRef(null)
  const contrasenaNuevaEl = useRef(null)
  const confirmarContrasenaEl = useRef(null)

  const nombreInputEl = useRef(null)
  const apellidosInputEl = useRef(null)
  const numCelularInputEl = useRef(null)
  const userImageEl = useRef(null)

  const [button, setButton] = useState(null)
  const [userData, setUserData] = useState({})
  const defaultImage = '/default-avatar.png'
  const [disabled, setDisabled] = useState(true)

  const getUserData = async () => {
    const token = Cookies.get('token')

    if (!token) {
      navigate('/login')
      return
    }

    const decoded = await jwtDecode(token)

    if (decoded.data) {
      const { data } = decoded
      setUserData({
        ...userData,
        id_usuario: data[0].id_usuario,
        name: data[0].nombre,
        lastname: data[0].apellidos,
        email: data[0].correo,
        phoneNumber: data[0].num_celular,
        id: data[0].num_documento,
        typeId: data[0].tipo_documento,
        picture: data[0].foto_perfil
      })
    }
  }

  useEffect(() => {
    //* Get User Data from API
    getUserData()
  }, [])

  const updateUserData = (e) => {
    e.preventDefault()
    setDisabled(true)
    if (disabled) return

    const nombre = e.target[0].value
    const apellidos = e.target[1].value
    const num_celular = e.target[2].value

    // Validación Nombre
    if (nombre.length === 0 || /^\s+$/.test(nombre)) {
      toast.error('¡El Nombre no puede estar vacío!', {
        theme: 'colored'
      })

      focusInput(nombreInputEl)

      return false
    } else if (nombre.length < 2) {
      toast.error('¡El Nombre debe tener mínimo 2 letras!', {
        theme: 'colored'
      })

      focusInput(nombreInputEl)

      return false
    } else if (/\d/.test(nombre)) {
      toast.error('¡El Nombre NO puede tener números!', {
        theme: 'colored'
      })

      focusInput(nombreInputEl)
      setDisabled(false)

      return false
    } else if (apellidos.length === 0 || /^\s+$/.test(apellidos)) {
      // Validación Apellidos
      toast.error('¡Los Apellidos no puede estar vacío!', {
        theme: 'colored'
      })

      focusInput(apellidosInputEl)

      return false
    } else if (apellidos.length < 3) {
      toast.error('¡Los Apellidos deben tener mínimo 3 letras!', {
        theme: 'colored'
      })

      focusInput(apellidosInputEl)

      return false
    } else if (/\d/.test(apellidos)) {
      toast.error('¡Los Apellidos NO pueden tener números!', {
        theme: 'colored'
      })

      focusInput(apellidosInputEl)
      setDisabled(false)

      return false
    } else if (num_celular.length === 0) {
      // Validación Número de Celular
      toast.error('¡El Número de Celular no puede estar vacío!', {
        theme: 'colored'
      })

      focusInput(numCelularInputEl)

      return false
    } else if (num_celular.length < 9 || num_celular.length >= 12) {
      e.preventDefault()

      toast.error('¡El Número de Celular debe tener entre 9 y 11 dígitos!', {
        theme: 'colored'
      })

      focusInput(numCelularInputEl)

      return false
    }

    axios
      .patch(API_URL(`editarUsuario/${userData.id_usuario}`), {
        nombre,
        apellidos,
        num_celular
      })
      .then((res) => {
        setDisabled(true)

        if (res.status === 200) {
          toast.success('¡Datos actualizados correctamente!', {
            theme: 'colored'
          })
        }

        axios
          .post(API_URL(`nuevoToken/${userData.id_usuario}`))
          .then(({ data }) => {
            const { token } = data

            const domain = window.location.hostname
            Cookies.set('token', token, { domain, path: '' })

            getUserData()
          })
          .catch(() => {
            toast.error('¡Hubo un error al actualizar los datos!', {
              theme: 'colored'
            })
          })
      })
      .catch(() => {
        toast.error('¡Hubo un error al actualizar los datos!', {
          theme: 'colored'
        })
      })
  }

  const updateUserPassword = (e) => {
    e.preventDefault()

    setDisabled(true)
    if (disabled) return

    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@¡!/¿?_\-.#+*$~%&=ñÑ]{8,16}$/

    const data = {
      contrasenaActual: e.target[0].value,
      contrasenaNueva: e.target[1].value,
      confirmarContrasena: e.target[2].value
    }

    if (data.contrasenaActual === '') {
      toast.error('¡La contraseña actual no puede estar vacía!', {
        theme: 'colored'
      })
      focusInput(contrasenaActualEl)
      setDisabled(false)

      return false
    }

    if (data.contrasenaNueva === '') {
      toast.error('¡La nueva contraseña no puede estar vacía!', {
        theme: 'colored'
      })
      focusInput(contrasenaNuevaEl)
      setDisabled(false)

      return
    }

    if (!validatePassword(data.contrasenaNueva, regexContrasena)) {
      toast.error(
        '¡La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, una minúscula y un número!',
        {
          theme: 'colored'
        }
      )
      focusInput(contrasenaNuevaEl)
      setDisabled(false)

      return
    }

    if (data.contrasenaNueva !== data.confirmarContrasena) {
      toast.error('¡Las contraseñas no coinciden, inténtalo de nuevo!', {
        theme: 'colored'
      })
      focusInput(confirmarContrasenaEl)
      setDisabled(false)

      return
    }
    axios
      .patch(API_URL(`cambiarContrasena/${userData.id_usuario}`), {
        contrasenaActual: data.contrasenaActual,
        contrasenaNueva: data.contrasenaNueva
      })
      .then((res) => {
        setDisabled(true)

        if (res.status === 200) {
          toast.success('¡Contraseña actualizada correctamente!', {
            theme: 'colored'
          })
        }
        changePassword()
      })
      .catch(() => {
        toast.error('¡La contraseña actual no coincide!', {
          theme: 'colored'
        })
        focusInput(contrasenaActualEl)
      })
  }

  const inputChange = (e) => inputChangeCheck(e, { data: userData, setDisabled })

  const [form, setForm] = useState('editUser')

  const changePassword = () => {
    form === 'editUser' ? setForm('changePassword') : setForm('editUser')
  }

  useEffect(() => {
    const token = Cookies.get('token')

    new Promise((resolve, reject) => {
      const decoded = jwtDecode(token)
      resolve(decoded.data)
      reject(new Error('Error al decodificar el token'))
    }).then((decoded) => {
      setIdRol(decoded[0].id_rol)
    })
  }, [])

  const uploadUserPhoto = async (e) => {
    e.preventDefault()

    if (!userImageEl.current.files[0] || userImageEl.current.files[0].length === 0) {
      toast.error('¡Debes seleccionar una imagen!', {
        theme: 'colored'
      })
      return false
    } else if (userImageEl && userImageEl.current.files[0].size > 5000000) {
      toast.error('¡La imagen no puede pesar más de 5MB!', {
        theme: 'colored'
      })
      return false
    }

    try {
      const userImage = userImageEl.current.files[0]
      if (!userImage) return false
      const imgRef = ref(storage, `userPictures/${userImage.name}-${uuidv4()}`)
      await uploadBytes(imgRef, userImage)
      const url = await getDownloadURL(imgRef)

      return url
    } catch (error) {
      throw new Error(error)
    }
  }

  const updateUserPhoto = async (e) => {
    const url = await uploadUserPhoto(e)

    if (!url) return

    axios
      .patch(API_URL(`editarUsuario/${userData.id_usuario}`), {
        foto_perfil: url
      })
      .then(async () => {
        toast.success(
          '¡Imagen actualizada correctamente! Algunos cambios aún no se verán reflejados',
          {
            theme: 'colored'
          }
        )
        userImageEl.current.value = ''
        axios.post(API_URL(`nuevoToken/${userData.id_usuario}`)).then(({ data }) => {
          const { token } = data

          const domain = window.location.hostname
          Cookies.set('token', token, { domain, path: '' })

          getUserData()
        })
      })
      .catch(() => {
        toast.error('¡Hubo un error al actualizar la foto de perfil!', {
          theme: 'colored'
        })
      })
  }

  const deleteUserPhoto = () => {
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
    }).then((result) => {
      if (result.isDismissed) return
      axios
        .patch(API_URL(`editarUsuario/${userData.id_usuario}`), {
          foto_perfil: '/default-avatar.png'
        })
        .then(async () => {
          axios.post(API_URL(`nuevoToken/${userData.id_usuario}`)).then(({ data }) => {
            const { token } = data
            toast.success(
              '¡Imagen eliminada correctamente! Algunos cambios aún no se verán reflejados',
              {
                theme: 'colored'
              }
            )

            const domain = window.location.hostname
            Cookies.set('token', token, { domain, path: '' })

            setTempPhoto(null)
            getUserData()
          })
        })
        .catch(() => {
          toast.error('¡Hubo un error al eliminar la foto de perfil!', {
            theme: 'colored'
          })
        })
    })
  }

  const [tempPhoto, setTempPhoto] = useState(null)

  const handleImageChange = () => {
    const file = userImageEl.current.files[0]
    const imageBlob = new Blob([file], { type: file.type })
    toast.info(
      'La imagen se visualizará de esta manera. Haz clic en "Actualizar foto" para que se reflejen los cambios.',
      { theme: 'colored' }
    )
    setTempPhoto(imageBlob)
  }

  return (
    <section>
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
      <section className='edit-user'>
        <header className='edit-user__header'>
          <LazyLoadImage
            loading='lazy'
            effect='blur'
            src={userData.picture || defaultImage}
            width={64}
            height={64}
            className='edit-user__image'
            alt={`Foto de Perfil de ${userData.name}}`}
          />
          <div className='user-data'>
            <strong className='user-data__name'>{userData.name} / Editar Perfil</strong>
            <span className='user-data__email'>{userData.email}</span>
          </div>
        </header>
        <form className='overlay-img' onSubmit={updateUserPhoto}>
          <LazyLoadImage
            loading='lazy'
            src={(tempPhoto && URL.createObjectURL(tempPhoto)) || userData.picture || defaultImage}
            width={56}
            height={56}
            className='edit-user__image'
            alt={`Foto de Perfil de ${userData.name}}`}
          />
          <label htmlFor='file'>
            <AiFillEdit /> <span>Editar foto</span>
          </label>
          <input
            type='file'
            id='file'
            accept='image/*'
            ref={userImageEl}
            onChange={handleImageChange}
          />
          <Button2 text='Actualizar foto' width={170} />
        </form>
        <Button text='Eliminar foto' width={170} innerOnClick={deleteUserPhoto} />
        {form === 'editUser'
          ? (
            <form className='edit-form' onSubmit={updateUserData}>
              <>
                <div className='edit-main-form main-form'>
                  <Input
                    innerOnChange={inputChange}
                    innerDefaultValue={userData.name}
                    text='Nombre'
                    nameID={'name'}
                    innerRef={nombreInputEl}
                  />
                  <Input
                    innerOnChange={inputChange}
                    innerDefaultValue={userData.lastname}
                    text='Apellidos'
                    nameID={'lastname'}
                    innerRef={apellidosInputEl}
                  />
                  <Input
                    innerOnChange={inputChange}
                    innerDefaultValue={userData.phoneNumber}
                    text='Número Celular'
                    type='number'
                    nameID={'phoneNumber'}
                    innerRef={numCelularInputEl}
                  />
                  <Input innerDefaultValue={userData.email} innerReadOnly={true} text='Correo' />
                  <Input
                    innerDefaultValue={userData.typeId}
                    innerReadOnly={true}
                    text='Tipo de Documento'
                  />
                  <Input
                    innerDefaultValue={userData.id}
                    innerReadOnly={true}
                    text='Número de Documento'
                  />
                  <a onClick={changePassword}>Cambiar contraseña</a>
                </div>
                <div className='edit-form__button'>
                  <Button2
                    text='Guardar'
                    textDisabled='Guardar'
                    disable={disabled}
                    animation={false}
                    width={220}
                  />
                </div>
              </>
            </form>
          )
          : (
            <form className='edit-form' onSubmit={updateUserPassword}>
              <>
                <div className='edit-main-form main-form'>
                  <div className='input-container actual-password'>
                    <Input
                      innerOnChange={inputChange}
                      text='Contraseña actual'
                      type={showContrasena ? 'password' : 'text'}
                      innerRef={contrasenaActualEl}
                    />
                    <div onClick={handleShowContrasenaClick}>
                      {showContrasena ? <FaEye className='eye' /> : <FaEyeSlash className='eye' />}
                    </div>
                  </div>
                  <div className='input-container'>
                    <Input
                      innerOnChange={inputChange}
                      text='Contraseña nueva'
                      type={showContrasena ? 'password' : 'text'}
                      innerRef={contrasenaNuevaEl}
                    />
                    <div onClick={handleShowContrasenaClick}>
                      {showContrasena ? <FaEye className='eye' /> : <FaEyeSlash className='eye' />}
                    </div>
                  </div>
                  <div className='input-container'>
                    <Input
                      innerOnChange={inputChange}
                      text='Confirmar contraseña'
                      type={showContrasena ? 'password' : 'text'}
                      innerRef={confirmarContrasenaEl}
                    />
                    <div onClick={handleShowContrasenaClick}>
                      {showContrasena ? <FaEye className='eye' /> : <FaEyeSlash className='eye' />}
                    </div>
                  </div>
                  <a onClick={changePassword}>Volver</a>
                </div>
                <div className='edit-form__button'>
                  <Button2
                    text='Guardar'
                    textDisabled='Guardar'
                    disable={disabled}
                    animation={false}
                    width={220}
                  />
                </div>
              </>
            </form>
          )}
      </section>
      <Footer />
    </section>
  )
}

export { EditUser }
