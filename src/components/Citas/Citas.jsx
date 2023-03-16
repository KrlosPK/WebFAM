import './Citas.css'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Citas = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  }, [navigate])
}

export { Citas }
