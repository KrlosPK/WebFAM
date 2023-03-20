import './MiniCard.css'

// ? Libraries
import 'aos/dist/aos.css'
import AOS from 'aos'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const MiniCard = ({
  src,
  alt,
  header,
  text,
  animation,
  textColor = 'black',
  borderRadius = '0'
}) => {
  AOS.init({ duration: 700 })

  return (
    <div className='mini-card flex' data-aos={animation}>
      <LazyLoadImage
        className='mini-card__image'
        width={64}
        height={64}
        src={src}
        effect='blur'
        loading='lazy'
        alt={alt}
        style={{ borderRadius }}
      />
      <div className='mini-card__header'>{header}</div>
      <div className='mini-card__text' style={{ color: textColor }}>
        {text}
      </div>
    </div>
  )
}

export { MiniCard }
