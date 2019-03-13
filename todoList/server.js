const express = require('express');
const cors = require('cors');
var app = express();
const todo = require('./routes/todo');
// app.all("*", function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By","3.2.1")
//     if(req.method=="PTIONS") res.send(200);
//     else next();
// });
app.use(cors());
app.use('/todo', todo);

app.listen(8085, () => {
    console.log(2222);
});
console.log('Listen to port 8085');