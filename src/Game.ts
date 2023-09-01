import * as fs from 'fs';
import {Explorer, MapCell, Mountain, Plain, Treasure} from "./Map";


export class Game {
    width: number;
    height: number;
    cells: MapCell[][];

    constructor() {
        this.width = 0;
        this.height = 0;
        this.cells = [];
    }

    setDimensions(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cells = new Array(width).fill(null).map(() => new Array(height).fill(new Plain()));
    }

    setTerrain(x: number, y: number, cell: MapCell) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.cells[x][y] = cell;
        }
    }

    addTreasure(x: number, y: number, count: number) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height && this.cells[x][y] instanceof Treasure) {
            const treasureCell = this.cells[x][y] as Treasure;
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
                const x: number = parseInt(tokens[2])
                const y: number = parseInt(tokens[3])
                const explorerName: string = tokens[1]
                this.setTerrain(x,y, new Explorer(explorerName));
            } else {
                throw new Error('Merci de vérifier le fichier d\'entré');
            }
        }
    }

    saveToFile(filename: string) {
        let fileContents = `C - ${this.width} - ${this.height}\n`;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.cells[x][y];
                fileContents += `${cell.display()} - ${x} - ${y}`;
                if (cell instanceof Treasure) {
                    fileContents += ` - ${cell.treasureCount}`;
                }
                fileContents += '\n';
            }
        }

        // Add adventurer data to fileContents here

        fs.writeFileSync(filename, fileContents, 'utf-8');
    }

    displayMap() {
        for (let y = 0; y < this.height; y++) {
            let line = '';
            for (let x = 0; x < this.width; x++) {
                const cell = this.cells[x][y];
                line += cell.display() + ' ';
            }
            console.log(line);
        }
    }
}