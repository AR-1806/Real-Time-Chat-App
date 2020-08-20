var express =  require("express"),
    app = express();

//creating instance of server
var http = require("http").createServer(app);

var io = require("socket.io")(http);

//Enabling Node.js to use ejs files
app.set('view engine','ejs');

//serving public files
app.use(express.static('public'));

// app.use('/scripts', express.static('/node_modules/socket.io-client/dist'));

app.get('/',(req,res)=>{
	// res.send("hello");
	res.render("index2.html");
});



io.on("connection",(socket)=>{
	console.log("a user connected!!");
	socket.on("chat message",(msg)=>{
		console.log("user sent a message");
		io.emit("chat message",msg);
	});
	socket.on('disconnect',()=>{
		console.log("a user disconnected")
	})
});


//Setting Up server ONLY USE HTTP.listen but not app.listen
http.listen(3000,function(){
console.log("server started on port 3000");
});