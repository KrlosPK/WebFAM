import './EditUser.css'

// ? Components
import { Footer } from '../Home/Footer/Footer'
import { API_URL, Button2, Input, Navbar, validatePassword, setTokenData } from '../Utils'

// ? Hooks
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useState, useEffect, useRef } from 'react'
import jwtDecode from 'jwt-decode'

//* Libraries
import axios from 'axios'
import { ToastContainer, toast, Zoom } from 'react-toastify'

// ? Icons
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const EditUser = () => {
  // ! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes | Editar Perfil')
  useEffect(() => {
    document.title = title
  }, [setTitle])

  //* Mostrar contraseña
  const [showContrasena, setShowContrasena] = useState(true)

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

  const [userData, setUserData] = useState({})
  const defaultImage = '/default-avatar.png'

  const getUserData = async () => {
    const cookies = document.cookie
    const tokenCookie = cookies.split('; ').find((cookie) => cookie.startsWith('token='))
    let token = null
    if (!tokenCookie) return null
    token = tokenCookie.split('=')[1]

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
        typeId: data[0].tipo_documento
      })
    } else {
      const { given_name, picture, family_name, email } = decoded
      setUserData({ ...userData, name: given_name, lastname: family_name, picture, email })
    }
  }

  useEffect(() => {
    //* Get User Data from API
    getUserData()
  }, [])

  const updateUserData = (e) => {
    e.preventDefault()

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

      return
    } else if (apellidos.length === 0 || /^\s+$/.test(apellidos)) {
      // Validación Apellidos
      toast.error('¡Los Apellidos no puede estar vacío!', {
        theme: 'colored'
      })

      focusInput(apellidosInputEl)

      return
    } else if (apellidos.length < 3) {
      toast.error('¡Los Apellidos deben tener mínimo 3 letras!', {
        theme: 'colored'
      })

      focusInput(apellidosInputEl)

      return
    } else if (num_celular.length === 0) {
      // Validación Número de Celular
      toast.error('¡El Número de Celular no puede estar vacío!', {
        theme: 'colored'
      })

      focusInput(numCelularInputEl)

      return
    } else if (num_celular.length < 9 || num_celular.length >= 12) {
      e.preventDefault()

      toast.error('¡El Número de Celular debe tener entre 9 y 11 dígitos!', {
        theme: 'colored'
      })

      focusInput(numCelularInputEl)

      return
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

        /* const cookies = document.cookie
        const tokenCookie = cookies.split('; ').find((cookie) => cookie.startsWith('token='))
        let token = null
        if (!tokenCookie) return null
        token = tokenCookie.split('=')[1] */

        axios
          .post(API_URL(`nuevoToken/${userData.id_usuario}`))
          .then((res) => {
            const { Authorization } = res.data.Headers

            if (res.status === 200) {
              setTokenData(Authorization)

              getUserData()
            }
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

    const regexContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@¡!/¿?_\-*$%&=ñÑ]{8,16}$/

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

      return
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

  const [disabled, setDisabled] = useState(true)

  const inputChange = () => {
    setDisabled(false)
  }

  const [form, setForm] = useState('editUser')

  const changePassword = () => {
    form === 'editUser' ? setForm('changePassword') : setForm('editUser')
  }

  return (
    <section>
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      <Navbar renderButtons={3} />
      <section className='edit-user'>
        <header className='edit-user__header'>
          <LazyLoadImage
            loading='lazy'
            src={userData.picture || defaultImage}
            width={55}
            height={55}
            className='edit-user__image'
            alt=''
          />
          <div className='user-data'>
            <strong className='user-data__name'>{userData.name} / Editar Perfil</strong>
            <span className='user-data__email'>{userData.email}</span>
          </div>
        </header>
        {form === 'editUser'
          ? (
            <form className='edit-form' onSubmit={updateUserData}>
              <>
                <div className='edit-main-form main-form'>
                  <Input
                    innerOnChange={inputChange}
                    innerDefaultValue={userData.name}
                    text='Nombre'
                    innerRef={nombreInputEl}
                  />
                  <Input
                    innerOnChange={inputChange}
                    innerDefaultValue={userData.lastname}
                    text='Apellidos'
                    innerRef={apellidosInputEl}
                  />
                  <Input
                    innerOnChange={inputChange}
                    innerDefaultValue={userData.phoneNumber}
                    text='Número Celular'
                    type='number'
                    innerRef={numCelularInputEl}
                  />
                  <Input
                    innerOnChange={inputChange}
                    innerDefaultValue={userData.email}
                    innerReadOnly={true}
                    text='Correo'
                  />
                  <Input
                    innerOnChange={inputChange}
                    innerDefaultValue={userData.typeId}
                    innerReadOnly={true}
                    text='Tipo de Documento'
                  />
                  <Input
                    innerOnChange={inputChange}
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
