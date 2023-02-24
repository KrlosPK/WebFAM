export const validateMail = (correo, regex) => {
  if (correo.length === 0 || regex.test(correo)) return true;
}

export const validatePassword = (contrasena, regex) => {
  if (contrasena.length === 0 || regex.test(contrasena)) return true
}