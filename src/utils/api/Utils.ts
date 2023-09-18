export async function postData<T>(baseUrl: string, headers: HeadersInit, bodyData: T) {
  return await fetch(baseUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(bodyData)
  }).then(res => res.json());
}

export async function patchData<T>(baseUrl: string, headers: HeadersInit, bodyData: T) {
  return await fetch(baseUrl, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify(bodyData)
  }).then(res => res.json());
}
