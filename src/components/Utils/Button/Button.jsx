import './Button.css'

const Button = ({ text, width }) => {
  return (
    <button className='Button' style={{ width: width }}>
      {text}
    </button>
  )
}

export { Button }
