import './InfoUserEdit.css'
import { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SessionContext } from '../../../context/SessionContext'
import { API_URL, Button, Button2, Input, Navbar, ResponsiveNav, storage, validatePassword } from '../../Utils'
import { Footer } from '../../Home/Footer/Footer'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { uuidv4 } from '@firebase/util'
import axios from 'axios'
import { AiFillEdit } from 'react-icons/ai'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const InfoUserEdit = () => {
  // ? Context
  const { session, tempSession } = useContext(SessionContext)

  // * States
  const [button, setButton] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [form, setForm] = useState('editUser')
  const [showContrasena, setShowContrasena] = useState(true)

  // * Params
  const { id } = useParams()

  // * Refs
  //* Variables para hacer la validación
  const contrasenaActualEl = useRef(null)
  const contrasenaNuevaEl = useRef(null)
  const confirmarContrasenaEl = useRef(null)

  const nombreInputEl = useRef(null)
  const apellidosInputEl = useRef(null)
  const numCelularInputEl = useRef(null)

  const defaultImage = '/default-avatar.png'

  // * Obtener usuario para cambiar sus datos
  const [userData, setUserData] = useState(null)

  const getUserData = () => {
    axios.get(API_URL(`usuarios/${id}`, { id_usuario: id }))
      .then(({ data }) => {
        const [infoUser] = data.user
        setUserData({
          id_usuario: infoUser.id_usuario,
          name: infoUser.nombre,
          lastname: infoUser.apellidos,
          email: infoUser.correo,
          phoneNumber: infoUser.num_celular,
          id: infoUser.num_documento,
          typeId: infoUser.tipo_documento,
          picture: infoUser.foto_perfil
        })
      })
  }

  useEffect(() => {
    id && getUserData()
  }, [id])

  useEffect(() => {
    !session ? setButton(1) : setButton(2)
    !tempSession ? setButton(1) : setButton(2)
  }, [session, tempSession])

  // ! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes | Editar usuario')

  useEffect(() => {
    // ? Scroll to top
    window.scrollTo(0, 0)
    document.title = title
  }, [setTitle])

  const [tempPhoto, setTempPhoto] = useState(null)
  const userImageEl = useRef(null)

  const handleImageChange = () => {
    const file = userImageEl.current.files[0]
    const imageBlob = new Blob([file], { type: file.type })
    toast.info(
      'La imagen se visualizará de esta manera. Por favor, haz clic en "Actualizar foto" para que se reflejen los cambios.',
      { theme: 'colored' }
    )
    setTempPhoto(imageBlob)
  }

  const focusInput = (input) => input.current.focus()

  const handleShowContrasenaClick = () => {
    showContrasena ? setShowContrasena(false) : setShowContrasena(true)
  }

  const uploadUserPhoto = async (e) => {
    e.preventDefault()

    if (!userImageEl.current.files[0] || userImageEl.current.files[0].length === 0) {
      toast.error('¡Debes seleccionar una imagen!', {
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
        getUserData()
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
      contrasenaNueva: e.target[0].value,
      confirmarContrasena: e.target[1].value
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
      .patch(API_URL(`recuperarContrasena/${userData.id_usuario}`), {
        contrasena: data.contrasenaNueva
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
          getUserData()
        })
      })
      .catch(() => {
        toast.error('¡Hubo un error al actualizar la foto de perfil!', {
          theme: 'colored'
        })
      })
  }

  const changePassword = () => {
    form === 'editUser' ? setForm('changePassword') : setForm('editUser')
  }

  const deleteUserPhoto = () => {
    axios
      .patch(API_URL(`editarUsuario/${userData.id_usuario}`), {
        foto_perfil: ''
      })
      .then(async () => {
        toast.success(
          '¡Imagen eliminada correctamente! Algunos cambios aún no se verán reflejados',
          {
            theme: 'colored'
          }
        )
        axios.post(API_URL(`nuevoToken/${userData.id_usuario}`)).then(({ data }) => {
          // const { token } = data

          // setTokenData(token)

          getUserData()
        })
      })
      .catch(() => {
        toast.error('¡Hubo un error al eliminar la foto de perfil!', {
          theme: 'colored'
        })
      })
  }

  const inputChange = () => setDisabled(false)

  return (
    <>
      <ResponsiveNav
        linkText={
          ['Inicio', 'Agendas', 'Servicios']
        }
        linkUrl= {['/', '/citas', '/services']}
        renderButtons={button}
      />
      <Navbar
        linkText={['Inicio', 'Agendas', 'Servicios']}
        linkUrl= {['/', '/citas', '/services']}
        renderButtons={button}
      />
      <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} />
      {userData && (
        <section className='edit-user'>
          <header className='edit-user__header'>
            <LazyLoadImage
              loading='lazy'
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
      )}
      <Footer />
    </>
  )
}

export { InfoUserEdit }
