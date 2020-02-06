var api = (function(){
  var _url = 'http://localhost:5000/api/';

  var http = function http(url, type, data, dtype) {
    var config = {
      method: type || 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    };

    var types = {json: 'json', xml: 'text'}

    dtype = dtype && types[dtype] || types.json;

    if (data !== undefined) {
      config.body = JSON.stringify(data)
    }

    return fetch(_url + url, config).then(response => response[dtype]());
  };


  return http;
}());
