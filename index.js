let i = 0;
let w = 3;

let values = [];
let states = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  frameRate(5);
  quickSort(values, 0, values.length -1);
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partion(arr, start, end);
  states[index] = -1;
  await Promise.all([
    quickSort(arr, start,index -1),
    quickSort(arr, index +1 , end)
  ]);
}

async function partion(arr, start, end) {

  for (var i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotIndex = start;
  let pivotValue = arr[end];
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if(arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = -0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (var i = start; i < end; i++) {
    if(i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

function draw() {
  background(0,0,0);
  for (var i = 0; i < values.length; i++) {
    stroke(0);
    if(states[i] == 0) {
      fill("#F25C05");
    } else if(states[i] == 1) {
      fill("#9966FF");
    } else {
      fill("#0099FF");
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}

async function swap(arr, a, b) {
  await sleep(1);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
