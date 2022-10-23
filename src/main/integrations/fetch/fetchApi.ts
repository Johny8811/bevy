export enum Methods {
  get = 'GET',
  post = 'POST',
  put = 'PUT'
}

export type Params = {
  url: string;
  method?: Methods;
  headers?: { [key: string]: string };
  // TODO: improve typing
  body?: any;
};

async function handleResponse(response: Response) {
  if (response.status === 204) {
    return new Promise((resolve) => {
      resolve(null);
    });
  }

  const jsonParsed = await response.json();

  if (!response.ok) {
    throw new Error(jsonParsed.message);
  }

  return jsonParsed;
}

export const fetchApi = async ({ url, method = Methods.post, headers, body }: Params) => {
  const bodyString = body && JSON.stringify(body);

  switch (method) {
    case Methods.get: {
      const response = await fetch(url, { method: Methods.get, headers });
      return handleResponse(response);
    }

    case Methods.post: {
      const response = await fetch(url, { method: Methods.post, headers, body: bodyString });
      return handleResponse(response);
    }

    case Methods.put: {
      const response = await fetch(url, { method: Methods.put, headers, body: bodyString });
      return handleResponse(response);
    }

    default: {
      return new Promise((resolve, reject) => {
        reject(new Error('Fetch method has to be set.'));
      });
    }
  }
};
