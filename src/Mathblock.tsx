import AbstractBlock from "./AbstractBlock";
import Cursor from "./Cursor";
import { BlockTypes } from "./BlockTypes";
export default class Mathblock {
    items: (string | AbstractBlock | Cursor)[] = [];
    parent: AbstractBlock | null = null;
    focusFunc: (block: Mathblock) => void;
    cursor: Cursor | null = null;
    constructor(parent: AbstractBlock | null = null, focusFunc: (block: Mathblock) => void) {
        this.parent = parent;
        this.focusFunc = focusFunc;
    }
    getFocus(cursor: Cursor | null, block: AbstractBlock | null = null, right = false) {
        if (cursor) {
            this.cursor = cursor;
            if (block) {
                let pos = this.getBlockPos(block);
                if (right)
                    pos += 1;
                this.items.splice(pos, 0, cursor);
            }
            else {
                this.items.push(cursor);
            }
            this.focusFunc(this);
        }
    }
    render() {
        if (this.items.length == 0)
            return ('\\square')
        else {
            let renderedMath = "";
            this.items.forEach(item => {
                if (typeof item === "string")
                    renderedMath += item;
                else
                    renderedMath += item?.render();
            });
            return renderedMath;
        }
    }
    getCursorPos(): number {
        if (this.cursor === null) {
            return this.items.length;
        }
        return this.items.indexOf(this.cursor);
    }
    getBlockPos(block: AbstractBlock): number {
        return this.items.indexOf(block);
    }
    addItem(newItem: string | AbstractBlock | Cursor, shiftFocus = true) {
        const cursorPos = this.getCursorPos();
        this.items.splice(cursorPos, 0, newItem);
        if (newItem instanceof AbstractBlock && shiftFocus && this.cursor !== null) {
            newItem.getFocus(this.cursor);
            this.removeCursor();
        }
    }

    addCursor(newCursor: Cursor) {
        this.items.push(newCursor);
        this.cursor = newCursor;
    }
    removeCursor() {
        if (this.cursor !== null) {
            const cursorPos = this.getCursorPos();
            this.items.splice(cursorPos, 1);
            this.cursor = null;
        }
    }
    removeItem() {
        const cursorPos = this.getCursorPos();
        if (cursorPos == 0)
            this.delete();
        else
            this.items.splice(cursorPos - 1, 1);
    }
    delete() {
        if (this.cursor && this.parent)
            this.parent.delete(this.cursor);
    }
    submit() {
        if (this.parent && this.cursor) {
            this.parent.submit(this.cursor);
            this.removeCursor()
        }
    }
    left() {
        //will move the cursor to the left
        if (this.cursor === null) {
            return;
        }
        const cursorPos = this.getCursorPos();
        if (cursorPos === 0) {
            if (this.parent === null)
                return
            this.parent.leftEdge(this.cursor);
            this.removeCursor();
        }
        else {
            const prevItem = this.items[cursorPos - 1];
            if (prevItem instanceof AbstractBlock && typeof prevItem.getFocus === "function") {
                prevItem.getFocus(this.cursor);
                this.removeCursor();
                return;
            }
            this.items.splice(cursorPos, 1);
            this.items.splice(cursorPos - 1, 0, this.cursor);
        }
    }

    right() {
        //will move the cursor to the left
        if (this.cursor === null) {
            return;
        }
        const cursorPos = this.getCursorPos();
        if (cursorPos === this.items.length - 1) {
            if (this.parent === null)
                return
            this.parent.rightEdge(this.cursor);
            this.removeCursor();
        }
        else {
            const nextItem = this.items[cursorPos + 1];
            if (nextItem instanceof AbstractBlock && typeof nextItem.getFocus === "function") {
                nextItem.getFocus(this.cursor);
                this.removeCursor();
                return;
            }
            this.items.splice(cursorPos, 1);
            this.items.splice(cursorPos + 1, 0, this.cursor);
        }
    }
    getParentBlock() {
        if (!this.parent || this.parent.parent)
            return this;
        return this.parent.parent;
    }
    getNextBlock() {
        if (!this.parent)
            return this;
        return this.parent.nextBlock();
    }

    parse(text: string, focusFunc: (block: Mathblock) => void): Mathblock {
        let i = 0;
        while (i < text.length) {
            let matched = false;
            const dummyBlock = new Mathblock(null, focusFunc);
            for (const blockType of BlockTypes) {
                const testBlock = new blockType(dummyBlock, focusFunc);
                const matchLength = testBlock.matchesPattern(text.slice(i));
                if (matchLength > 0) {
                    testBlock.parse(text.slice(i, i + matchLength));
                    this.items.push(testBlock);
                    testBlock.parent = this;
                    i += matchLength;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                if (text.startsWith('\\square')) {
                    i += 7; continue;
                }
                this.items.push(text[i]);
                i += 1;
            }
        }

        return this;
    }
};