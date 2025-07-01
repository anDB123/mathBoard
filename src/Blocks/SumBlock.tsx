import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";

export class SumBlock extends FunctionBlock {
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
        this.blocks.push(new Mathblock(this, focusFunc));
    }
    render() {
        let renderedMath = "\\displaystyle\\sum_{";
        renderedMath += this.blocks[0].render();
        renderedMath += "}^{";
        renderedMath += this.blocks[1].render();
        renderedMath += "}{";
        renderedMath += this.blocks[2].render();
        renderedMath += "} \\; ";
        return renderedMath;
    }
}

