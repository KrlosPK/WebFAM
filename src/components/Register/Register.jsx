import './Register.css'
import { Link } from 'react-router-dom'
import { Button } from '../Utils'

const Register = () => {
	return (
		<div className='login-div'>
			<header className='login-header'>
				<img
					src='../assets/WebFAM_logo.png'
					width={120}
					alt='WebFAM logo'
				/>
				<Link className='go-back' to='/'>
					← Volver
				</Link>
			</header>
			<hr className='header-line' />
			<section className='login-form'>
				<div className='register-label'>
					<p>Regístrate</p>
				</div>
				<form className='second-login'>
					<div className='main-form'>
						<label className='input-login'>
							Correo electrónico
						</label>
						<input type='text' placeholder='Correo electrónico' />
						<label className='input-login'>Contraseña</label>
						<input type='password' placeholder='Contraseña' />
						<label className='input-login'>
							Confirmar Contraseña
						</label>
						<input
							type='password'
							placeholder='Confirmar Contraseña'
						/>
					</div>
					<div className='register'>
						<Button text={'Registrarse'} />
					</div>
				</form>
			</section>
			<div className='breaker-footer' />
			<section className='register-section'>
				<h4>¿Ya tienes cuenta?</h4>
				<Link to={'/Login'}>
					<button>Inicia sesión</button>
				</Link>
			</section>
		</div>
	)
}

export { Register }
