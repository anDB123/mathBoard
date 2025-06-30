import type Caret from "../Caret";
import Mathblock from "../Mathblock";


export class FractionBlock extends Mathblock {
    blocks: Mathblock[] = [];
    parent: Mathblock | null;
    currentSide = 0;
    focusFunc: (block: Mathblock) => void;
    constructor(parent: Mathblock | null = null, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
        this.blocks.push(new Mathblock(this, focusFunc));
        this.parent = parent;
        this.focusFunc = focusFunc;
    }
    getFocus(caret: Caret) {
        this.blocks[this.currentSide].getFocus(caret);
    }
    render() {
        let renderedMath = "\\frac{";
        renderedMath += this.blocks[0].render();
        renderedMath += "}{";
        renderedMath += this.blocks[1].render();
        renderedMath += "}";
        return renderedMath;
    }
    delete(caret: Caret, block: Mathblock) {
        if (block == this.blocks[1]) {
            this.blocks[1].removeCaret();
            this.blocks[0].getFocus(caret);
            this.currentSide = 0;
        }
        else {
            this.parent?.getFocus(caret, this, true)
            this.parent?.removeItem();
        }
    }
    submit(caret: Caret | null = null) {
        if (caret)
            if (this.currentSide === 0) {
                this.currentSide = 1;
                this.blocks[1].getFocus(caret);
            }
            else
                this.parent?.getFocus(caret);
    }
    leftEdge(caret: Caret) {
        if (this.currentSide === 1) {
            this.currentSide = 0;
            this.blocks[0].getFocus(caret);
        }
        else
            this.parent?.getFocus(caret, this);
    }
    rightEdge(caret: Caret) {
        if (this.currentSide === 0) {
            this.currentSide = 1;
            this.blocks[1].getFocus(caret);
        }
        else
            this.parent?.getFocus(caret, this, true);
    }

}