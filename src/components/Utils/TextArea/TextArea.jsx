import './TextArea.css'

const TextArea = ({
  name,
  id,
  cols = '30',
  rows = '10',
  placeholder,
  max = 100,
  innerRef,
  innerDefaultValue
}) => {
  return (
    <>
      <div className='input-container'>
        <textarea
          defaultValue={innerDefaultValue}
          ref={innerRef}
          name={name}
          id={id}
          cols={cols}
          rows={rows}
          placeholder=' '
          maxLength={max}
          className='textarea input-login'
        />
        <label className='label-textarea'>{placeholder}</label>
      </div>
    </>
  )
}

export { TextArea }
