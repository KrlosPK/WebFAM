import './Provide.css'

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
        <MiniCard
          src='/provideDesign.png'
          alt='Servicio que Provee la empresa FADEMET'
          header='Diseño'
          text='Llevamos tus ideas a la realidad'
          animation='flip-left'
        />
        <MiniCard
          src='/provideFabrication.png'
          alt='Servicio que Provee la empresa FADEMET'
          header='Fabricación'
          text='Elaboramos con amor y dedicación'
          animation='flip-left'
        />
        <MiniCard
          src='/provideAdvisory.png'
          alt='Servicio que Provee la empresa FADEMET'
          header='Asesoría'
          text='Te orientamos para que tengas tu hogar de ensueño'
          animation='flip-left'
        />
        <MiniCard
          src='/provideRepair.png'
          alt='Servicio que Provee la empresa FADEMET'
          header='Reparación'
          text='Restauramos tus estructuras metálicas'
          animation='flip-left'
        />
      </div>
    </section>
  )
}

export { Provide }
