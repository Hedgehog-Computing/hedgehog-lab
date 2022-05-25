const fetchURL = (url: string): Promise<string> => {
  return fetch(url, { method: 'get' }).then((body) => {
    const returnResponseStatusCode = body.status;
    if (returnResponseStatusCode !== 200) {
      throw 'Cannot fetch the URL: ' + url + ' , status code: ' + returnResponseStatusCode;
    }
    const real_library = body.text();
    return real_library;
  });
};

export { fetchURL };
