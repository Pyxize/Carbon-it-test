import {Game} from "./Game";

const game = new Game();
game.loadFromFile('input.txt');
game.displayMap();
game.simulateAdventurerMovements();
game.saveToFile('output.txt');