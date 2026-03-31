// 1. Implement the following function:
// func('hello')('world').join(':'); //should output 'hello:world'
// func('hello')('world')('today').join(':'); //should output 'hello:world:today'
// func('hello')('world')('today')('foo').join(':'); //should output 'hello:world:today:foo'


// Possible 1:
{
	const func = (arg) => {
	  const args = [arg];
	  const inner = (arg) => {
		args.push(arg);
		return inner;
	  };
	  inner.join = () => args.join(':');
	  return inner;
	};

	console.log(func('hello')('world').join(':'));
	console.log(func('hello')('world')('today').join(':'));
}

// 2. How does auth works?
// https://medium.com/quick-code/handling-authentication-and-authorization-with-node-7f9548fedde8
// a. Client sends credentials to the server.
// b. Server verifies the credentials, generates a JWT and sends it back as a response.
// c. Subsequent requests from the client have a JWT in the request headers.
// d. Server validates the token and if valid, provide the requested response.

// 3. What is the process of getting a web page? What specific data it returns?
// https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works
// a. The browser goes to the DNS server, and finds the real address of the server that the website lives on (you find the address of the shop).
// b. The browser sends an HTTP request message to the server, asking it to send a copy of the website to the client (you go to the shop and
//    order your goods). This message, and all other data sent between the client and the server, is sent across your internet connection using TCP/IP.
// c. If the server approves the client's request, the server sends the client a "200 OK" message, which means "Of course you can look at
//    that website! Here it is", and then starts sending the website's files to the browser as a series of small chunks called data
//    packets (the shop gives you your goods, and you bring them back to your house).
// d. The browser assembles the small chunks into a complete web page and displays it to you (the goods arrive at your
//    door — new shiny stuff, awesome!).