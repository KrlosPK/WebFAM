import './Team.css'

//* Components
import { MiniCard } from '../../Utils/MiniCard/MiniCard'

const Team = ({ src, alt, header, text, textColor, animation, borderRadius }) => {
  return (
    <section className='team' id='nuestroEquipo'>
      <h2 className='team__title'>Nuestro equipo</h2>
      <p className='team__text'>
        Contamos con 7 trabajadores altamente capacitados para brindarte las mejores soluciones
        metalmecánicas. Nos especializamos en el diseño, fabricación y montaje de estructruas
        metálicas para el sector industrial y doméstico.
      </p>
      <div className='colleagues'>
        {text.map((teammate, i) => (
          <MiniCard
            key={teammate}
            src={src[i]}
            alt={alt[i]}
            header={header[i]}
            text={teammate}
            textColor={textColor[i]}
            animation={animation[i]}
            borderRadius={borderRadius[i]}
          />
        ))}
      </div>
    </section>
  )
}

export { Team }
