import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";

export class SinBlock extends FunctionBlock {
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
    }
    render() {
        let renderedMath = "\\sin(";
        renderedMath += this.blocks[0].render();
        renderedMath += ")";
        return renderedMath;
    }
}
