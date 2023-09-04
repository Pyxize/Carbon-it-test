import {Explorer, MapCell} from "./Map";

export class Adventurer extends MapCell {
    explorerName: Explorer;
    x: number;
    y: number;
    orientation: string;
    movements: string[];
    treasuresCollected: number;

    constructor(explorerName: Explorer, x: number, y: number, orientation: string, movements: string[]) {
        super();
        this.explorerName = explorerName;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.movements = movements;
        this.treasuresCollected = 0;
    }

    display(): string {
        return this.explorerName.display();
    }

    performMovements(grid: string[][]) {
        for (const move of this.movements) {
            if (move === 'A') {
                this.moveForward(grid);
            } else if (move === 'D') {
                this.turnRight();
            } else if (move === 'G') {
                this.turnLeft();
            }
        }
    }

    moveForward(grid: string[][]) {
        const dx = this.orientation === 'E' ? 1 : this.orientation === 'W' ? -1 : 0;
        const dy = this.orientation === 'S' ? 1 : this.orientation === 'N' ? -1 : 0;
        const newX = this.x + dx;
        const newY = this.y + dy;

        if (this.isValidCoordinate(grid, newX, newY) && grid[newY][newX] !== 'M') {
            if (grid[newY][newX].startsWith('T')) {
                this.collectTreasure(grid, newX, newY);
            }
            this.x = newX;
            this.y = newY;
        }
    }

    collectTreasure(grid: string[][], x: number, y: number) {
        const treasureCount = parseInt(grid[y][x].match(/\((\d+)\)/)![1]);
        if (treasureCount > 0) {
            grid[y][x] = '.';
            this.treasuresCollected++;
        }
    }

    turnRight() {
        const orientations = ['N', 'E', 'S', 'W'];
        const currentIndex = orientations.indexOf(this.orientation);
        this.orientation = orientations[(currentIndex + 1) % orientations.length];
    }

    turnLeft() {
        const orientations = ['N', 'E', 'S', 'W'];
        const currentIndex = orientations.indexOf(this.orientation);
        this.orientation = orientations[(currentIndex - 1 + orientations.length) % orientations.length];
    }

    isValidCoordinate(grid: string[][], x: number, y: number) {
        return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
    }
}