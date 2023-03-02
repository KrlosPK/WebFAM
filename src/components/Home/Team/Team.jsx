import './Team.css'

//* Components
import { MiniCard } from '../../Utils/MiniCard/MiniCard'

//! Jsons
import teamData from '../../../json/team.json'

const Team = () => {
  return (
    <section className='team' id='nuestroEquipo'>
      <h2 className='team__title'>Nuestro equipo</h2>
      <p className='team__text'>
        Contamos con 7 trabajadores altamente capacitados para brindarte las mejores soluciones
        metalmecánicas. Nos especializamos en el diseño, fabricación y montaje de estructruas
        metálicas para el sector industrial y doméstico.
      </p>
      <div className='colleagues'>
        {teamData.map(({ id, src, alt, header, text, textColor, animation, borderRadius }) => (
          <MiniCard
            key={id}
            src={src}
            alt={alt}
            header={header}
            text={text}
            textColor={textColor}
            animation={animation}
            borderRadius={borderRadius}
          />
        ))}
      </div>
    </section>
  )
}

export { Team }
