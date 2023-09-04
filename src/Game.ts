import * as fs from 'fs';
import {Explorer, MapCell, Mountain, Plain, Treasure} from "./Map";
import {Adventurer} from "./Adventurer";


export class Game {
    width: number;
    height: number;
    cells: MapCell[];
    adventurers: Adventurer[];

    constructor() {
        this.width = 0;
        this.height = 0;
        this.cells = [];
        this.adventurers = [];
    }

    setDimensions(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cells = new Array(width * height).fill(new Plain());
    }

    setTerrain(x: number, y: number, cell: MapCell) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.cells[y * this.width + x] = cell;
        }
    }

    addTreasure(x: number, y: number, count: number) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height && this.cells[y * this.width + x] instanceof Treasure) {
            const treasureCell = this.cells[y * this.width + x] as Treasure;
            treasureCell.treasureCount += count;
        }
    }

    loadFromFile(filename: string) {
        const fileContents = fs.readFileSync(filename, 'utf-8');
        const lines = fileContents.split('\n');

        for (const line of lines) {
            const tokens: string[] = line.split(' - ');
            const type: string = tokens[0];

            if (type === 'C') {
                const width: number = parseInt(tokens[1]);
                const height: number = parseInt(tokens[2]);
                this.setDimensions(width, height);
            } else if (type === 'M') {
                const x: number = parseInt(tokens[1]);
                const y: number = parseInt(tokens[2]);
                this.setTerrain(x, y, new Mountain());
            } else if (type === 'T') {
                const x: number = parseInt(tokens[1]);
                const y: number = parseInt(tokens[2]);
                const treasureCount: number = parseInt(tokens[3]);
                this.setTerrain(x, y, new Treasure(treasureCount));
            } else if (type === 'A') {
                const x: number = parseInt(tokens[2]);
                const y: number = parseInt(tokens[3]);
                const explorerName: string = tokens[1];
                const orientation: string = tokens[4];
                const movements: string[] = tokens[5].split('');
                const adventurer = new Adventurer(new Explorer('Lara'), x, y, orientation, movements);
                this.adventurers.push(adventurer);
            } else {
                throw new Error('Merci de vérifier le fichier d\'entrée');
            }
        }
    }

    saveToFile(filename: string) {
        let fileContents = `C - ${this.width} - ${this.height}\n`;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.cells[y * this.width + x];
                fileContents += `${cell.display()} - ${x} - ${y}`;
                if (cell instanceof Treasure) {
                    fileContents += ` - ${cell.treasureCount}`;
                }
                fileContents += '\n';
            }
        }

        for (const adventurer of this.adventurers) {
            fileContents += `🥷 - ${adventurer.explorerName.name} - ${adventurer.x} - ${adventurer.y} - ${adventurer.orientation} - ${adventurer.movements.join('')}\n`;
        }

        fs.writeFileSync(filename, fileContents, 'utf-8');
    }

    displayMap() {
        const grid: string[][] = [];

        for (let y = 0; y < this.height; y++) {
            const row: string[] = [];
            for (let x = 0; x < this.width; x++) {
                row.push(this.cells[y * this.width + x].display());
            }
            grid.push(row);
        }

        for (const adventurer of this.adventurers) {
            grid[adventurer.y][adventurer.x] = adventurer.display();
        }

        for (const row of grid) {
            console.log(row.join(' '));
        }
    }

    simulateAdventurerMovements() {
        const grid: string[][] = [];

        for (let y = 0; y < this.height; y++) {
            const row: string[] = [];
            for (let x = 0; x < this.width; x++) {
                row.push(this.cells[y * this.width + x].display());
            }
            grid.push(row);
        }

        for (const adventurer of this.adventurers) {
            adventurer.performMovements(grid);
            grid[adventurer.y][adventurer.x] = adventurer.display();
        }
    }
}