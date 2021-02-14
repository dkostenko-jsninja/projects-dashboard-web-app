import environment from '../environment/environment';

import { RequestMethod, Request } from '../types/common-types';

const sendRequest = async (method: RequestMethod, url: string, body?: { [key: string]: any }) => {
  const options: Request = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (method === 'POST' || method === 'PUT') {
    options.body = JSON.stringify(body);
  }

  return fetch(environment.apiUrl + url, options).then(async (res) => {
    if (res.ok) {
      return res.json();
    }

    let error;
    try {
      error = await res.json();
    } catch (e) {
      error = res;
    }

    throw error;
  });
};

export default sendRequest;
