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
  servicePhoto,
  isLink
}) => {
  return isLink
    ? (
      <Link to={`/citas/${id_cita}`} key={id_cita} className={`cita ${isLink && 'cita-hover'}`}>
        <label
          className='id-cita'
          style={
            estado === 'pendiente'
              ? { color: '#fd8b26', outline: '2px solid #fd8b26' }
              : { color: '#3ae374', outline: '2px solid #3ae374' }
          }
        >
          {`${estado.charAt(0).toUpperCase() + estado.slice(1)} #${id_cita}`}
        </label>
        <LongCard
          foto_usuario={userPhoto || '/default-avatar.png'}
          nombre_completo={`Solicitante: ${nombre_completo}`}
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
    : (
      <div key={id_cita} className='cita'>
        <label
          className='id-cita'
          style={
            estado === 'pendiente'
              ? { color: '#fd8b26', outline: '2px solid #fd8b26' }
              : { color: '#3ae374', outline: '2px solid #3ae374' }
          }
        >
          {`${estado.charAt(0).toUpperCase() + estado.slice(1)} #${id_cita}`}
        </label>
        <LongCard
          foto_usuario={userPhoto || '/default-avatar.png'}
          nombre_completo={`Solicitante: ${nombre_completo}`}
          correo={correo}
          num_celular={`+57 ${num_celular}`}
          nombre_servicio={nombre_servicio}
          descripcion_cita={descripcion_cita || 'Sin descripción'}
          foto_servicio={servicePhoto || '/techo-metálico.jpg'}
          fecha_servicio={new Date(fecha_creacion_cita).toLocaleDateString()}
          hora_servicio={hora_creacion_cita.substring(0, 5)}
          estado_servicio={estado}
        />
      </div>
    )
}

export { Cita }
