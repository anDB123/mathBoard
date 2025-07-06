import Caret from "./Caret";
import Mathblock from "./Mathblock";
export default class AbstractBlock {
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
            item.getFocus(this.parent.caret);
            this.parent.removeCaret(); // Clear the caret from the parent Mathblock
        }
    }
    getFocus(caret: Caret) {
        this.blocks[this.currentBlock].getFocus(caret);
    }
    render() {
        // will be overwritten
        return "";
    }
    delete(caret: Caret) {
        if (this.currentBlock == 0) {
            this.parent.getFocus(caret)
            this.parent.removeItem();
        }
        else {
            this.blocks[this.currentBlock].removeCaret();
            this.currentBlock -= 1;
            this.blocks[this.currentBlock].getFocus(caret);
        }
    }
    submit(caret: Caret) {
        if (caret)
            if (this.currentBlock < this.blocks.length - 1) {
                this.currentBlock += 1;
                this.blocks[this.currentBlock].getFocus(caret);
            }
            else {
                this.blocks[this.currentBlock].removeCaret();
                this.parent.getFocus(caret);
            }
    }
    leftEdge(caret: Caret) {
        if (this.currentBlock === 0) {
            this.parent.getFocus(caret, this);
        }
        else {
            this.currentBlock -= 1;
            this.blocks[this.currentBlock].getFocus(caret);
        }
    }
    rightEdge(caret: Caret) {
        if (this.currentBlock === this.blocks.length - 1) {
            this.parent.getFocus(caret, this, true);
        }
        else {
            this.currentBlock += 1;
            this.blocks[this.currentBlock].getFocus(caret);
        }
    }
}