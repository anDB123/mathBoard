import Mathblock from "../Mathblock";
import InputBlock from "../InputBlock";

export class PowerBlock extends InputBlock {
    patterns = ['{', '}^{', '}'];
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
    }
}


