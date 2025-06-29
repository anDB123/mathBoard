import type Caret from "./Caret";
import Mathblock from "./Mathblock";


export class SqrtBlock extends Mathblock {
    block: Mathblock;
    parent: Mathblock | null;
    focusFunc: (block: Mathblock) => void;
    constructor(parent: Mathblock | null = null, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.block = new Mathblock(this, focusFunc);
        this.parent = parent;
        this.focusFunc = focusFunc;
    }
    getFocus(caret: Caret) {
        this.block.getFocus(caret);
    }
    render() {
        let renderedMath = "\\sqrt{";
        renderedMath += this.block.render();
        renderedMath += "}";
        return renderedMath;
    }
    delete(caret: Caret | null) {
        if (caret)
            this.parent?.getFocus(caret, this, true)
        this.parent?.removeItem();
    }
    submit(caret: Caret | null = null) {
        if (caret)
            this.parent?.getFocus(caret);
    }
    leftEdge(caret: Caret) {
        this.parent?.getFocus(caret, this);
    }
    rightEdge(caret: Caret) {
        this.parent?.getFocus(caret, this, true);
    }
}