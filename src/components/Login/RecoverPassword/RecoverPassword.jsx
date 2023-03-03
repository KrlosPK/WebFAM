import './RecoverPassword.css'

const RecoverPassword = () => {
  return (
    <div className='recover-password'>
      <ResponsiveNav elementText={['Inicio']} url={['/']} />
      <Navbar
        elementTextLeft={['Inicio']}
        urlLeft={['/']}
        elementTextRight={['']}
        urlRight={['']}
        renderButtons={3}
      />
      <hr className='header-line' />
      <section className='login-form'>
        <div className='first-login'>
          <p>Para continuar, inicie sesión</p>
          <div className='buttons'>
            <button className='Login-button button_fb'>
              <AiFillFacebook /> Continúa con Facebook
            </button>
            <button className='Login-button button_gg'>
              <FcGoogle /> Continúa con
              <div className='google_gradient'>Google</div>
            </button>
          </div>
          <div className='between-session'>
            <div className='line-breaker' />
            <p>ó</p>
            <div className='line-breaker' />
          </div>
        </div>
        <form className='second-login' onSubmit={validateLogin}>
          <div className='main-form'>
            <Input
              text='Correo electrónico'
              innerId='correo'
              type='email'
              nameID='correo'
              value={body.correo}
              innerRef={correoInputEl}
              innerOnChange={inputChange}
            />
            <div className='input-container'>
              <Input
                text='Contraseña'
                innerId='contrasena'
                type={showContrasena ? 'password' : 'text'}
                nameID='contrasena'
                value={body.contrasena}
                innerRef={contrasenaInputEl}
                innerOnChange={inputChange}
              />
              <div onClick={handleShowContrasenaClick}>
                {showContrasena ? <FaEye className='eye' /> : <FaEyeSlash className='eye' />}
              </div>
            </div>
          </div>
          <div className='forgot-password'>
            <Link to={'/'}>¿Olvidaste tú contraseña?</Link>
          </div>
          <div className='remind-me'>
            <input type='checkbox' name='check' id='check' onClick={setCookie} />
            <label htmlFor='check'></label>
            <Button text={'Ingresar'} textDisabled={'Cargando'} disable={disabled} />
          </div>
        </form>
      </section>
      <div className='breaker-footer' />
      <section className='register-section'>
        <h4>¿Aún no tienes cuenta?</h4>
        <Link to={'/register'}>
          <Button2 text='Regístrate' width={280} />
        </Link>
      </section>
    </div>
  )
}

export { RecoverPassword }
