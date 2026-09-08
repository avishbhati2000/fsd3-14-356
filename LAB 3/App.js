import http from "http";
import * as teams from 'teams.js'

const PORT = 5000;

const server = http.createServer((req,res)=> {

   if(req.url ==='/' && req.method == 'GET'){
    const teams = teams.getAllTeams();
    res.write(JSON.stringify(teams));
    return teams;
   }else{
    res.statusCode = 404;
   }
});

server.listen(PORT,()=>{
    console.log("SIH Server is running at ",PORT);
});

