const myModule = require('./my-module.js');

const ranges = [
  [0, 10],
  [12, 15],
  [17, 25],
  [27, 35]
];
const threshold = 3;


console.log(myModule.mergeTimeRanges(ranges, threshold));