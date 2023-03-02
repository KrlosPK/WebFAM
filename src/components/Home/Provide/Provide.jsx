import './Provide.css'

//! Jsons
import provideData from '../../../json/provide.json'

//* Components
import { MiniCard } from '../../Utils/MiniCard/MiniCard'

const Provide = () => {
  return (
    <section className='provide'>
      <h2 className='provide__title'>Proveemos de</h2>
      <p className='provide__text'>
        Soluciones metalmecánicas adaptadas a todo tipo de proyecto o necesidad del cliente.
      </p>
      <div className='provides'>
        {provideData.map(({ id, src, alt, header, text, animation }) => (
          <MiniCard
            key={id}
            src={src}
            alt={alt}
            header={header}
            text={text}
            animation={animation}
          />
        ))}
      </div>
    </section>
  )
}

export { Provide }
