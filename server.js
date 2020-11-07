const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/api");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http);

//check connectivity
app.get('/status', (req,res)=> res.status(200).send("Status is OK"));

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req,res,next)=>{
    req.io = io;
    next();
})

//setting router
app.use('/api', router);

//setting all get request to static files
app.use(express.static(__dirname+'/public/'));
//app.get(/.*/, (req,res)=> res.sendFile(__dirname+'/public/index.html'));

app.get(/.*/, (req, res)=> {
    res.sendStatus(404);
})

//listner to new connection
io.on("connection", (socket)=> {
    console.log('new user connected');
});

//add listner to node server
const server = http.listen(3000, ()=> console.log('server started on port '+ server.address().port));
