import './Button.css'

const Button = ({ text, width }) => {
	return (
		<button className='button' style={{ width: width }}>
			{text}
		</button>
	)
}

export { Button }
