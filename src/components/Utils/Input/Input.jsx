import './Input.css'

const Input = ({ text, type = 'text', nameID, max = 30, innerRef, innerOnChange, innerId }) => {
  return (
    <div className='input-container'>
      <input
        onChange={innerOnChange}
        className='input-login'
        placeholder=' '
        type={type}
        maxLength={max}
        name={nameID}
        ref={innerRef}
        id={innerId}
      />
      <label className='label-login'>{text}</label>
    </div>
  )
}

export { Input }
