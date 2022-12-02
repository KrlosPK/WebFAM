// Styles
import './Navbar.css';

// Components
import { Button } from '../Assets/Button';

// React Icons
import { FcHome } from 'react-icons/fc'; // Inicio
import { FcAssistant } from 'react-icons/fc'; // Usuarios
import { FcTodoList } from 'react-icons/fc'; // Servicios
import { FcTwoSmartphones } from 'react-icons/fc'; // Productos
import { FcConferenceCall } from 'react-icons/fc'; // Roles
import { FcPositiveDynamic } from 'react-icons/fc'; // Facturas
import { FcOnlineSupport } from 'react-icons/fc'; // Citas

// Hooks
import { useState } from 'react';

const Navbar = () => {
	const [navIsClicked, setNavIsClicked] = useState('clicked');
	let navClassName = 'navigation';
	navClassName += navIsClicked === 'clicked' ? ' close-menu' : '';

	const [buttonIsClicked, setButtonIsClicked] = useState('');
	let buttonClassName = 'menu__button';
	buttonClassName += buttonIsClicked === 'clicked' ? ' hover' : '';

	const handleClick = () => {
		navIsClicked ? setNavIsClicked('') : setNavIsClicked('clicked');

		buttonIsClicked
			? setButtonIsClicked('')
			: setButtonIsClicked('clicked');
	};

	return (
		<>
			<nav>
				<div className='menu'>
					<div className={navClassName}>
						<a href='' className='flex gap'>
							Inicio
							<FcHome />
						</a>
						<a href='' className='flex gap'>
							Productos
							<FcTwoSmartphones />
						</a>
						<a href='' className='flex gap'>
							Servicios
							<FcTodoList />
						</a>
						<a href='' className='flex gap'>
							Usuarios
							<FcAssistant />
						</a>
						<a href='' className='flex gap'>
							Roles
							<FcConferenceCall />
						</a>
						<a href='' className='flex gap'>
							Facturas
							<FcPositiveDynamic />
						</a>
						<a href='' className='flex gap'>
							Citas
							<FcOnlineSupport />
						</a>
						<Button
							width={120}
							className='ingresar'
							text='Ingresar'
						/>
					</div>
					<button className={buttonClassName} onClick={handleClick}>
						<div></div>
						<div></div>
						<div></div>
					</button>
				</div>
				<ul className='left'>
					<li>
						<a href='' className='flex gap'>
							Inicio
							<FcHome />
						</a>
					</li>
					<li>
						<a href='' className='flex gap'>
							Productos
							<FcTwoSmartphones />
						</a>
					</li>
					<li>
						<a href='' className='flex gap'>
							Servicios
							<FcTodoList />
						</a>
					</li>
					<li>
						<a href='' className='flex gap'>
							Usuarios
							<FcAssistant />
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
						<a href='' className='flex gap'>
							Roles
							<FcConferenceCall />
						</a>
					</li>
					<li>
						<a href='' className='flex gap'>
							Facturas
							<FcPositiveDynamic />
						</a>
					</li>
					<li>
						<a href='' className='flex gap'>
							Citas
							<FcOnlineSupport />
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
	);
};

export { Navbar };
