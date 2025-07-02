import Caret from "./Caret";

export default class Mathblock {
    items: (string | Mathblock | Caret | null)[];
    parent: Mathblock | null;
    focusFunc: (block: Mathblock) => void;
    caret: Caret | null = null;
    constructor(parent: Mathblock | null = null, focusFunc: (block: Mathblock) => void) {
        this.items = [];
        this.parent = parent;
        this.focusFunc = focusFunc;
    }
    getFocus(caret: Caret, block: Mathblock | null = null, right = false) {
        this.focusFunc(this);
        this.caret = caret;
        if (block === null)
            this.items.push(caret);
        else {
            let caretPos = this.items.indexOf(block);
            if (right)
                caretPos += 1
            this.items.splice(caretPos, 0, caret);
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
    addItem(newItem: string | Mathblock) {
        // add caret
        const caretPos = this.items.indexOf(this.caret);
        this.items.splice(caretPos, 0, newItem);
    }
    addBlock(newBlock: Mathblock) {
        if (this.caret) {
            this.addItem(newBlock);
            newBlock.getFocus(this.caret);
            this.removeCaret();
        }
    }
    addCaret(newCaret: Caret) {
        this.items.push(newCaret);
        this.caret = newCaret;
    }
    removeCaret() {
        if (this.caret !== null) {
            const caretPos = this.items.indexOf(this.caret);
            this.items.splice(caretPos, 1);
            this.caret = null;
        }
    }
    removeItem() {
        const caretPos = this.items.indexOf(this.caret);
        if (caretPos == 0)
            this.delete(this.caret);
        else
            this.items.splice(caretPos - 1, 1);
    }
    delete(caret: Caret | null) {
        this.parent?.delete(this.caret);
    }
    submit(caret: Caret | null = null) {
        if (this.parent === null)//ignore if we are at root
            return
        this.parent?.submit(this.caret);
        this.removeCaret()
    }
    left() {
        //will move the caret to the left
        const caretPos = this.items.indexOf(this.caret);
        if (caretPos === 0) {
            if (this.parent === null)
                return
            this.parent?.leftEdge(this.caret);
            this.removeCaret();
        }
        else {
            if (this.items[caretPos - 1] instanceof Mathblock) {
                this.items[caretPos - 1].getFocus(this.caret);
                this.removeCaret();
                return;
            }
            this.items.splice(caretPos, 1);
            this.items.splice(caretPos - 1, 0, this.caret);
        }
    }

    right() {
        //will move the caret to the left
        const caretPos = this.items.indexOf(this.caret);
        if (caretPos === this.items.length - 1) {
            if (this.parent === null)
                return
            this.parent?.rightEdge(this.caret, this);
            this.removeCaret();
        }
        else {
            if (this.items[caretPos + 1] instanceof Mathblock) {
                this.items[caretPos + 1].getFocus(this.caret);
                this.removeCaret();
                return;
            }
            this.items.splice(caretPos, 1);
            this.items.splice(caretPos + 1, 0, this.caret);
        }
    }
    leftEdge(caret: Caret, block: Mathblock) {
        return;
    }
    rightEdge(caret: Caret, block: Mathblock) {
        return;
    }
};