const http = require('http');

http.createServer((req,res)=>{
    res.write("hola mundo");
    res.end();
})
.listen(3000)

console.log("escuchando en el puerto 3000")
