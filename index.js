var parseQuery = require('./parseQuery');

var URL = 'test=Tooo&gest=uuuu&goo[test1]=1&goo[test2]=2&goo[room][0]=table&goo[room][1]=bad&zoom[]sss=a&zoom=b&zoom[3][ram]=c';

console.log(parseQuery(URL));