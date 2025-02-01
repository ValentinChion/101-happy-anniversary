const fetchData = async ({ path, method = 'GET', body, headers }) => {
  let token;
  if (authQuery) {
    token = await getToken();
    if (!token) {
      throw new Error('Unauthorized request');
    }
  }
  const url = `${process.env.EXPO_PUBLIC_SQUARE_URL}${path}`;
  let headersWithDefault = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (headers) {
    headersWithDefault = {
      ...headersWithDefault,
      ...headers,
    };
  }
  headersWithDefault.Authorization = `Bearer EAAAlxUP0a0YOkadjib4Ybo9UQnT5gNrxTrHGLsAk_JsvagaWdm6tqkKQjbUwDAi`;

  const fetchOptions = {
    method,
    headers: headersWithDefault,
  };

  if (method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, fetchOptions);

  return await response.json();
};

const getToken = async () => {
  return await SecureStore.getItemAsync('token');
};

export default fetchData;
