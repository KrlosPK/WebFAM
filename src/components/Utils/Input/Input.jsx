import './Input.css'

const Input = ({ text, type = 'text', nameID, max = 30, innerRef }) => {
  return (
    <div className='input-container'>
      <input className='input-login' type={type} maxLength={max} name={nameID} ref={innerRef} />
      <label className='label-login'>{text}</label>
    </div>
  )
}

export { Input }
