const fetchURL = (url: string): Promise<string> => {
  return fetch(url, { method: 'get' }).then((body) => {
    const real_library = body.text();
    return real_library;
  });
};

export { fetchURL };
