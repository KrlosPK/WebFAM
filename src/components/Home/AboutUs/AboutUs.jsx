import './AboutUs.css'
import { Card } from '../../Utils'

//! Jsons
import aboutUsData from '../../../json/aboutUs.json'

const AboutUs = () => {
  return (
    <section className='about-us-container'>
      <div className='info'>
        <h2 className='info__title'>¡Los mejores servicios para nuestros clientes!</h2>
        <p className='info__subtitle'>
          En FADEMET tenemos en cuenta tus deseos y por ellos día a día nos esforzamos para hacer
          que nuestros servicios sean los mejor para ti.
        </p>
        <div className='cards'>
          {aboutUsData.map(({id, src, alt, title, description}) => (
            <Card
              key={id}
              src={src}
              alt={alt}
              title={title}
              description={description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { AboutUs }
