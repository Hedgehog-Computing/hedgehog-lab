async function fetch_library(lib_url:string) : string{
    fetch(lib_url, {method:'get'})
    .then(function(body){return body.text()})
    .then(function(data){console.log("Fetch return raw string: \n" + data);  return data;});
}

export default fetch_library;