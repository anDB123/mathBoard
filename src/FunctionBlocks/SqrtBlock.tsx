import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";

export class SqrtBlock extends FunctionBlock {
    patterns: string[] = ["\\sqrt{", "}"]
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
    }
}
