import './Card.css'

// ? Libraries
import 'aos/dist/aos.css'
import AOS from 'aos'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { Button2 } from '../Button2/Button2'
import { ModalService } from '../ModalService/ModalService'

const Card = ({
  title,
  description,
  titleColor,
  descriptionColor,
  titleFont,
  descriptionFont,
  src,
  isButton = false,
  isModal = false,
  buttonText,
  innerOnClick,
  innerClassName,
  alt = 'Servicio que ofrece Fademet Montajes'
}) => {
  AOS.init({ duration: 700 })

  return (
    <div className={`card ${innerClassName}`} data-aos='fade-right'>
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
      {isButton && (
        <Button2 width={150} text={buttonText} innerClassName='card__button' innerOnClick={innerOnClick} />
      )}
      {isModal && (
        <ModalService innerClassNameButton={'modal__card-button'} innerCenterButton
          nombre_servicio={'Servicio personalizado'}
          id_servicio={0}
        />
      )}
    </div>
  )
}

export { Card }
