import AbstractBlock from "./AbstractBlock";
import Caret from "./Caret";

export default class Mathblock {
    items: (string | AbstractBlock | Caret)[] = [];
    parent: AbstractBlock | null = null;
    focusFunc: (block: Mathblock) => void;
    caret: Caret | null = null;
    constructor(parent: AbstractBlock | null = null, focusFunc: (block: Mathblock) => void) {
        this.parent = parent;
        this.focusFunc = focusFunc;
    }
    getFocus(caret: Caret | null, block: AbstractBlock | null = null, right = false) {
        if (caret) {
            this.caret = caret;
            if (block) {
                let pos = this.getBlockPos(block);
                if (right)
                    pos += 1;
                this.items.splice(pos, 0, caret);
            }
            else {
                this.items.push(caret);
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
    getCaretPos(): number {
        if (this.caret === null) {
            return this.items.length;
        }
        return this.items.indexOf(this.caret);
    }
    getBlockPos(block: AbstractBlock): number {
        return this.items.indexOf(block);
    }
    addItem(newItem: string | AbstractBlock | Caret, shiftFocus = true) {
        const caretPos = this.getCaretPos();
        this.items.splice(caretPos, 0, newItem);
        if (newItem instanceof AbstractBlock && shiftFocus && this.caret !== null) {
            newItem.getFocus(this.caret);
            this.removeCaret();
        }
    }

    addCaret(newCaret: Caret) {
        this.items.push(newCaret);
        this.caret = newCaret;
    }
    removeCaret() {
        if (this.caret !== null) {
            const caretPos = this.getCaretPos();
            this.items.splice(caretPos, 1);
            this.caret = null;
        }
    }
    removeItem() {
        const caretPos = this.getCaretPos();
        if (caretPos == 0)
            this.delete();
        else
            this.items.splice(caretPos - 1, 1);
    }
    delete() {
        if (this.caret && this.parent)
            this.parent.delete(this.caret);
    }
    submit() {
        if (this.parent && this.caret) {
            this.parent.submit(this.caret);
            this.removeCaret()
        }
    }
    left() {
        //will move the caret to the left
        if (this.caret === null) {
            return;
        }
        const caretPos = this.getCaretPos();
        if (caretPos === 0) {
            if (this.parent === null)
                return
            this.parent.leftEdge(this.caret);
            this.removeCaret();
        }
        else {
            const prevItem = this.items[caretPos - 1];
            if (prevItem instanceof AbstractBlock && typeof prevItem.getFocus === "function") {
                prevItem.getFocus(this.caret);
                this.removeCaret();
                return;
            }
            this.items.splice(caretPos, 1);
            this.items.splice(caretPos - 1, 0, this.caret);
        }
    }

    right() {
        //will move the caret to the left
        if (this.caret === null) {
            return;
        }
        const caretPos = this.getCaretPos();
        if (caretPos === this.items.length - 1) {
            if (this.parent === null)
                return
            this.parent.rightEdge(this.caret);
            this.removeCaret();
        }
        else {
            const nextItem = this.items[caretPos + 1];
            if (nextItem instanceof AbstractBlock && typeof nextItem.getFocus === "function") {
                nextItem.getFocus(this.caret);
                this.removeCaret();
                return;
            }
            this.items.splice(caretPos, 1);
            this.items.splice(caretPos + 1, 0, this.caret);
        }
    }
};