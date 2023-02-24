import './Button2.css'

const Button2 = ({ text, width }) => {
  return (
    <button className='Button-2' style={{ width: width }}>
      {text}
    </button>
  )
}

export { Button2 }
