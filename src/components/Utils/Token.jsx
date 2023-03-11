export const setTokenData = (token) => {
  document.cookie = `token=${token}; path=https://fademetmontajes.netlify.app/; secure; SameSite=Lax`
}