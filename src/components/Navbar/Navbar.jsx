// Styles
import './Navbar.css'

// Components
import { Button } from '../Utils'

// Hooks
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	const [navIsClicked, setNavIsClicked] = useState('clicked')
	let navClassName = 'navigation'
	navClassName += navIsClicked === 'clicked' ? ' close-menu' : ''

	const [buttonIsClicked, setButtonIsClicked] = useState('')
	let buttonClassName = 'menu__button'
	buttonClassName += buttonIsClicked === 'clicked' ? ' hover' : ''

	const handleClick = () => {
		navIsClicked ? setNavIsClicked('') : setNavIsClicked('clicked')

		buttonIsClicked ? setButtonIsClicked('') : setButtonIsClicked('clicked')
	}

	return (
		<>
			<nav>
				<div className='menu'>
					<div className={navClassName}>
						<a href='' className='flex gap'>
							Inicio
						</a>
						<a href='' className='flex gap'>
							Productos
						</a>
						<a href='' className='flex gap'>
							Servicios
						</a>
						<a href='' className='flex gap'>
							Usuarios
						</a>
						<a href='' className='flex gap'>
							Roles
						</a>
						<a href='' className='flex gap'>
							Facturas
						</a>
						<a href='' className='flex gap'>
							Citas
						</a>
						<Link to='/login'>
							<Button
								className='ingresar'
								text='Ingresar'
								width={120}
							/>
						</Link>
					</div>
					<button className={buttonClassName} onClick={handleClick}>
						<div></div>
						<div></div>
						<div></div>
					</button>
				</div>
				<ul className='left'>
					<li>
						<a href='' className='flex gap fade-gray'>
							Inicio
						</a>
					</li>
					<li>
						<a href='' className='flex gap fade-gray'>
							Productos
						</a>
					</li>
					<li>
						<a href='' className='flex gap fade-gray'>
							Servicios
						</a>
					</li>
					<li>
						<a href='' className='flex gap fade-gray'>
							Usuarios
						</a>
					</li>
				</ul>
				<ul className='logo'>
					<img
						src='assets/WebFAM_logo.png'
						width={120}
						alt='WebFAM logo'
					/>
				</ul>
				<ul className='right'>
					<li>
						<a href='' className='flex gap fade-gray'>
							Roles
						</a>
					</li>
					<li>
						<a href='' className='flex gap fade-gray'>
							Facturas
						</a>
					</li>
					<li>
						<a href='' className='flex gap fade-gray'>
							Citas
						</a>
					</li>
					<li>
						<Link to='/login'>
							<Button text='Ingresar' />
						</Link>
					</li>
				</ul>
			</nav>
			<div className='wrapper'></div>
		</>
	)
}

export { Navbar }
