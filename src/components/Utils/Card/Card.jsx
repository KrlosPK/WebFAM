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
  size = '100%',
  src,
  alt,
  innerOnClick = ''
}) => {
  AOS.init({ duration: 700 })

  return (
    <div className='card' data-aos='fade-right' onClick={innerOnClick}>
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
