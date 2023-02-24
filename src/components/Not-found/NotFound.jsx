import './NotFound.css'
import { Link } from 'react-router-dom'
import { Button } from '../Utils'

const NotFound = () => {
  return (
    <section className='nf-container flex'>
      <img src='/error-404.png' alt='error 404 page not found' />
      <div className='nf-container__text flex'>
        <h1>404 - Página no encontrada</h1>
        <p>La página que estás buscando no existe o su ruta ha cambiado.</p>
        <Link to='/' className='inicio'>
          <Button text={'Volver al inicio'} />
        </Link>
      </div>
    </section>
  )
}

export { NotFound }
