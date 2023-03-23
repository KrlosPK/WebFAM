import './Card.css'

// ? Libraries
import 'aos/dist/aos.css'
import AOS from 'aos'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Card = ({
  title,
  description,
  titleColor,
  descriptionColor,
  titleFont,
  descriptionFont,
  size = '100%',
  src,
  alt = 'Servicio que ofrece Fademet Montajes'
}) => {
  AOS.init({ duration: 700 })

  return (
    <div className='card' data-aos='fade-right'>
      <picture>
        <LazyLoadImage
          className='card__image'
          width={300}
          height={300}
          effect='blur'
          src={src}
          loading='lazy'
          alt={alt}
        />
      </picture>
      <h2 className='card__title' style={{ color: titleColor, fontFamily: titleFont }}>
        {title}
      </h2>
      <p className='card__text' style={{ color: descriptionColor, fontFamily: descriptionFont }}>
        {description}
      </p>
    </div>
  )
}

export { Card }
