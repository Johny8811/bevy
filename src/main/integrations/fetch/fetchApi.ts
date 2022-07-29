export enum Methods {
  get = 'GET',
  post = 'POST'
}

export const fetchApi = async ({
  url,
  method = Methods.post,
  headers,
  body
}: {
  url: string;
  method?: Methods;
  headers?: { [key: string]: string };
  // TODO: improve typing
  body?: any;
}) => {
  switch (method) {
    case Methods.get: {
      const response = await fetch(url, { method: Methods.get, headers });
      return response.json();
    }
    case Methods.post: {
      const response = await fetch(url, { method: Methods.post, body, headers });
      return response.json();
    }
    default: {
      return new Promise((resolve, reject) => {
        reject(new Error('Fetch method has to be set.'));
      });
    }
  }
};
