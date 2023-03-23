/*
  * @param {object} e - event, userData - object, setDisabled - function
  * @return {function} setDisabled
  * @description - funcion que verifica si el valor del input es igual al valor del objeto userData
  ! Necesita los datos y que el input tenga un name
 */
export const inputChangeCheck = (e, { data, setDisabled }) => {
  const { value, name } = e.target
  const arrayUserDataKey = Object.keys(data)
  const arrayUserDataValues = Object.values(data)
  const findKey = arrayUserDataKey.find((key) => key === name)
  const findValue = arrayUserDataValues.find((values) => values === value)
  if (findValue === value && findKey === name) return setDisabled(true)
  return setDisabled(false)
}
