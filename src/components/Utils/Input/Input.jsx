import './Input.css'

const Input = ({
  text,
  type = 'text',
  nameID,
  max = 30,
  innerRef,
  innerOnChange,
  innerId,
  innerOnKeyDown,
  innerDefaultValue = '',
  innerReadOnly = false
}) => {
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
        onKeyDown={innerOnKeyDown}
        defaultValue={innerDefaultValue}
        readOnly={innerReadOnly}
      />
      <label className='label-login'>{text}</label>
    </div>
  )
}

export { Input }
