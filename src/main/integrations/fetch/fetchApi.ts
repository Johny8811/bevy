export enum Methods {
  get = 'GET',
  post = 'POST'
}

export type Params = {
  url: string;
  method?: Methods;
  headers?: { [key: string]: string };
  // TODO: improve typing
  body?: any;
};

// TODO: improve error statuses. Maybe react query handle?
export const fetchApi = async ({ url, method = Methods.post, headers, body }: Params) => {
  switch (method) {
    case Methods.get: {
      const response = await fetch(url, { method: Methods.get, headers });
      if (!response.ok) {
        const jsonResponse = await response.json();
        throw new Error(jsonResponse.message);
      }
      return response.json();
    }
    case Methods.post: {
      const response = await fetch(url, { method: Methods.post, headers, body });
      if (!response.ok) {
        const jsonResponse = await response.json();
        throw new Error(jsonResponse.message);
      }
      return response.json();
    }
    default: {
      return new Promise((resolve, reject) => {
        reject(new Error('Fetch method has to be set.'));
      });
    }
  }
};
