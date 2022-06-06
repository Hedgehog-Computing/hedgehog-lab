const fetchApi = (username: string, filename: string): Promise<string> => {
  const host = location.hostname;
  let apiHost;
  switch (host) {
    case "preview.hlab.app":
      apiHost = "https://api.preview.hlab.app";
      break;
    case "hlab.app":
      apiHost = "https://api.hlab.app";
      break;
    default:
      apiHost = "http://localhost:9000";
  }
  
  const api = apiHost + '/snippets?user=' + username + '&title=' + filename;
  return fetch(api, { method: 'get' }).then(res => res.json()).then((data) => {
    const returnResponseStatusCode = data.statusCode;
    if (returnResponseStatusCode !== 200) {
      throw 'Cannot fetch the file: ' + filename + ' from user: ' + username + ' , status code: ' + returnResponseStatusCode;
    }
    const real_library = data.response.result.content;
    return real_library;
  });
};

export { fetchApi };
