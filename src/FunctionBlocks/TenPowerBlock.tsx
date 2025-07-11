import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";

export class TenPowerBlock extends FunctionBlock {
    patterns: string[] = ["{", "}\\times 10^{", "}"]
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        for (let i = 0; i < this.patterns.length - 1; i++)
            this.blocks.push(new Mathblock(this, focusFunc));
    }
}
