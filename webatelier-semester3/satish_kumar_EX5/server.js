/*
 *  Basic node.js HTTP server 
 *  
 */


var http = require("http");
var url	= require("url");

var rh = new Array();



//Request Handlers
var hello = function(req, res) {
    res.writeHead(200);
    res.end("Hello World");
 }

var echo = function(req, res) { 
    res.writeHead(200);
    res.write(req.method +"\n");
    res.write(req.headers.toString());
    
    res.write(JSON.stringify(req.headers, null, 2));
    res.end(req.url);
}

var form = function(req, res) {
    var formMarkup = '<form action="/echo" method="post">';
    formMarkup += '<input name="submit" type="submit">';
    formMarkup += '<input name="test1" type="submit">';
    formMarkup += '</form>';

    //server the form here
    res.writeHead(200, {"Content-Type":"text/html"});
    
    res.write("<html>");
    res.write("<body>");
    res.write(formMarkup +"\n");
    res.write("</body>");
    res.end("</html>");
    

}
var json = function(req,res){
    res.writeHead(200, {"Content-Type":"application/JSON"});
    res.write(JSON.stringify(req.headers, null, 2));
    res.end();
}

var redirect = function(req, res) { 

    res.writeHead(302, {"Location": "/echo"});
    res.end();


}




// Configure your routing table here...

rh["/hello"]=hello;
rh["/echo"]=echo;

rh["/echo?abc"]=echo;
rh["/form"]= form;
rh["/json"]=json;
rh["/redirect"]=redirect;
// Main server handler
function onRequest(req, res) {

    var pathname = url.parse(req.url).pathname;

    if (typeof rh[pathname] === 'function')
    {
        rh[pathname](req, res);
    }
    else
    {
        res.writeHead(404,	{"Content-Type": "text/plain"});
        res.end();
    }
}


http.createServer(onRequest).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');