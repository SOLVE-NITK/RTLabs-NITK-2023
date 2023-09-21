const express = require('express');
const app = express();
const { Server } = require("socket.io");
var i2c = require('i2c-bus');
var MPU6050 = require('i2c-mpu6050');
 
var address = 0x68;
var i2c1 = i2c.openSync(1);

var mpu = new MPU6050(i2c1, address);
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

const io = new Server(3003)

io.on("connection",(socket) => { setInterval(()=> {socket.emit("hello",mpu.readSync()['accel']['z'])} ,10);
});

let y_values=[]
setInterval(() => {
var data = mpu.readSync(); //Issue
y_values.push(data['accel']['z']);
if(y_values.length>200){
  y_values.splice(0)
}
console.log(data);


  
}, 1000);



app.get('/data',function(req,res){



  res.json(y_values)

})


  
app.listen(3000);
