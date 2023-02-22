import './NotFound.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<section className='nf-container'>
			<img
				src='../public/assets/error-404.png'
				alt='error 404 page not found'
			/>
			<Link className='go-back' to='/'>
				← Volver
			</Link>
		</section>
	)
}

export { NotFound }
