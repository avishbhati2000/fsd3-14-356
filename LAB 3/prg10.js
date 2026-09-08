import http from "http";

const server = http.createServer((req,res)=>{
    console.log("method")
    if(req.url == "/" && req.method === "GET"){
        res.end("<h1>Products details</h1>");
    }

    res.end("hello buddy");

})

server.listen(3000,()=>console.log("prg10 is running at port 3000"));