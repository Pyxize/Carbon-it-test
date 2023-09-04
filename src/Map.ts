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
export class Explorer extends MapCell {
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    display(): string {
        return `🥷 (${this.name})`;
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