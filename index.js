const express = require('express');
const app = express();
const router= express.Router();
const mongoose= require('mongoose');
const morgan= require('morgan');
const config =require('./config/database');
const bodyParser = require('body-parser');
const path=require('path');
const cors = require('cors'); 
const port = process.env.PORT || 4444;
const auth=require('./routes/userRoutes')(router);
const crud=require('./routes/itemRoute')(router);

mongoose.Promise=global.Promise;
mongoose.connect(config.uri,(err)=>{
	if(err){
		console.log('cannot connect to database');
		
	}else{
		console.log('DB connected');
	}
		
});

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 
app.use(express.static(__dirname+'/public'));

app.use('/reg',auth);
app.use('/item',crud);

app.get('/home', (req,res) => {
	res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get('/dashboard', (req,res) => {
	res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get('/chat', (req,res) => {
	res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get('/login', (req,res) => {
	res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get('/register', (req,res) => {
	res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.use('',function(req, res, next){
 if(res.status(404))
 	res.sendFile(path.join(__dirname+'/public/index.html'));
// res.sendFile(path.join(__dirname+'/client/dist/index.html'));
 
});
// app.get('*', (req, res)=>{
//   res.send('hi');
// });

// app.get('/', (req, res)=>{
  //res.send('hello world');
// });

// app.listen(4444,(req,res)=>{
// 	console.log("Listening port on : 4444");
// });
app.listen(port, () => {
  console.log('Listening on port ' + port );
});