import './Team.css'

//* Components
import { MiniCard } from '../../Utils/MiniCard/MiniCard'

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
        <MiniCard
          src='/avatar1.png'
          alt='Empleado de FADEMET'
          header='Ramiro Urrego'
          text='Director General'
          textColor='var(--icon-color)'
          animation='zoom-in-up'
          borderRadius='50%'
        />
        <MiniCard
          src='/avatar2.png'
          alt='Empleado de FADEMET'
          header='Mauricio Urrego'
          text='Jefe de Operaciones'
          textColor='var(--icon-color)'
          animation='zoom-in-up'
          borderRadius='50%'
        />
        <MiniCard
          src='/avatar3.png'
          alt='Empleado de FADEMET'
          header='Dulfari Urrego'
          text='Soldador'
          textColor='var(--icon-color)'
          animation='zoom-in-up'
          borderRadius='50%'
        />
        <MiniCard
          src='/avatar4.png'
          alt='Empleado de FADEMET'
          header='Hernán Velásquez'
          text='Soldador'
          textColor='var(--icon-color)'
          animation='zoom-in-up'
          borderRadius='50%'
        />
        <MiniCard
          src='/avatar5.png'
          alt='Empleado de FADEMET'
          header='Pedro Arrieta'
          text='Ayudante de Soldadura'
          textColor='var(--icon-color)'
          animation='zoom-in-up'
          borderRadius='50%'
        />
        <MiniCard
          src='/avatar6.png'
          alt='Empleado de FADEMET'
          header='Juan Pablo Zuleta'
          text='Ayudante de Soldadura'
          textColor='var(--icon-color)'
          animation='zoom-in-up'
          borderRadius='50%'
        />
        <MiniCard
          src='/avatar7.png'
          alt='Empleado de FADEMET'
          header='Danilo Zapata'
          text='Ayudante de Soldadura'
          textColor='var(--icon-color)'
          animation='zoom-in-up'
          borderRadius='50%'
        />
        <MiniCard
          src='/avatar8.png'
          alt='Empleado de FADEMET'
          header='Karen Gomez'
          text='Recursos Humanos'
          textColor='var(--icon-color)'
          animation='zoom-in-up'
          borderRadius='50%'
        />
      </div>
    </section>
  )
}

export { Team }
