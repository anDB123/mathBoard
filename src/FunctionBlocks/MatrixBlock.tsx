import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";

export class MatrixBlock extends FunctionBlock {
    patterns = ["\\begin{matrix}{", "} & {", "} & {", "}\\\\{", "} & {", "} & {", "}\\\\{", "} & {", "} & {", "}\\end{matrix}"]
    columns = 3;
    rows = 3;
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.blocks.push(new Mathblock(this, focusFunc));
            }
        }
    }
}