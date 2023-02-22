import './login.css';
import { Link } from 'react-router-dom';
import { Button } from '../Utils';

//? Icons
import { AiFillFacebook } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
	return (
		<div className='login-div'>
			<header className='login-header'>
				<img
					src='assets/WebFAM_logo.png'
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
							<FcGoogle /> Continúa con<div className='google_gradient'>Google</div>
						</button>
					</div>
					<div className='between-session'>
						<div className='line-breaker' />
						<p>ó</p>
						<div className='line-breaker' />
					</div>
				</div>
				<form className='second-login'>
					<div className='main-form'>
						<label className='input-login'>Correo o usuario</label>
						<input type='text' placeholder='Correo o usuario' />
						<label className='input-login'>Contraseña</label>
						<input type='password' placeholder='Contraseña' />
					</div>
					<div className='forgot-password'>
						<Link to={'recuperar-contraseña'}>
							¿Olvidaste tú contraseña?
						</Link>
					</div>
					<div className='remind-me'>
						<div>
							{/* TODO: Terminar que cuando esté activo cambie el color */}
							<input type='checkbox' name='check' id='check' />
							<label htmlFor='check'>Recuérdame</label>
						</div>
						<Button text={'INGRESAR'} />
					</div>
				</form>
			</section>
			<div className='breaker-footer' />
			<section className='register-section'>
				<h4>¿Aún no tienes cuenta?</h4>
				<button>Regístrate</button>
			</section>
		</div>
	);
};

export { Login };
