import { readFileSync } from "fs";

const up = [-1, 0];
const right = [0, 1];
const down = [1, 0];
const left = [0, -1];
const directionOrder = [up, right, down, left];

const directionToString = (direction) => {
  if (direction[0] === -1 && direction[1] === 0) return "up";
  if (direction[0] === 0 && direction[1] === 1) return "right";
  if (direction[0] === 1 && direction[1] === 0) return "down";
  if (direction[0] === 0 && direction[1] === -1) return "left";
}

const rotateRight = (direction) => {
  const currentIndex = directionOrder.findIndex(
    (dir) => dir[0] === direction[0] && dir[1] === direction[1],
  );

  const nextIndex = (currentIndex + 1) % directionOrder.length;
  return directionOrder[nextIndex];
};

const inMap = (map, x, y) => {
  if (x < 0 || x >= map.length) return false;
  if (y < 0 || y >= map[x].length) return false;
  return true;
};

function getPath(position, map) {
  let direction = up;
  const path = new Set();
  while (true) {
    const row = position[0] + direction[0];
    const col = position[1] + direction[1];
    const currentKey = `${position[0]},${position[1]}`;

    if (!inMap(map, row, col)) {
      path.add(currentKey);
      break;
    }
    if (map[row][col] === "#") {
      direction = rotateRight(direction);
      continue;
    }

    path.add(currentKey);
    position = [row, col];
  }
  return path;
};

function hasLoop(position, map) {
  let direction = up;
  const path = new Set();
  while (true) {
    const row = position[0] + direction[0];
    const col = position[1] + direction[1];
    // If we have already visited this position and direction, we have a loop
    const currentKey = `${position[0]},${position[1]},${directionToString(direction)}`;
    if (path.has(currentKey)) {
      return true;
    }

    if (!inMap(map, row, col)) {
      path.add(currentKey);
      break;
    }
    if (map[row][col] === "#") {
      direction = rotateRight(direction);
      continue;
    }

    path.add(currentKey);
    position = [row, col];
  }
  return false;
}

try {
  // Read entire file as a string
  const input = readFileSync("input.txt", "utf8");
  let map = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));


  let position = undefined;
  outerLoop: for (let row = 0; row < map.length; row++)
    for (let col = 0; col < map[row].length; col++)
      if (map[row][col] === "^") {
        position = [row, col];
        break outerLoop;
      }

  let path  = Array.from(getPath(position, map));

  let n = 0;
  for (let i = 1; i < path.length; i++) {
    const [x, y,] = path[i].split(",").map(Number);
    map[x][y] = "#";
    
    if (hasLoop(position, map)) {
      n++;;
    }
    
    map[x][y] = ".";
  }
  console.log(n);
} catch (error) {
  console.error("Error reading file:", error);
}
