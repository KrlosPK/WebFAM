import './AboutUs.css'
import { Card } from '../../Utils'

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
          <Card
            src='/asesoría.jpg'
            alt='Empleado de FADEMET Soldando una Escalera de Metal'
            title={'Asesoría'}
            description={'Te asesoramos y recomendamos lo mejor para ti'}
          />
          <Card
            src='/diseño.jpg'
            alt='Puerta de Madera desplegable diseñada por FADEMET'
            title={'Diseño'}
            description={'Llevamos tus ideas a la realidad'}
          />
          <Card
            src='/fabricación.jpg'
            alt='Estructura planificada y ensamblada por FADEMET'
            title={'Fabricación'}
            description={'Elaboramos con amor y dedicación'}
          />
          <Card
            src='/ingeniería.jpg'
            alt='Empleado de FADEMET Soldando una Escalera de Metal'
            title={'Ingeniería'}
            description={'Planeamos y estructuramos con base en tus necesidades'}
          />
          <Card
            src='/reparación.jpg'
            alt='Empleado de FADEMET Soldando una Escalera de Metal'
            title={'Reparación'}
            description={'Puerta hecha Madera'}
          />
          <Card
            src='/trabajo_en_equipo.jpg'
            alt='Empleado de FADEMET Soldando una Escalera de Metal'
            title={'Trabajo en Equipo'}
            description={'En FADEMET, priorizamos el trabajo en equipo'}
          />
        </div>
      </div>
    </section>
  )
}

export { AboutUs }
