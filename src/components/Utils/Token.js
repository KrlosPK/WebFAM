import cookie from 'js-cookie'

export const setTokenData = (token) => {
  // document.cookie = `token=${token}; path=https://fademetmontajes.netlify.app/; secure; SameSite=Lax`
  cookie.set('token', token, { path: '/', domain: 'https://fademetmontajes.netlify.app/' })
}
