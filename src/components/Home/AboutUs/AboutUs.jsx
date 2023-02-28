import './AboutUs.css'
import { Card } from '../../Utils'

const AboutUs = ({ src, alt, title, description }) => {
  return (
    <section className='about-us-container'>
      <div className='info'>
        <h2 className='info__title'>¡Los mejores servicios para nuestros clientes!</h2>
        <p className='info__subtitle'>
          En FADEMET tenemos en cuenta tus deseos y por ellos día a día nos esforzamos para hacer
          que nuestros servicios sean los mejor para ti.
        </p>
        <div className='cards'>
          {title.map((product, i) => (
            <Card
              key={product}
              src={src[i]}
              alt={alt[i]}
              title={product}
              description={description[i]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { AboutUs }
