import type Caret from "./Caret";
import Mathblock from "./Mathblock";


export class IntBlock extends Mathblock {
    blocks: Mathblock[] = [];
    parent: Mathblock | null;
    currentBlock = 0;
    focusFunc: (block: Mathblock) => void;
    constructor(parent: Mathblock | null = null, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
        this.blocks.push(new Mathblock(this, focusFunc));
        this.blocks.push(new Mathblock(this, focusFunc));
        this.blocks.push(new Mathblock(this, focusFunc));
        this.parent = parent;
        this.focusFunc = focusFunc;
    }
    getFocus(caret: Caret) {
        this.blocks[this.currentBlock].getFocus(caret);
    }
    render() {
        let renderedMath = "\\int_{";
        renderedMath += this.blocks[0].render();
        renderedMath += "}^{";
        renderedMath += this.blocks[1].render();
        renderedMath += "}{";
        renderedMath += this.blocks[2].render();
        renderedMath += "}\\;{d";
        renderedMath += this.blocks[3].render();
        renderedMath += "}\\; ";
        return renderedMath;
    }
    delete(caret: Caret, block: Mathblock) {
        if (block == this.blocks[1]) {
            this.blocks[1].removeCaret();
            this.blocks[0].getFocus(caret);
            this.currentBlock = 0;
        }
        else {
            this.parent?.getFocus(caret, this, true)
            this.parent?.removeItem();
        }
    }
    submit(caret: Caret | null = null) {
        if (caret)
            if (this.currentBlock < 3) {
                this.currentBlock += 1;
                this.blocks[this.currentBlock].getFocus(caret);
            }
            else
                this.parent?.getFocus(caret);
    }
    leftEdge(caret: Caret) {
        if (this.currentBlock === 0) {
            this.parent?.getFocus(caret, this);
        }
        else {
            this.currentBlock -= 1;
            this.blocks[this.currentBlock].getFocus(caret);
        }


    }
    rightEdge(caret: Caret) {
        if (this.currentBlock === 3) {
            this.parent?.getFocus(caret, this, true);
        }
        else {
            this.currentBlock += 1;
            this.blocks[this.currentBlock].getFocus(caret);
        }
    }

}