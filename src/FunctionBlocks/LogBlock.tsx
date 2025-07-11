import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";


export class LogBlock extends FunctionBlock {
    patterns = ["\\log(", ")"]
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
    }
}