import './Select.css'

const Select = ({ text, value, option, innerRef, innerOnChange, innerValue, innerName, bold = 'false', font, innerDefaultValue }) => {
  return (
    <div className='select-container'>
      <select
        ref={innerRef}
        value={innerValue}
        onChange={innerOnChange}
        name={innerName}
        defaultValue={innerDefaultValue}
        className={bold === 'false' ? 'select-container__select' : 'select-container__select bold'}
        style={{ fontSize: font }}
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
