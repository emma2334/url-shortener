import config from 'config'

export const base = config.apiBase

/**
 * Generate absolute url
 *
 * @param      {string}  path    The path
 * @return     {string}  The absolute url
 */
export function absoluteUrl (path: string): string {
  return `${base}/${path.toString().replace(/^\//, '')}`
}

/**
 * Function for sending an api POST request
 *
 * @param      {string}           path    API path
 * @param      {object}           body    Request payload
 * @return     {Promise<object>}  Response
 */
export function post (path: string, body: object): Promise<object> {
  return fetch(absoluteUrl(path), {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  }).then((res) => res.json())
}

export default { post }
