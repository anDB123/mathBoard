import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";

export class VectorBlock extends FunctionBlock {
    patterns = ["\\begin{matrix}{", "} \\\\ {", "} \\\\ {", "}\\end{matrix}"]
    columns = 1;
    rows = 3;
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                this.blocks.push(new Mathblock(this, focusFunc));
            }
        }
    }
}