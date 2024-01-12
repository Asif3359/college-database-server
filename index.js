const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("hello World");
})

app.listen(3001, ()=>{
    console.log('college server running on port 3001');
})