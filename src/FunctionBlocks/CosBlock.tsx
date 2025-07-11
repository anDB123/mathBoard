import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";

export class CosBlock extends FunctionBlock {
    patterns: string[] = ["\\cos({", "})"]
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
    }
}