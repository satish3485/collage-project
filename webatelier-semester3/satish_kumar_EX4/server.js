/*
 *  Basic node.js HTTP server 
 *  
 */


var http = require("http");
var url	= require("url");
var fs = require('fs');
var path = require('path')

var rh = new Array();
var contentTypes = {
    '.html': 'text/html',
    '.css': "text/css",
    '.js': 'application/javascript',
    ".txt"  : "text/plain",
    ".m4v"   : "video/mp4",
    ".mp4"   : "video/mp4",
    ".mp4v"  : "video/mp4",
    ".gif"   : "image/gif",
    ".jpeg"  : "image/jpeg",
    ".jpg"   : "image/jpeg",
    ".png"   : "image/png",
     ".mp3"   : "audio/mpeg",
    ".json"  : "application/json",
    '.js': 'application/javascript',
     ".pdf"   : "application/pdf",
     ".zip"   : "application/zip",
     ".ogv"   : "video/ogg",}
    
//Request Handlers
var hello = function(req, res) { }

var echo = function(req, res) {
    
}
//--------------------------------------------------------------------------------------------------------------------------------
var download = function(req, res){
    if(req.method === "GET") {
        
        
        var l = req.url;
        l = decodeURI(l);
        var contentType = contentTypes[path.extname(l)];
        var readstream = fs.createReadStream('NodeStaticFiles/' + l.substr(6));
        readstream.on('open', function () {
            
            res.writeHead(200, {'Content-Type':contentType, 'Content-disposition':' attachment; filename="'+path.basename(l)+'"'});
            readstream.pipe(res);
  });
         readstream.on('error', function(err) {
            res.writeHead(404, {'Content-Type':contentType})
                res.end("No such file");
        });
}
else {
        res.writeHead(405, {'Content-Type':contentType})
        res.end("Not get method"); 
    }
}
//-----------------------------------------------------------------------------------------------------------------------------------------
var explore = function(req, res){
    var query = req.query || '';
    var l = req.url;
    var currentDir =  'NodeStaticFiles'+ l.substr(8);

    fs.readdir(currentDir, function (err, content) {
     if (err) {
        throw err;
      }
        var data = [];
        res.writeHead(200, {'Content-Type': 'text/html'});
        content.forEach(function (file) {
                var isDirectory = fs.statSync(path.join(currentDir,file)).isDirectory();
                if (isDirectory) {
                    data.push({_id : file, Name : file, IsDirectory: true, Path : path.join(query, file)});
                } else {
                    data.push({ Name : file, IsDirectory: false, Path : path.join(query, file) });
                }
        });
      
        res.write("<a href="+l+">" +'..'+"</a>"+ '<BR>');
        if (path.dirname(l) != '/'){
        res.write("<a href="+path.dirname(l)+'/'+">" +'../'+"</a>"+ '<BR>');
        } 
        data.forEach(function (file) {
        if (file.IsDirectory) {
            var s ="<a href="+l+'/'+file['Path']+">" + file['Name'] +"</a>";
        } else {
            if (!(l.substr(9))){
                var s = '<a href="/file/'+file['Path']+'">'+ file['Name'] +"</a>";
            } else {
                var s = '<a href="/file/'+l.substr(9)+'/'+file['Path']+'">'+ file['Name'] +"</a>";
            }               
        }
        s = s.replace('//','/');
        res.write(s+ '<BR>');
        });
      res.end();
     });
}
// ---------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------
var form = function(req, res) {
    var formMarkup = '<form action="/echo" method="post">';
    formMarkup += '<input name="submit" type="submit">';
    formMarkup += '</form>';

    //server the form here
   

}

var redirect = function(req, res) { };

rh['explore']= explore;
rh['file']= download;
// Main server handler
function onRequest(req, res) {

    var pathname = (url.parse(req.url).pathname).split('/')[1];
    
    
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