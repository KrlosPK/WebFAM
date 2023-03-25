import './LongCard.css'

// ? Components
import { MiniCard } from '../../Utils'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// ? Icons
import { BsClock, BsCalendarEvent } from 'react-icons/bs'

const LongCard = ({
  foto_usuario,
  nombre_completo,
  correo,
  num_celular,
  nombre_servicio,
  descripcion_cita,
  foto_servicio,
  fecha_servicio,
  hora_servicio,
  estado_servicio
}) => {
  return (
    <section className={`long-card ${estado_servicio}`}>
      <article className='long-card__column long-card-user-info'>
        <MiniCard
          src={foto_usuario}
          alt={`Foto de perfil de ${nombre_completo}`}
          header={nombre_completo}
          text={correo}
          isSecoundaryText
          secoundaryText={num_celular}
          animation='zoom-out'
          borderRadius='50%'
        />
      </article>
      <article className='long-card__column long-card-date-info' data-aos='zoom-out'>
        <h2 className='long-card__title'>Servicio solicitado: {nombre_servicio}</h2>
        <p className='long-card__text'>
          <strong>Descripción del Usuario:</strong> &ldquo;{descripcion_cita}&quot;
        </p>
      </article>
      <article className='long-card__column long-card-service-info' data-aos='zoom-out' >
        <LazyLoadImage
          src={foto_servicio}
          alt={nombre_servicio}
          className='long-card__image'
          loading='lazy'
          effect='blur'
        />
        <div className='column__date'>
          <p className='column__date__text'>
            <strong>Fecha creación:</strong> {fecha_servicio}
            <BsCalendarEvent />
          </p>
          <p className='column__date__text'>
            <strong>Hora creación:</strong> {hora_servicio}
            <BsClock />
          </p>
        </div>
      </article>
    </section>
  )
}

export { LongCard }
