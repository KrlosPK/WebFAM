import './MiniCard.css'

//? Libraries
import 'aos/dist/aos.css'
import AOS from 'aos'

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
      <img
        className='mini-card__image'
        width={64}
        height={64}
        src={src}
        alt={alt}
        style={{ borderRadius: borderRadius }}
      ></img>
      <div className='mini-card__header'>{header}</div>
      <div className='mini-card__text' style={{ color: textColor }}>
        {text}
      </div>
    </div>
  )
}

export { MiniCard }
