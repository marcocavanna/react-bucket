'use strict';

/* --------
 * Make a very basic HTTP Request
 * -------- */
function simpleFetch(url, options) {
  /** Get Options */
  var _a = options !== null && options !== void 0 ? options : {},
    _b = _a.json,
    json = _b === void 0 ? true : _b,
    _c = _a.method,
    method = _c === void 0 ? 'GET' : _c;
  /** Return the request resolver */
  return new Promise(function (resolveRequest, rejectRequest) {
    /** Create the XML Client */
    var xmlHttpRequest = new XMLHttpRequest();
    /** Wait for response */
    xmlHttpRequest.onreadystatechange = function () {
      /** Wait for request end */
      if (xmlHttpRequest.readyState !== 4) {
        return;
      }
      /** If status is 200, resolve the request */
      if (xmlHttpRequest.status === 200) {
        return resolveRequest(
          json
            ? JSON.parse(xmlHttpRequest.responseText)
            : xmlHttpRequest.responseText
        );
      }
      /** Else, reject */
      return rejectRequest(xmlHttpRequest);
    };
    /** Make the Request */
    xmlHttpRequest.open(method, url, true);
    /** Send the Request */
    xmlHttpRequest.send();
  });
}

module.exports = simpleFetch;
//# sourceMappingURL=simpleFetch.js.map
