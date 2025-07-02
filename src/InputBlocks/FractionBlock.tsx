import Mathblock from "../Mathblock";
import InputBlock from "../InputBlock";

export class FractionBlock extends InputBlock {
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
    }
    render() {
        let renderedMath = "\\frac{";
        renderedMath += this.blocks[0].render();
        renderedMath += "}{";
        renderedMath += this.blocks[1].render();
        renderedMath += "}";
        return renderedMath;
    }
}