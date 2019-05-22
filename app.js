
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/src'))

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log("inicio del programa...")
    console.log("abrir localhost:3000...")
});