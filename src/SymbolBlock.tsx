import Mathblock from "./Mathblock";
import type Cursor from "./Cursor";

export class SymbolBlock {
    patterns: string[] = [];
    parent: Mathblock;
    constructor(parent: Mathblock, symbol: string = "") {
        this.parent = parent;
        this.patterns.push(symbol);
    }
    delete(cursor: Cursor) {
        this.parent.getFocus(cursor)
        this.parent.removeItem();
    }
    submit(cursor: Cursor) {
        if (cursor)
            this.parent.getFocus(cursor);
    }
    leftEdge(cursor: Cursor) {
        this.parent.getFocus(cursor, this);
    }
    rightEdge(cursor: Cursor) {
        this.parent.getFocus(cursor, this, true);
    }
    nextBlock() {
        return this.parent;
    }
    render() {
        return this.patterns[0];
    }
    parse(text: string): SymbolBlock {
        if (text != null)
            return this;
        return this;
    }
    matchesPattern(text: string): number {
        if (!text.startsWith(this.patterns[0]))
            return -1;
        return this.patterns[0].length;
    }
}