import './Button.css'

//? Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Button = ({ text, textDisabled = '', width, disable = false, animation = true }) => {
  return (
    <>
      {!disable ? (
        <button className='Button' style={{ width: width }}>
          {text}
        </button>
      ) : (
        <button className='Button disabled flex' style={{ width: width }}>
          {textDisabled} {animation ? <AiOutlineLoading3Quarters /> : null}
        </button>
      )}
    </>
  )
}

export { Button }
