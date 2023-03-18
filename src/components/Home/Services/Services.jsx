import './ServicesSection.css'

// ? Components
import { Button } from '../../Utils'
import { Link } from 'react-router-dom'

//* Libraries
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const ServicesSection = () => {
  return (
    <section className='services-info-card'>
      <div className='service-info-card__left'>
        <LazyLoadImage effect='blur' src='/services-haz.png' loading='lazy' alt='Haz' />
        <LazyLoadImage
          effect='blur'
          src='/services-mini-soldador.png'
          loading='lazy'
          alt='Mini soldador'
        />
      </div>
      <div className='middle'>
        <h2 className='services-info-card__title'>¡Proyectos recientes!</h2>
        <p className='services-info-card__text'>
          Revisa nuestros trabajos y comprueba la calidad y compromiso que ponemos en
          cada uno de ellos.
        </p>
        <Link to='/services'>
          <Button text='Servicios' />
        </Link>
      </div>
      <div className='service-info-card__right'>
        <LazyLoadImage
          effect='blur'
          src='/services-sierra-de-mano.png'
          loading='lazy'
          alt='Sierra de mano'
        />
        <LazyLoadImage effect='blur' src='/services-pergola.png' loading='lazy' alt='Pérgola' />
      </div>
    </section>
  )
}

export { ServicesSection }
