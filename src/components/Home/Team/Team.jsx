import './Team.css'

import { Colleague } from './Colleague/Colleague'

const Team = () => {
  return (
    <div className='team'>
      <h2 className='team__title'>Nuestro equipo</h2>
      <p className='team__text'>
        Contamos con 7 trabajadores altamente capacitados para brindarte las mejores soluciones
        metalmecánicas. Nos especializamos en el diseño, fabricación y montaje de estructruas
        metálicas para el sector industrial y doméstico.
      </p>
      <div className='colleagues'>
        <Colleague src='/soldador.png' name='Ramiro Urrego' rol='Director General' />
        <Colleague src='/soldador.png' name='Mauricio Urrego' rol='Jefe de Operaciones' />
        <Colleague src='/soldador.png' name='Dulfari Urrego' rol='Soldador' />
        <Colleague src='/soldador.png' name='Hernán Velásquez' rol='Soldador' />
        <Colleague src='/soldador.png' name='Pedro Arrieta' rol='Ayudante de Soldadura' />
        <Colleague src='/soldador.png' name='Juan Pablo Zuleta' rol='Ayudante de Soldadura' />
        <Colleague src='/soldador.png' name='Danilo Zapata' rol='Ayudante de Soldadura' />
      </div>
    </div>
  )
}

export { Team }
