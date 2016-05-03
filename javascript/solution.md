

## reindeer.js

```javascript
'use strict';

class Reindeer {
  constructor(name, speed, flyTime, restTime) {
    this.name = name;
    this.speed = speed;
    this.flyTime = flyTime;
    this.restTime = restTime;

    this.points = 0;
    this.position = 0;
    this.remainingRestTime = 0;
    this.remainingFlyTime = flyTime;
  }

  step() {
    if (this.remainingFlyTime > 0) {
      this.remainingFlyTime -= 1;
      this.position += this.speed;
      if (this.remainingFlyTime === 0) {
        this.remainingRestTime = this.restTime;
      }
    }
    else if (this.remainingRestTime > 0) {
      this.remainingRestTime -= 1;
      if (this.remainingRestTime === 0) {
        this.remainingFlyTime = this.flyTime;
      }
    }
  }

  get remaining() {
    return '(' + this.remainingFlyTime + ', ' + this.remainingRestTime + ')';
  }

  get state() {
    if (this.remainingRestTime > 0) {
      return 'resting ' + this.remaining;
    }
    else if (this.remainingFlyTime > 0) {
      return 'flying ' + this.remaining;
    }
    else {
      return '??? - ' + this.remaining;
    }
  }

  get status() {
    return this.name + ' has ' + this.points + ' points and is at ' +
           this.position +
           ' and is ' + this.state;
  }

  toString() {
    return this.status;
  }
}

module.exports = Reindeer;
```


## olympics.js

```javascript
var Reindeer = require('./reindeer');

var reindeer = [
  new Reindeer('Rudolph', 22,  8, 165),
  new Reindeer('Cupid',    8, 17, 114),
  new Reindeer('Prancer', 18,  6, 103),
  new Reindeer('Donner',  25,  6, 145),
  new Reindeer('Dasher',  11, 12, 125),
  new Reindeer('Comet',   21,  6, 121),
  new Reindeer('Blitzen', 18,  3,  50),
  new Reindeer('Vixen',   20,  4,  75),
  new Reindeer('Dancer',   7, 20, 119)
];

function printReindeer() {
  console.log(reindeer.map(function(r) { return r.toString(); } ).join('\n') );
}

var MAX_TIME = 2503;

for (var time = 1; time <= MAX_TIME; time++) {
  reindeer.forEach(function(deer) {
    deer.step();
  });
  reindeer.sort(function(a, b) { return a.position - b.position; });
  var leader = reindeer[reindeer.length - 1];
  leader.points += 1;
}

printReindeer();

var winner = reindeer[reindeer.length - 1];
console.log('The position winner is:', winner);

reindeer.sort(function(a, b) { return a.points - b.points; });

var winner = reindeer[reindeer.length - 1];
console.log('The points winner is:', winner);
```
