const express = require('express');
const app = express();
const mongoose= require('mongoose');
const config =require('./config/database');
const path=require('path');

mongoose.Promise=global.Promise;
mongoose.connect(config.uri,(err)=>{
	if(err){
		console.log('cannot connect to database');
		
	}else{
		console.log('DB connected');
	}
		
});
app.use(express.static(__dirname+'/client/dist/'));

app.get('/home', (req,res) => {
	res.sendFile(path.join(__dirname+'/client/dist/index.html'));
});
// app.get('*', (req, res)=>{
//   res.send('hi');
// });

app.get('/', (req, res)=>{
  res.send('hello world');
});

app.listen(4444,(req,res)=>{
	console.log("Listening port on : 4444");
});