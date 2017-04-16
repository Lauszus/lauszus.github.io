function replaceURLWithHTMLLinks(text) { // Source: http://stackoverflow.com/a/6707547
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  text = text.replace(exp,"<a href='$1' target='_blank'>$1</a>");
  document.write(text)
};
