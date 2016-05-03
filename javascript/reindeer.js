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
