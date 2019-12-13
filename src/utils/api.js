import stringIsJson from './string-is-json'
import serialize from './serialize'

const API_URL = 'http://5d52bcb73432e70014e6bc2c.mockapi.io/spc'

const request = async (path, method, body) =>
  fetch(`${API_URL}${path}`, {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: body ? JSON.stringify(body) : null,
  })
    .then((response) => {
      if (!response.ok) {
        throw response
      }

      return response.json()
    })
    .catch((error) =>
      error.text().then((errorMessage) => ({
        error: true,
        status: error.status,
        data: stringIsJson(errorMessage) ? JSON.parse(errorMessage) : {},
      })),
    )

const put = (path, body) => request(path, 'PUT', body)
const post = (path, body) => request(path, 'POST', body)
const get = (path, params) => request(path + (params ? `?${serialize(params)}` : ''), 'GET')
const del = (path) => request(path, 'DELETE')

const baseEndpoint = '/registro'

// calls
export function listRegister() {
  return get(`${baseEndpoint}`)
}

export function getRegister(id) {
  return get(`${baseEndpoint}/${id}`)
}

export function createRegister(data) {
  return post(`${baseEndpoint}`, data)
}

export function updateRegister(data, id) {
  return put(`${baseEndpoint}/${id}`, data)
}

export function deleteRegister(id) {
  return del(`${baseEndpoint}/${id}`)
}
