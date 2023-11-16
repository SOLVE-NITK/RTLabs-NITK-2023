const rpio = require('rpio');
const pin = 29; // GPIO pin connected to the RMCS1106 Motor driver

// Set the GPIO pin as output
rpio.open(pin, rpio.OUTPUT);

exports.run = function()
{
    function setSpeed(speed) {
        // Convert speed to PWM frequency
        const frequency = speed * 255;
      
        // Generate PWM signal using gpio.write()
        for (let i = 0; i < 255; i++) {
          rpio.write(pin, rpio.HIGH);
          rpio.usleep(255 - i);
          rpio.write(pin, rpio.LOW);
          rpio.usleep(frequency);
        }
      }
      
      let dCycle = 5;
      var interval = setInterval(()=>
          {
              console.log(dCycle);
              setSpeed(dCycle);
              dCycle+=5
          },1000)

          setTimeout(()=>{
            clearInterval(interval);
            setSpeed(0);
            },10000)

      
}

