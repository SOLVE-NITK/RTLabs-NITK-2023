const rpio = require('rpio');
const ENA = 32;
const IN1 = 11;
const IN2 = 15;
const IN3 = 16;
const IN4 = 18;
const ENB = 33;


  rpio.open(ENA, rpio.PWM);
  rpio.open(IN1, rpio.OUTPUT);
  rpio.open(IN2, rpio.OUTPUT);
  rpio.open(IN3, rpio.OUTPUT);
  rpio.open(IN4, rpio.OUTPUT);
  rpio.open(ENB, rpio.PWM);


  
exports.run = function(speedA,speedB)
{
  console.log("Noice!!")
  rpio.pwmSetClockDivider(64);
  rpio.pwmSetRange(ENA, 100);
  rpio.pwmSetRange(ENB, 100);

  var interval = setInterval(()=>{
    speedA+=5
    speedB-=5
    
    if(speedA>=100)
    {
      speedA = 100
    }
    if(speedB>=100)
    {
      speedB = 100
    }
    console.log(speedA)
    console.log(speedB)

    rpio.pwmSetData(ENA, speedA); // Set the speed of motor A to 50%
    rpio.pwmSetData(ENB, speedB); // Set the speed of motor B to 75%
  },1000)


  setTimeout(()=>{
  clearInterval(interval);
  rpio.pwmSetData(ENA, 0); // Set the speed of motor A to 50%
  rpio.pwmSetData(ENB, 0); // Set the speed of motor B to 75%


  },10000)
 
}



  