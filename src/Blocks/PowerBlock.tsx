import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";

export class PowerBlock extends FunctionBlock {
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
        this.blocks.push(new Mathblock(this, focusFunc));
    }
    render() {
        let renderedMath = "{";
        renderedMath += this.blocks[0].render();
        renderedMath += "}^{";
        renderedMath += this.blocks[1].render();
        renderedMath += "}";
        return renderedMath;
    }
}

