import './OpenCard.css'

//? Icons
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

const OpenCard = ({ header, text }) => {
  return (
    <div className='open-card'>
      <h3 className='open-card__header'>{header}</h3>
      <p className='open-card__text'>{text}</p>
      <FaAngleDown className='open-card__icon'/>
    </div>
  )
}

export { OpenCard }
