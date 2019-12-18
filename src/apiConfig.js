let apiUrl
const expressPort = 3000
const apiUrls = {
  production: `https://aqueous-retreat-54425.herokuapp.com`,
  development: `http://localhost:${expressPort}`
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
