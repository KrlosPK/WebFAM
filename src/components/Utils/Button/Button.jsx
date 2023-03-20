import './Button.css'

// ? Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Button = ({ text, textDisabled = '', width, disable = false, animation = true, innerOnClick }) => {
  return (
    <>
      {!disable
        ? (
          <button onClick={innerOnClick} className='Button' style={{ width }}>
            {text}
          </button>
        )
        : (
          <button className='Button disabled flex' style={{ width }}>
            {textDisabled} {animation ? <AiOutlineLoading3Quarters /> : null}
          </button>
        )}
    </>
  )
}

export { Button }
