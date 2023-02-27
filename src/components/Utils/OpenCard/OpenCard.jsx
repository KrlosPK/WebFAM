import './OpenCard.css'

//? Hooks
import { useState } from 'react'

//? Icons
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

const OpenCard = ({ header, text }) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <div className='open-card' onClick={handleExpandClick}>
      <h3 className='open-card__header'>{header}</h3>
      <p className='open-card__text'>{text}</p>
      {expanded ? (
        <FaAngleUp className='open-card__icon' />
      ) : (
        <FaAngleDown className='open-card__icon' />
      )}
    </div>
  )
}

export { OpenCard }
