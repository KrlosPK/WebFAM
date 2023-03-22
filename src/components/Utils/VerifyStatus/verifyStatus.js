export const verifyStatus = (estado, { toast, setDisabled }) => {
  if (estado === 'inactivo') {
    toast.error('¡Tu cuenta se encuentra inactiva! Contacta al administrador para activarla', {
      theme: 'colored'
    })
    setDisabled(false)
    return false
  }
  return true
}
