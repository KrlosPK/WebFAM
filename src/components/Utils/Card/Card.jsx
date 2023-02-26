import './Card.css'

//? Libraries
import 'aos/dist/aos.css'
import AOS from 'aos'

const Card = ({
  title,
  description,
  titleColor,
  descriptionColor,
  size = '100%',
  src,
  alt
}) => {
  AOS.init({ duration: 700 })

  return (
    <div
      className='card'
      data-aos='fade-right'
    >
      <picture>
        <img className='card__image' width={300} height={300} src={src} alt={alt} />
      </picture>
      <h2 className='card__title' style={{ color: titleColor }}>
        {title}
      </h2>
      <p className='card__text' style={{ color: descriptionColor }}>
        {description}
      </p>
    </div>
  )
}

export { Card }
