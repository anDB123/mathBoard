import Mathblock from "./Mathblock";
import Caret from "./Caret";

export default class FunctionBlock extends Mathblock {
    blocks: Mathblock[] = [];
    parent: Mathblock;
    currentBlock = 0;
    focusFunc: (block: Mathblock) => void;
    caret: Caret | null = null;

    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.focusFunc = focusFunc;
        this.parent = parent;
        return;
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
            this.parent.getFocus(caret, this, true)
            this.parent.removeItem();
        }
        else {
            this.blocks[this.currentBlock].removeCaret();
            this.currentBlock -= 1;
            this.blocks[this.currentBlock].getFocus(caret);
        }
    }
    submit(caret: Caret | null = null) {
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
};
