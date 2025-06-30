import type Caret from "../Caret";
import Mathblock from "../Mathblock";


export class VectorBlock extends Mathblock {
    blocks: Mathblock[] = [];
    parent: Mathblock | null;
    currentBlock = 0;
    columns = 1;
    rows = 3;
    focusFunc: (block: Mathblock) => void;
    constructor(parent: Mathblock | null = null, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.columns; j++)
                this.blocks.push(new Mathblock(this, focusFunc));
        this.parent = parent;
        this.focusFunc = focusFunc;
    }
    getFocus(caret: Caret) {
        this.blocks[this.currentBlock].getFocus(caret);
    }
    render() {
        let renderedMath = "\\begin{matrix}";
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (j > 0)
                    renderedMath += "&";
                renderedMath += "{";
                renderedMath += this.blocks[i * this.columns + j].render();
                renderedMath += "}";
            }
            if (i != this.rows - 1)
                renderedMath += "\\\\"
        }
        renderedMath += "\\end{matrix}";
        return renderedMath;
    }
    delete(caret: Caret, block: Mathblock) {
        if (block == this.blocks[0]) {
            this.parent?.getFocus(caret, this, true)
            this.parent?.removeItem();
        }
        else {
            this.blocks[this.currentBlock].removeCaret();
            this.currentBlock -= 1;
            this.blocks[this.currentBlock].getFocus(caret);
        }
    }
    submit(caret: Caret | null = null) {
        if (caret)
            if (this.currentBlock < this.rows * this.columns - 1) {
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
        if (this.currentBlock === this.rows * this.columns - 1) {
            this.parent?.getFocus(caret, this, true);
        }
        else {
            this.currentBlock += 1;
            this.blocks[this.currentBlock].getFocus(caret);
        }
    }

}