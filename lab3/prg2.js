import http from "http";

const server = http.createServer((req,res)=>
{
    res.writeHead(201,{
        'content-type':"text/html",
    });
    res.end("<h1>Welcome to Server");
});

server.listen(3690, () => console.log("Server is running"));