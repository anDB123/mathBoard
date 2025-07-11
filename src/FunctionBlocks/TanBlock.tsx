import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";

export class TanBlock extends FunctionBlock {
    patterns = ["\\tan(", ")"]
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
    }
}