import './Select.css'

const Select = ({ text, value, option, innerRef }) => {
  return (
    <div className='select-container'>
      <select ref={innerRef} className='select-container__select'>
        <option value=''>Selecciona una opción</option>
        {value.map((v, i) => {
          return (
            <option value={v} key={v}>
              {option[i]}
            </option>
          )
        })}
      </select>
      <label className='label-select'>{text}</label>
    </div>
  )
}

export { Select }
