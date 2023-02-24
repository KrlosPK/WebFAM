import './Select.css'

const Select = ({ text }) => {
	return (
		<div className='select-container'>
			<select className='select-container__select'>
				<option value=''>Selecciona una opción</option>
				<option value='CC'>Cédula de Ciudadanía</option>
				<option value='CE'>Cédula de Extranjería</option>
				<option value='TI'>Tarjeta de Identidad</option>
			</select>
			<label className='label-select'>{text}</label>
		</div>
	)
}

export { Select }
