'use strict';

var fs = require('fs');

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

var inputFile = 'reindeer.txt';
// var inputFile = 'reindeer-short.txt';

var array = fs.readFileSync(inputFile).toString().split('\n');
var reindeer = [];

array.forEach(function(line) {
  if (line.length > 0) {
    var tokens = line.split(' ');
    var name = tokens[0];
    var speed = Number(tokens[3]);
    var flyTime = Number(tokens[6]);
    var restTime = Number(tokens[13]);
    reindeer.push(new Reindeer(name, speed, flyTime, restTime));
  }
});

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
