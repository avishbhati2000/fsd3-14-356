import { createReadStream } from 'fs';
import http from 'http'

const server = http.createServer((req,res)=>{
    if(req.url == "/"){
        res.setHeader("content-type","text/html");
        res.statusCode = 200;
    const stream = createReadStream('./pages/airtag.html',{encoding:"utf-8"});
    stream.pipe(res);
    }else if(req.url == '/mobile'){
        const stream = createReadStream("./data/products.json",{encoding:"utf-8"});
        res.writeHead(200,{"content-type":"text/json"});
        stream.pipe(res);
    }
    else if (req.url === '/manual'){

        const stream = createReadStream('./data/chatgpt.txt',{encoding:"utf-8"});
        res.writeHead(200,{"content-type":"text/plain"});
        stream.pipe(res);

    }else{
        res.statusCode = 404;
        res.end("Not Found");
    }
});

server.listen(3000,()=>console.log("prg9 is running at 3000...."));