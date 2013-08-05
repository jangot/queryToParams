var parseQuery = require('./parseQuery');


var URL = 'ff=1'+
    '&ff[]=2' +
    '&ff[iii][]=4'+
    '&ff[iii][]=3'+
    '&ff[iii][]=gf'+
    '&q=query+%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B0'+
    '&oq=query+%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B0' +
    '&aqs=chrome.0.69i57j69i62.3929j0' +
    '&sourceid=chrome' +
    '&ie=UTF-8' +
    '&foo[]=45' +
    '&foo=2' +
    '&foo[fff][hh][eee]=3' +
    '&foo[fff][hh][eee]=3' +
    '&foo=4' +
    '&doo[fff]=6' +
    '&doo[fff][]=1' +
    '&doo=2' +
    '&doo=3';


var params = parseQuery(URL);

console.log(params);