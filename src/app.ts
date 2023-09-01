import {Map} from "./Game";

const map = new Map();
map.loadFromFile('input.txt');
map.displayMap();
map.saveToFile('output.txt');