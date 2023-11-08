const express = require('express');
const app = express();
const { Server } = require("socket.io");
// For the sensor:
var i2c = require('i2c-bus');
var MPU6050 = require('i2c-mpu6050');
//SOME SENSOR ERROR IS ARISING!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var address = 0x68;
var i2c1 = i2c.openSync(1);

var mpu = new MPU6050(i2c1, address);
const bodyParser = require("body-parser");

//

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  //For the mototr driver:
var rpio = require('rpio');
var in1Pin = 11;
var in2Pin = 15;
var in3Pin = 16;
var in4Pin = 18;

// //Setup done:
rpio.open(in1Pin,rpio.OUTPUT)
rpio.open(29,rpio.OUTPUT)
rpio.open(in2Pin,rpio.OUTPUT)
rpio.open(in3Pin,rpio.OUTPUT)
rpio.open(in4Pin,rpio.OUTPUT)

rpio.mode(in1Pin, rpio.LOW);
rpio.mode(in2Pin, rpio.LOW);
rpio.mode(in3Pin, rpio.LOW);
rpio.mode(in4Pin, rpio.LOW);

// // rpio.mode(29, rpio.LOW);
// rpio.mode(29, rpio.HIGH);

const io = new Server(3003)

io.on("connection",(socket) => { setInterval(()=> {socket.emit("hello",mpu.readSync()['accel']['z'])} ,10);
});
app.get('/run-motor', (req, res) => {
  // Turn on the motor.
  rpio.mode(in1Pin, rpio.HIGH);
  rpio.mode(in2Pin, rpio.HIGH);
  rpio.mode(in3Pin, rpio.HIGH);
  rpio.mode(in4Pin, rpio.HIGH);

  // Wait for 1 second.
  setTimeout(() => {
    // Turn off the motor.
    rpio.mode(in1Pin, rpio.LOW);
    rpio.mode(in2Pin, rpio.LOW);
    rpio.mode(in3Pin, rpio.LOW);
    rpio.mode(in4Pin, rpio.LOW);
  }, 5000);

  res.send('Motor is running!');
});

app.get('/run-stepmotor', (req, res) => {
  // Set the GPIO pin 5 to PWM output mode
  rpio.mode(29, rpio.HIGH);

    // Wait for 10 milliseconds
  setTimeout(() => {
    // Set the GPIO pin 5 to low
    rpio.write(29, rpio.LOW);
  }, 10);

  // Loop forever
  setInterval(() => {
    // Set the GPIO pin 5 to high
    rpio.write(29, rpio.HIGH);

    // Wait for 10 milliseconds
    setTimeout(() => {
      // Set the GPIO pin 5 to low
      rpio.write(29, rpio.LOW);
    }, 1);
  }, 1);

  res.send('Stepper Motor is running!');
});



//The motor is triggered:
//Side is Forward/Backward !!!!
// function forward()
// {
//     rpio.mode(in1Pin, rpio.LOW)
//     rpio.mode(in2Pin, rpio.HIGH)
//     rpio.mode(in3Pin, rpio.HIGH)
//     rpio.mode(in4Pin, rpio.LOW)
//     console.log('Hi!!')
//     // rpio.sleep(1)
// }

// function reverse()
// {
//     rpio.mode(in1Pin, rpio.HIGH)
//     rpio.mode(in2Pin, rpio.LOW)
//     rpio.mode(in3Pin, rpio.LOW)
//     rpio.mode(in4Pin, rpio.HIGH)
// }

// function left()
// {
//     rpio.mode(in1Pin, rpio.HIGH)
//     rpio.mode(in2Pin, rpio.LOW)
//     rpio.mode(in3Pin, rpio.HIGH)
//     rpio.mode(in4Pin, rpio.LOW)

// }

// function right()
// {
//     rpio.mode(in1Pin, rpio.LOW)
//     rpio.mode(in2Pin, rpio.HIGH)
//     rpio.mode(in3Pin, rpio.LOW)
//     rpio.mode(in4Pin, rpio.HIGH)
// }

// Set the GPIO pin to output mode.
// rpio.mode(in1Pin, rpio.OUTPUT);

// Define the Express function to run the motor.

// Set up the GPIO mode

// def reverse(sec):
//     init()
//     gpio.output(17, True)
//     gpio.output(22, False)
//     gpio.output(23, False)
//     gpio.output(24, True)
//     time.sleep(sec)
//     gpio.cleanup()
// def left_turn(sec):
//     init()
//     gpio.output(17, True)
//     gpio.output(22, False)
//     gpio.output(23, True)
//     gpio.output(24, False)
//     time.sleep(sec)
//     gpio.cleanup()
// def right_turn(sec):
//     init()
//     gpio.output(17, False)
//     gpio.output(22, True)
//     gpio.output(23, False)
//     gpio.output(24, True)
//     time.sleep(sec)
//     gpio.cleanup()
// forward();
let y_values=[]
setInterval(() => {
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


app.get('/data',function(req,res){
  res.json(y_values)

})

//Hemlo!!
  
app.listen(3000, "0.0.0.0");
