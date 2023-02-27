import './Accordion.css'

//? Hooks
import { useState } from 'react'

//? Icons
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

const Accordion = ({ header, text }) => {
  const [expanded, setExpanded] = useState(null)

  const handleExpandClick = (e) => {
    if (expanded === e) return setExpanded(null)
    setExpanded(e)
  }

  return header.map((item, i) => {
    return (
      <div className='open-card' key={i} onClick={() => handleExpandClick(i)}>
        <h3 className='open-card__header'>{item}</h3>
        <p className={expanded === i ? `open-card__text show` : 'open-card__text'}>{text[i]}</p>
        {expanded === i ? (
          <FaAngleUp className='open-card__icon' />
        ) : (
          <FaAngleDown className='open-card__icon' />
        )}
      </div>
    )
  })
}

export { Accordion }
