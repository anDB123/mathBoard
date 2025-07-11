import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";
export class DiffBlock extends FunctionBlock {
    patterns: string[] = ["\\frac{d", "}{d", "}"]
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
        this.blocks.push(new Mathblock(this, focusFunc));
    }
}