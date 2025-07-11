import Cursor from "./Cursor"
import Mathblock from "./Mathblock";
export default class AbstractBlock {
    patterns: string[] = []
    blocks: Mathblock[] = [];
    parent: Mathblock;
    currentBlock = 0;
    focusFunc: (block: Mathblock) => void;

    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        this.parent = parent;
        this.focusFunc = focusFunc;
    }
    addItem(item: Mathblock, focus = true) {
        this.blocks.push(item);
        if (focus) {
            this.currentBlock = this.blocks.length - 1;
            item.getFocus(this.parent.cursor);
            this.parent.removeCursor();
            // Clear the cursor from the parent Mathblock
        }
    }
    getFocus(cursor: Cursor) {
        this.blocks[this.currentBlock].getFocus(cursor);
    }
    delete(cursor: Cursor) {
        if (this.currentBlock == 0) {
            this.parent.getFocus(cursor)
            this.parent.removeItem();
        }
        else {
            this.blocks[this.currentBlock].removeCursor();
            this.currentBlock -= 1;
            this.blocks[this.currentBlock].getFocus(cursor);
        }
    }
    submit(cursor: Cursor) {
        if (cursor)
            if (this.currentBlock < this.blocks.length - 1) {
                this.currentBlock += 1;
                this.blocks[this.currentBlock].getFocus(cursor);
            }
            else {
                this.blocks[this.currentBlock].removeCursor();
                this.parent.getFocus(cursor);
            }
    }
    leftEdge(cursor: Cursor) {
        if (this.currentBlock === 0) {
            this.parent.getFocus(cursor, this);
        }
        else {
            this.currentBlock -= 1;
            this.blocks[this.currentBlock].getFocus(cursor);
        }
    }
    rightEdge(cursor: Cursor) {
        if (this.currentBlock === this.blocks.length - 1) {
            this.parent.getFocus(cursor, this, true);
        }
        else {
            this.currentBlock += 1;
            this.blocks[this.currentBlock].getFocus(cursor);
        }
    }
    nextBlock() {
        if (this.currentBlock === this.blocks.length - 1) {
            return this.parent;
        }
        this.currentBlock++;
        return this.blocks[this.currentBlock];
    }
    render() {
        let renderedMath = "";
        for (let i = 0; i < this.patterns.length - 1; i++) {
            renderedMath += this.patterns[i];
            renderedMath += this.blocks[i].render();
        }
        renderedMath += this.patterns[this.patterns.length - 1];
        return renderedMath;
    }
    getEndOfScope(text: string) {
        //returns the index after end of scope
        let i = 0;
        const opens = ['(', '[', '{']
        const closers = [')', ']', '}']
        const stack = ['{'];
        while (i < text.length && stack.length != 0) {
            if (opens.includes(text[i])) {
                stack.push('{')
            }
            if (closers.includes(text[i]))
                stack.pop();
            i++;
        }
        if (stack.length != 0)
            return -1;
        return i - 1;
    }
    parse(text: string): AbstractBlock {
        let j = 0;
        for (let i = 0; i < this.patterns.length - 1; i++) {
            j += this.patterns[i].length;
            const start = j;
            j += this.getEndOfScope(text.slice(j));
            this.blocks[i].parse(text.slice(start, j), this.focusFunc);
        }
        return this;
    }
    matchesPattern(text: string): number {
        if (!text.startsWith(this.patterns[0]))
            return -1;
        let j = 0;
        for (let i = 0; i < this.patterns.length - 1; i++) {
            j += this.patterns[i].length;
            j += this.getEndOfScope(text.slice(j));
            if (!text.slice(j).startsWith(this.patterns[i + 1]))
                return -1;
        }
        console.log(`matched pattern: ${text.slice(0, j + this.patterns[this.patterns.length - 1].length)}`);
        return j + this.patterns[this.patterns.length - 1].length;
    }
}