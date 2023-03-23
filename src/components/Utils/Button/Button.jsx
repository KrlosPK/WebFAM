import './Button.css'

// ? Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Button = ({ text, textDisabled = '', width, height, disable = false, animation = true, innerOnClick }) => {
  return (
    <>
      {!disable
        ? (
          <button onClick={innerOnClick} className='Button' style={{ width, height }}>
            {text}
          </button>
        )
        : (
          <button className='Button disabled flex' style={{ width, height }}>
            {textDisabled} {animation ? <AiOutlineLoading3Quarters /> : null}
          </button>
        )}
    </>
  )
}

export { Button }
