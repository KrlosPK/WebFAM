import './Select.css'

const Select = ({ text, value, option, innerRef, innerOnChange, innerValue, innerName }) => {
  return (
    <div className='select-container'>
      <select
        ref={innerRef}
        value={innerValue}
        onChange={innerOnChange}
        name={innerName}
        className='select-container__select'
      >
        {option.map((op, i) => {
          return (
            <option value={value[i]} key={i}>
              {op}
            </option>
          )
        })}
      </select>
      <label className='label-select'>{text}</label>
    </div>
  )
}

export { Select }
