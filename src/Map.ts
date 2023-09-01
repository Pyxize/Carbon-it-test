export abstract class MapCell {
    abstract display(): string;
}

export class Plain extends MapCell {
    display(): string {
        return '☘️';
    }
}

export class Mountain extends MapCell {
    display(): string {
        return '⛰️';
    }
}
export class Explorer extends MapCell{
    explorerName: string;

    constructor(explorerName: string) {
        super();
        this.explorerName = explorerName;
    }
    display(): string {
        return `🥷 (${this.explorerName})`;
    }
}

export class Treasure extends MapCell {
    treasureCount: number;

    constructor(treasureCount: number) {
        super();
        this.treasureCount = treasureCount;
    }

    display(): string {
        return `💰(${this.treasureCount})`;
    }
}