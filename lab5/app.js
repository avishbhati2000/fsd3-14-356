import express from "express";
const app = express();

app.get("/",(req,res)=>{
    res.send("<h1> Hello Express");
});

app.get('/about',(req,res)=>{
    res.send("WE are FSD Developer")
})

app.get('/login',(req,res)=>{
    res.send({msg:'user login'})
})

app.use((req,res)=>{
    res.status(404).send("Not Found")
})

app.listen(3000, () => console.log("Server is running"));