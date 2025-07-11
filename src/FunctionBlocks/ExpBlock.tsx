import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";

export class ExpBlock extends FunctionBlock {
    patterns: string[] = ["e^{", "}"]
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
    }
}