export function post (path: string, body: object): Promise<object> {
  return fetch('http://localhost:3001' + path, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body)
  }).then((res) => res.json())
}
