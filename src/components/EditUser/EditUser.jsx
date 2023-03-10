import './EditUser.css'

//? Components
import { Footer } from '../Home/Footer/Footer'
import { Button, Button2, Input, Navbar } from '../Utils'

//? Hooks
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'

//? Icons
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const EditUser = () => {
  //! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes | Editar Perfil')
  useEffect(() => {
    document.title = title
  }, [setTitle])

  //* Mostrar contraseña
  const [showContrasena, setShowContrasena] = useState(true)

  const handleShowContrasenaClick = () => {
    showContrasena ? setShowContrasena(false) : setShowContrasena(true)
  }

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
        name: data[0].nombre,
        lastname: data[0].apellidos,
        email: data[0].correo,
        phoneNumber: data[0].num_celular,
        id: data[0].num_documento
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
    console.log(e.target[0].value)
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
        <form className='edit-form' onSubmit={updateUserData}>
          {form === 'editUser' ? (
            <div className='edit-main-form main-form'>
              <Input innerOnChange={inputChange} innerDefaultValue={userData.name} text='Nombre' />
              <Input
                innerOnChange={inputChange}
                innerDefaultValue={userData.lastname}
                text='Apellidos'
              />
              <Input
                innerOnChange={inputChange}
                innerDefaultValue={userData.phoneNumber}
                text='Número Celular'
                type='number'
              />
              <Input
                innerOnChange={inputChange}
                innerDefaultValue={userData.email}
                innerReadOnly={true}
                text='Correo'
              />
              <Input
                innerOnChange={inputChange}
                innerDefaultValue={userData.id || 'No registrado'}
                innerReadOnly={true}
                text='Número de Documento'
              />
              <button onClick={changePassword}>Cambiar contraseña</button>
            </div>
          ) : (
            <div className='edit-main-form main-form'>
              <div className='input-container'>
                <Input
                  innerOnChange={inputChange}
                  text='Contraseña actual'
                  type={showContrasena ? 'password' : 'text'}
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
                />
                <div onClick={handleShowContrasenaClick}>
                  {showContrasena ? <FaEye className='eye' /> : <FaEyeSlash className='eye' />}
                </div>
              </div>
              <button onClick={changePassword}>Volver</button>
            </div>
          )}
          <div className='edit-form__button'>
            <Button2
              text='Guardar'
              textDisabled='Guardar'
              disable={disabled}
              animation={false}
              width={220}
            />
          </div>
        </form>
      </section>
      <Footer />
    </section>
  )
}

export { EditUser }
