import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";

export class BracketBlock extends FunctionBlock {
    patterns: string[] = ["(", ")"];
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
    }

}