import './Provide.css'

//* Components
import { MiniCard } from '../../Utils/MiniCard/MiniCard'

const Provide = ({ src, alt, header, text, animation }) => {
  return (
    <section className='provide'>
      <h2 className='provide__title'>Proveemos de</h2>
      <p className='provide__text'>
        Soluciones metalmecánicas adaptadas a todo tipo de proyecto o necesidad del cliente.
      </p>
      <div className='provides'>
        {header.map((provide, i) => (
          <MiniCard
            key={provide}
            src={src[i]}
            alt={alt[i]}
            header={provide}
            text={text[i]}
            animation={animation[i]}
          />
        ))}
      </div>
    </section>
  )
}

export { Provide }
