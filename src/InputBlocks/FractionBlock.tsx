import Mathblock from "../Mathblock";
import InputBlock from "../InputBlock";
export class FractionBlock extends InputBlock {
    patterns: string[] = ["\\frac{", "}{", "}"]
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
    }

}