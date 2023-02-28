import './Button.css'

//? Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Button = ({ text, textDisabled = '', width, disable = false }) => {
  return (
    <>
      {!disable ? (
        <button className='Button' style={{ width: width }}>
          {text}
        </button>
      ) : (
        <button className='Button disabled flex' style={{ width: width }}>
          {textDisabled} <AiOutlineLoading3Quarters />
        </button>
      )}
    </>
  )
}

export { Button }
