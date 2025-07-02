import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";

export class SqrtBlock extends FunctionBlock {
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
    }
    render() {
        let renderedMath = "\\sqrt{";
        renderedMath += this.blocks[0].render();
        renderedMath += "}";
        return renderedMath;
    }
}
