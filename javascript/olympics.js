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
