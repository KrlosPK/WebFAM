import './Navbar.css'

// Components
import { Button } from './Button'

// React Icons
import { FcHome } from 'react-icons/fc' // Inicio
import { FcAssistant } from 'react-icons/fc' // Usuarios
import { FcTodoList } from 'react-icons/fc' // Servicios
import { FcTwoSmartphones } from 'react-icons/fc' // Productos
import { FcConferenceCall } from 'react-icons/fc' // Roles
import { FcPositiveDynamic } from 'react-icons/fc' // Facturas
import { FcOnlineSupport } from 'react-icons/fc' // Citas
import { useState } from 'react'

const Navbar = () => {
	const [isClicked, setIsClicked] = useState('clicked')
	let buttonClassName = 'menu__button '
	buttonClassName += isClicked === 'clicked' ? 'open-menu' : ''

	const handleClick = () => {
		isClicked ? setIsClicked('') : setIsClicked('clicked')
		console.log(isClicked)
	}

	return (
		<>
			<nav>
				<div className='menu'>
					<div className={'navigation ' + buttonClassName}>
						<a href='' className='flex gap'>
							<FcHome />
							Inicio
						</a>
						<a href='' className='flex gap'>
							<FcTwoSmartphones />
							ola
						</a>
						<a href='' className='flex gap'>
							<FcTodoList />
							Servicios
						</a>
						<a href='' className='flex gap'>
							<FcAssistant />
							Usuarios
						</a>
						<a href='' className='flex gap'>
							<FcConferenceCall />
							Roles
						</a>
						<a href='' className='flex gap'>
							<FcPositiveDynamic />
							Facturas
						</a>
						<a href='' className='flex gap'>
							<FcOnlineSupport />
							Citas
						</a>
						<a href=''>
							<Button text='Ingresar' />
						</a>
					</div>
					<button className='menu__button' onClick={handleClick}>
						<div></div>
						<div></div>
						<div></div>
					</button>
				</div>
				<ul className='left'>
					<li>
						<a href='' className='flex gap'>
							<FcHome />
							Inicio
						</a>
					</li>
					<li>
						<a href='' className='flex gap'>
							<FcTwoSmartphones />
							Productos
						</a>
					</li>
					<li>
						<a href='' className='flex gap'>
							<FcTodoList />
							Servicios
						</a>
					</li>
					<li>
						<a href='' className='flex gap'>
							<FcAssistant />
							Usuarios
						</a>
					</li>
				</ul>
				<ul className='logo'>
					<img src='assets/WebFAM_logo.png' width={120} alt='WebFAM logo' />
				</ul>
				<ul className='right'>
					<li>
						<a href='' className='flex gap'>
							<FcConferenceCall />
							Roles
						</a>
					</li>
					<li>
						<a href='' className='flex gap'>
							<FcPositiveDynamic />
							Facturas
						</a>
					</li>
					<li>
						<a href='' className='flex gap'>
							<FcOnlineSupport />
							Citas
						</a>
					</li>
					<li>
						<a href=''>
							<Button text='Ingresar' />
						</a>
					</li>
				</ul>
			</nav>
			<div className='wrapper'></div>
		</>
	)
}

export { Navbar }
