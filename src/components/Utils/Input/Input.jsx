import './Input.css'

export const animation = {
  backgroundColor: 'white',
  left: '16px',
  padding: '0 2px',
  top: '0',
  userSelect: 'none'
}

const Input = ({ text, type = 'text', nameID, max = 30, innerRef }) => {
  return (
    <div className='input-container'>
      <input
        className='input-login'
        placeholder=' '
        type={type}
        maxLength={max}
        name={nameID}
        ref={innerRef}
      />
      <label className='label-login'>{text}</label>
    </div>
  )
}

export { Input }
