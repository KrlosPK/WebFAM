import './Button2.css'

// ? Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Button2 = ({ text, width, textDisabled = '', disable = false, animation = true }) => {
  return (
    <>
      {!disable
        ? (
          <button className='Button-2' style={{ width }}>
            {text}
          </button>
        )
        : (
          <button className='Button-2 disabled flex' style={{ width }}>
            {textDisabled} {animation ? <AiOutlineLoading3Quarters /> : null}
          </button>
        )}
    </>
  )
}

export { Button2 }
