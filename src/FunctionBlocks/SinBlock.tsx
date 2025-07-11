import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";

export class SinBlock extends FunctionBlock {
    patterns = ["\\sin(", ")"]
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
    }
}