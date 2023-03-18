import './Citas.css'

// ? Components
import { Footer } from '../Home/Footer/Footer'
import { Navbar, ResponsiveNav } from '../Utils'

// ? Hooks
import { useContext, useEffect, useState } from 'react'

// ? Context
import { SessionContext } from '../../context/SessionContext'
import { ToastifyContext } from '../../context/ToastifyContext'

const Citas = () => {
  const { session, tempSession } = useContext(SessionContext)
  const { setToastify } = useContext(ToastifyContext)

  const [button, setButton] = useState(null)

  useEffect(() => {
    if (!session || !tempSession) {
      setToastify('citas')
    }
    !session ? setButton(1) : setButton(2)
    !tempSession ? setButton(1) : setButton(2)
  }, [])

  // ! Cambiar título de la página
  const [title, setTitle] = useState('FADEMET Montajes | Citas')
  useEffect(() => {
    // ? Scroll to top
    window.scrollTo(0, 0)

    document.title = title
  }, [setTitle])

  return (
    <>
      <ResponsiveNav
        linkText={['Inicio', 'Agendar', 'Servicios']}
        linkUrl={['/', '/', '/services']}
        renderButtons={button}
      />
      <Navbar
        linkText={['Inicio', 'Agendar', 'Servicios']}
        linkUrl={['/', '/', '/services']}
        renderButtons={button}
      />
      <div className='citas'>
        <h1>Citas</h1>
      </div>
      <Footer />
    </>
  )
}

export { Citas }
