import './Register.css'
import { Link } from 'react-router-dom'
import { Button, Input, Select } from '../Utils'

//? Hooks
import { useState, useRef } from 'react'

//? Library
import { useToasts } from 'react-toast-notifications'

//? Icons
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

const Register = () => {
	//* Mostrar contraseña
	const [showPassword, setShowPassword] = useState(true)

	const handleShowPasswordClick = () => {
		showPassword ? setShowPassword(false) : setShowPassword(true)
	}

	// Función para hacer focus en el input que no cumpla con los requisitos
	const focusInput = (input) => input.current.focus()

	// Variables para hacer la validación
	const nombreInputEl = useRef(null)
	const apellidosInputEl = useRef(null)
	const correoInputEl = useRef(null)
	const numCelularInputEl = useRef(null)
	const tipoDocumentoInputEl = useRef(null)
	const numDocumentoInputEl = useRef(null)
	const contrasenaInputEl = useRef(null)

	//? TOAST NOTIFICATIONS
	const { addToast, removeAllToasts } = useToasts()

	const [body, setBody] = useState({
		nombre: '',
		apellidos: '',
		correo: '',
		num_celular: '',
		num_documento: '',
		contrasena: ''
	})

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
						<Input
							text='Nombre'
							nameID='nombre'
							value={body.nombre}
							onChange={inputChange}
						/>

						<Input
							text='Apellidos'
							nameID='apellidos'
							value={body.apellidos}
							onChange={inputChange}
						/>

						<Input
							text='Correo'
							nameID='correo'
							value={body.correo}
							onChange={inputChange}
						/>

						<Input
							text='Número celular'
							type='number'
							nameID='num_celular'
							value={body.num_celular}
							onChange={inputChange}
						/>

						<Select text='Tipo de Documento' />

						<Input
							text='Número de Documento'
							type='number'
							nameID='num_documento'
							value={body.num_documento}
							onChange={inputChange}
						/>

						<div className='input-container'>
							<Input
								text='Contraseña'
								nameID='contrasena'
								type={showPassword ? 'password' : 'text'}
								value={body.contrasena}
								onChange={inputChange}
							/>
							<div onClick={handleShowPasswordClick}>
								{showPassword ? (
									<FaEye className='eye' />
								) : (
									<FaEyeSlash className='eye' />
								)}
							</div>
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
