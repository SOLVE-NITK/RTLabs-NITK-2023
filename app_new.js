const express = require('express');
const app = express();
const { Server } = require("socket.io");
var servo_motor = require('./app_trial')
var stepper_motor = require('./app_stepper_trial')
// For the sensor:
var i2c = require('i2c-bus');
var MPU6050 = require('i2c-mpu6050');
//SOME SENSOR ERROR IS ARISING!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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

  //For the mototr driver:
// //Setup done:
// rpio.open(in1Pin,rpio.OUTPUT)

// rpio.open(29,rpio.OUTPUT)

// rpio.open(in2Pin,rpio.OUTPUT)
// rpio.open(in3Pin,rpio.OUTPUT)
// rpio.open(in4Pin,rpio.OUTPUT)

// function setMotorSpeed(speed1, speed2) {
//   const delay1 = Math.floor(1000000 / speed1);
//   const delay2 = Math.floor(1000000 / speed2);
//   rpio.write(in1Pin, rpio.HIGH);
//   rpio.write(in3Pin, rpio.HIGH);
//   rpio.usleep(delay1);
//   rpio.usleep(delay2);
//   rpio.write(in1Pin, rpio.LOW);
//   rpio.write(in3Pin, rpio.LOW);
// }

// function setMotorDirection(direction1, direction2) {
//   rpio.write(in2Pin, direction1);
//   rpio.write(in4Pin, direction2);
// }
// // rpio.mode(29, rpio.LOW);
// rpio.mode(29, rpio.HIGH);

// const io = new Server(3003)

// io.on("connection",(socket) => { setInterval(()=> {socket.emit("hello",mpu.readSync()['accel']['z'])} ,10);
// });
let y_values=[]
app.get('/run-motor', (req, res) => {
  servo_motor.run(50,100);
  res.send('Motor is running!');
  
  var interval = setInterval(() => {
  var data = mpu.readSync(); //Issue
  y_values.push(data['accel']['z']);
  // reverse();
  // left();
  // //Now forward motion:
  //   rpio.open(in1Pin,rpio.LOW)
  //   rpio.open(in2Pin,rpio.HIGH)
  //   rpio.open(in3Pin,rpio.HIGH)
  //   rpio.open(in4Pin,rpio.LOW)
  console.log(data);
  }, 10);

  setTimeout(()=> {
    clearInterval(interval)
  },10000);

});

app.get('/run-motor-data',function(req,res){
  res.json(y_values)

})

app.get('/run-stepmotor', (req, res) => {
  // Set the GPIO pin 5 to PWM output mode
  // rpio.mode(29, rpio.HIGH);

  //   // Wait for 10 milliseconds
  // setTimeout(() => {
  //   // Set the GPIO pin 5 to low
  //   rpio.mode(29, rpio.LOW);
  // }, 100);
  stepper_motor.run();

  // // Loop forever
  // setInterval(() => {
  //   // Set the GPIO pin 5 to high
  //   rpio.mode(29, rpio.HIGH);

  //   // Wait for 10 milliseconds
  //   setTimeout(() => {
  //     // Set the GPIO pin 5 to low
  //     rpio.mode(29, rpio.LOW);
  //   }, 10);
  // }, 10);

  res.send('Stepper Motor is running!');
});

// let y_values=[]
// setInterval(() => {
// var data = mpu.readSync(); //Issue
// y_values.push(data['accel']['z']);
// // reverse();
// // left();
// // //Now forward motion:
// //   rpio.open(in1Pin,rpio.LOW)
// //   rpio.open(in2Pin,rpio.HIGH)
// //   rpio.open(in3Pin,rpio.HIGH)
// //   rpio.open(in4Pin,rpio.LOW)
// console.log(data);
// }, 10);


app.get('/data',function(req,res){
  res.json(y_values)

})

  
app.listen(3000, "0.0.0.0");
