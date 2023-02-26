import './Services.css'

// JSON
import data from './services.json'

const Services = () => {
  return (
    <div className='services'>
      {data.map(({ id, name, url }) => (
        <div className='service' key={id}>
          <div className='service__image'>
            <img src={url} alt={name} />
          </div>
          <div className='service__text'>{name}</div>
        </div>
      ))}
    </div>
  )
}

export { Services }
