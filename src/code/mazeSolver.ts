const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // Current position not on map
    if (curr.x < 0 || curr.x >= maze[0].length || curr.y < 0 || curr.y >= maze.length) {
        return false;
    }

    // current position a wall
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // at end position?
    if (curr.y === end.y && curr.x === end.x) {
        path.push(end);
        return true;
    }
    // been here before?
    if (seen[curr.y][curr.x]) {
        return false;
    }

    seen[curr.y][curr.x] = true;
    path.push(curr);

    for (let i = 0; i < dirs.length; i++) {
        const [x, y] = dirs[i];
        if (walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)) {
            return true;
        }
    }
    path.pop();
    return false;
}

export type Point = {
    x: number;
    y: number;
};

export default function mazeSolver(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}
