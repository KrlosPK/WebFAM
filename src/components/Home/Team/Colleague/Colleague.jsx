import './Colleague.css'

//? Libraries
import 'aos/dist/aos.css'
import AOS from 'aos'

const Colleague = ({ src, name, rol }) => {
  AOS.init({ duration: 700 })

  return (
    <div className='team-colleague flex' data-aos='zoom-in-up'>
      <img className='team-colleague__image' src={src} alt='Empleado de FADEMET'></img>
      <div className='team-colleague__name'>{name}</div>
      <div className='team-colleague__rol'>{rol}</div>
    </div>
  )
}

export { Colleague }
