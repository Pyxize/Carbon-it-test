import {Game} from "./Game";

const game = new Game();
game.loadFromFile('input.txt');
game.displayMap();
game.saveToFile('output.txt');