import './Services.css'

//? JSON
import data from './services.json'

//* Libraries
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Services = () => {
  return (
    <section className='services'>
      {data.map(({ id, name, url }) => (
        <div className='service' key={id}>
          <div className='service__image'>
            <LazyLoadImage src={url} effect='blur' loading='lazy' alt={name} />
          </div>
          <div className='service__text'>{name}</div>
        </div>
      ))}
    </section>
  )
}

export { Services }
