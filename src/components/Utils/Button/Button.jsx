import './Button.css'

// ? Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Button = ({
  text,
  textDisabled = '',
  width,
  height,
  disable = false,
  animation = true,
  innerOnClick,
  innerClassName
}) => {
  return (
    <>
      {!disable
        ? (
          <button
            onClick={innerOnClick}
            className={`Button ${innerClassName}`}
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            {text}
          </button>
        )
        : (
          <button
            className='Button disabled flex'
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            {textDisabled} {animation ? <AiOutlineLoading3Quarters /> : null}
          </button>
        )}
    </>
  )
}

export { Button }
