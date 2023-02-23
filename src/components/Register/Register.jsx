import './Register.css'
import { Link } from 'react-router-dom'
import { Button } from '../Utils'

//? Hooks
import { useState } from 'react'

const Register = () => {
	const [body, setBody] = useState({ username: '', password: '' })

	const inputChange = ({ target }) => {
		const { name, value } = target
		setBody({
			...body,
			[name]: value
		})
	}

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
						<div className='container'>
							<input className='input-login' type='text' />
							<label className='label-login'>Nombre</label>
						</div>

						<div className='container'>
							<input className='input-login' type='text' />
							<label className='label-login'>Apellidos</label>
						</div>

						<div className='container'>
							<input
								className='input-login'
								type='email'
								value={body.username}
								onChange={inputChange}
								name='username'
							/>
							<label className='label-login'>
								Correo electrónico
							</label>
						</div>

						<div className='container'>
							<input className='input-login' type='number' />
							<label className='label-login'>
								Número de Celular
							</label>
						</div>

						<div className='container'>
							<input className='input-login' type='text' />
							<label className='label-login'>
								Tipo Documento
							</label>
						</div>

						<div className='container'>
							<input className='input-login' type='number' />
							<label className='label-login'>
								Número de Documento
							</label>
						</div>

						<div className='container'>
							<input
								className='input-login'
								type='password'
								value={body.password}
								onChange={inputChange}
								name='password'
							/>
							<label className='label-login'>Contraseña</label>
						</div>
					</div>
					<div className='register'>
						<Button text={'Registrarse'} />
					</div>
				</form>
			</section>
			<div className='breaker-footer' />
			<section className='register-section'>
				<h4>¿Ya tienes cuenta?</h4>
				<Link to={'/login'}>
					<button>Inicia sesión</button>
				</Link>
			</section>
		</div>
	)
}

export { Register }
