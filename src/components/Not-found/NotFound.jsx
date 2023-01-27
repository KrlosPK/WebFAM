import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<section className='nf-container'>
			<img src='assets/error-404.png' alt='error 404 page not found' />
			<h2>Hola</h2>
			<Link className='go-back' to='/'>
				← Volver
			</Link>
		</section>
	);
};

export { NotFound };
