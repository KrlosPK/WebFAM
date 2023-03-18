export const getToken = () => {
  const cookies = document.cookie
  const tokenCookie = cookies.split('; ').find((cookie) => cookie.startsWith('token='))
  if (!tokenCookie) return null
  return tokenCookie.split('=')[1]
}
