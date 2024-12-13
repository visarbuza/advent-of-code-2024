import { readFileSync } from "fs";

const up = [-1, 0];
const right = [0, 1];
const down = [1, 0];
const left = [0, -1];
const directionOrder = [up, right, down, left];

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
  let steps = 0;
  while (true) {
    if (steps > 8000) {
      break;
    }
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
    steps++;
  }
  return {path, steps};
};

try {
  // Read entire file as a string
  const input = readFileSync("input.txt", "utf8");
  let map = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));


  let initialPosition = undefined;
  let position = undefined;
  outerLoop: for (let row = 0; row < map.length; row++)
    for (let col = 0; col < map[row].length; col++)
      if (map[row][col] === "^") {
        position = [row, col];
        initialPosition = [row, col];
        break outerLoop;
      }

  let { path } = getPath(position, map);
  path = Array.from(path);

  let n = 0;
  for (let i = 1; i < path.length; i++) {
    const [x, y] = path[i].split(",").map(Number);
    map[x][y] = "#";
    
    const { steps } = getPath(position, map);
    if (steps >= 8000) {
      n++
    }
    
    map[x][y] = ".";
  }
  console.log(n);
} catch (error) {
  console.error("Error reading file:", error);
}
