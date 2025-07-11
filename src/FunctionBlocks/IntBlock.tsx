import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";
export class IntBlock extends FunctionBlock {
    patterns: string[] = ["\\int_{", "}^{", "}{", "}{d", "}"]
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        for (let i = 0; i < this.patterns.length - 1; i++)
            this.blocks.push(new Mathblock(this, focusFunc));
    }
}