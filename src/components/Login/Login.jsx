import './Login.css'
import { Link } from 'react-router-dom'
import { Button, Button2, Input } from '../Utils'

//? Hooks
import { useState, useRef } from 'react'

//? Library
import { useToasts } from 'react-toast-notifications'

//? Icons
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { AiFillFacebook } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

const Login = () => {
	//* Mostrar contraseña
	const [showPassword, setShowPassword] = useState(true)

	const handleShowPasswordClick = () => {
		showPassword ? setShowPassword(false) : setShowPassword(true)
	}

	//TODO ----------------------------------------------------------
	//TODO Separar la función en un componente a parte (Utils)
	//? TOAST NOTIFICATIONS
	const { addToast, removeAllToasts } = useToasts()

	// Función para hacer focus en el input que no cumpla con los requisitos
	const focusInput = (input) => input.current.focus()

	// Variables para hacer la validación
	const emailInputEl = useRef(null)
	const passwordInputEl = useRef(null)

	const validateLogin = (e) => {
		e.preventDefault()

		const email = e.target[0].value
		const password = e.target[1].value

		/*
			Con el operador ?= (look ahead) compruebas que:
				* Exista al menos 1 número (?:.*[0-9]){1}
				* Exista al menos 1 mayúscula (?:.*[A-Z]){1}
				* Exista al menos 1 minúscula (?:.*[a-z]){1}

			? Con el cuantificador {8,} indicas que debe tener una longitud mínima de 8 sin límite máximo.

			? Con \S no permite espacios en blanco.
		*/
		const regexPassword =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!\s)[a-zA-Z\d]{8,16}$/

		// Validación Correo
		if (email.length === 0 || /^\s+$/.test(email)) {
			e.preventDefault()

			addToast('¡El correo no puede estar vacío!', {
				appearance: 'error',
				autoDismiss: true,
				autoDismissTimeout: 6000,
				transitionDuration: 700
			})
			removeAllToasts()

			focusInput(emailInputEl)
		} else if (!/\S+@\S+/.test(email)) {
			e.preventDefault()

			addToast('¡El correo debe contener "@dominio.com"!', {
				appearance: 'error',
				autoDismiss: true,
				autoDismissTimeout: 6000,
				transitionDuration: 700
			})
			removeAllToasts()

			focusInput(emailInputEl)
		} else if (!/\S+\.\S+/.test(email)) {
			e.preventDefault()

			addToast('¡El correo debe contener "@dominio.com"!', {
				appearance: 'error',
				autoDismiss: true,
				autoDismissTimeout: 6000,
				transitionDuration: 700
			})
			removeAllToasts()

			focusInput(emailInputEl)
		}

		// Validación Contraseña
		else if (password.length === 0 || /^\s+$/.test(password)) {
			e.preventDefault()

			addToast('¡La contraseña no puede estar vacía!', {
				appearance: 'error',
				autoDismiss: true,
				autoDismissTimeout: 6000,
				transitionDuration: 700
			})
			removeAllToasts()

			focusInput(passwordInputEl)
		} else if (!regexPassword.test(password)) {
			e.preventDefault()

			addToast(
				'¡La contraseña debe tener entre 8 y 16 caracteres, una mayúscula, una minúscula y un número!',
				{
					appearance: 'error',
					autoDismiss: true,
					autoDismissTimeout: 6000,
					transitionDuration: 700
				}
			)
			removeAllToasts()

			focusInput(passwordInputEl)
		}
		//TODO Axios
	}
	//TODO ----------------------------------------------------------

	//*
	const [body, setBody] = useState({ correo: '', contrasena: '' })

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
							nameID='correo'
							value={body.correo}
							innerRef={emailInputEl}
							onChange={inputChange}
						/>
						<div className='input-container'>
							<Input
								text='Contraseña'
								type={showPassword ? 'password' : 'text'}
								nameID='contrasena'
								value={body.contrasena}
								innerRef={passwordInputEl}
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
					<div className='forgot-password'>
						<Link to={'/'}>¿Olvidaste tú contraseña?</Link>
					</div>
					<div className='remind-me'>
						<input type='checkbox' name='check' id='check' />
						<label htmlFor='check'></label>
						<Button text={'Ingresar'} />
					</div>
				</form>
			</section>
			<div className='breaker-footer' />
			<section className='register-section'>
				<h4>¿Aún no tienes cuenta?</h4>
				<Link to={'/register'}>
					<Button2 text='Regístrate' />
				</Link>
			</section>
		</div>
	)
}

export { Login }
