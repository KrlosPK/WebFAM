import './Accordion.css'

// ? Hooks
import { useState } from 'react'

// ? Icons
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

// ! Jsons
import accordionData from '../../../json/accordion.json'

// ? Libraries
import 'aos/dist/aos.css'
import AOS from 'aos'

const Accordion = () => {
  AOS.init({ duration: 700 })
  const [expanded, setExpanded] = useState(null)

  const handleExpandClick = (e) => {
    if (expanded === e) return setExpanded(null)
    setExpanded(e)
  }

  return accordionData.map(({ id, header, text }, i) => {
    return (
      <div className='open-card' data-aos='zoom-in' key={id} onClick={() => handleExpandClick(i)}>
        <h3 className='open-card__header'>{header}</h3>
        <p className={expanded === i ? 'open-card__text show' : 'open-card__text'}>{text}</p>
        {expanded === i
          ? (
            <FaAngleUp className='open-card__icon' />
          )
          : (
            <FaAngleDown className='open-card__icon' />
          )}
      </div>
    )
  })
}

export { Accordion }
