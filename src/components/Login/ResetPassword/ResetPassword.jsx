import './ResetPassword.css'

//? Components
import { Button, Input, Navbar } from '../../Utils'
// import { ToastContainer, toast, Zoom } from 'react-toastify'

const ResetPassword = () => {
  return (
    <main className='reset-password'>
      {/* <ToastContainer transition={Zoom} limit={3} pauseOnFocusLoss={false} /> */}
      <Navbar
        elementTextLeft={['Inicio']}
        urlLeft={['/']}
        elementTextRight={['']}
        urlRight={['']}
        renderButtons={3}
      />
      <section className='reset-password__container'>
        <div className='reset-password__card'>
          <div className='container__image'>
            <img src='/recover-password-reset.png' alt='Correo para recuperar la contraseña' />
          </div>
          <div className='container__title'>
            <h1>¡Reestable tu contraseña!</h1>
          </div>
          <div className='container__text'>
            <p>¡Es hora de renovarse! crea una nueva clave secreta.</p>
          </div>
          <form className='container__form'>
            <div className='main-form'>
              <Input
                text='Nueva contraseña'
                innerId='correo'
                type='password'
                nameID='correo'
                // value={body.correo}
                // innerRef={correoInputEl}
                // innerOnChange={inputChange}
              />
              <Input
                text='Confirmar nueva contraseña'
                innerId='correo'
                type='password'
                nameID='correo'
                // value={body.correo}
                // innerRef={correoInputEl}
                // innerOnChange={inputChange}
              />
              <Button text={'Verificar'} textDisabled={'Cargando'} />
              {/* disable={disabled}  */}
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export { ResetPassword }
