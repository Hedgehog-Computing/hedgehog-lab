function fetchLibrary(lib_url: string) {
  let raw_string_return = fetch(lib_url, { method: 'get' })
    .then(function (body) {
      return body.text();
    })
    .then(function (data) {
      console.log('Fetch return raw string: \n' + data);
      return data;
    });

  return raw_string_return;
}

export default fetchLibrary;
