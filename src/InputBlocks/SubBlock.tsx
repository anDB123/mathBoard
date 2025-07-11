import Mathblock from "../Mathblock";
import InputBlock from "../InputBlock";

export class SubBlock extends InputBlock {
    patterns = ["{", "}_{", "}"]
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
    }
}