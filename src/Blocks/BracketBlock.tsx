import type Caret from "../Caret";
import Mathblock from "../Mathblock";


export class BracketBlock extends Mathblock {
    child: Mathblock;
    parent: Mathblock | null;
    constructor(parent: Mathblock | null = null, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.child = new Mathblock(this, focusFunc);
        this.parent = parent;
    }
    getFocus(caret: Caret | null) {
        if (caret)
            this.child.getFocus(caret);
    }
    render() {
        let renderedMath = "(";
        renderedMath += this.child.render();
        renderedMath += ")";
        return renderedMath;
    }
    delete(caret: Caret | null) {
        if (caret)
            this.parent?.getFocus(caret, this, true)
        this.parent?.removeItem();
    }
    submit(caret: Caret | null = null) {
        if (caret)
            this.parent?.getFocus(caret, this);
    }
    leftEdge(caret: Caret) {
        this.parent?.getFocus(caret, this);
    }
    rightEdge(caret: Caret) {
        this.parent?.getFocus(caret, this, true);
    }
}