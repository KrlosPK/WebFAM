import { Link } from 'react-router-dom'
import { LongCard } from '../Utils'

const Cita = ({
  id_cita,
  nombre_completo,
  correo,
  num_celular,
  nombre_servicio,
  descripcion_cita,
  fecha_creacion_cita,
  hora_creacion_cita,
  estado,
  userPhoto,
  servicePhoto
}) => {
  return (
    <Link to={`/citas/${id_cita}`} key={id_cita} className='cita'>
      <span className='id-cita'>#{id_cita}</span>
      <LongCard
        foto_usuario={userPhoto || '/default-avatar.png'}
        nombre_completo={nombre_completo}
        correo={correo}
        num_celular={`+57 ${num_celular}`}
        nombre_servicio={nombre_servicio}
        descripcion_cita={descripcion_cita || 'Sin descripción'}
        foto_servicio={servicePhoto || '/techo-metálico.jpg'}
        fecha_servicio={new Date(fecha_creacion_cita).toLocaleDateString()}
        hora_servicio={hora_creacion_cita.substring(0, 5)}
        estado_servicio={estado}
      />
    </Link>
  )
}

export { Cita }
