import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";

export class VectorBlock extends FunctionBlock {
    rows = 3;
    columns = 1;
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));
        this.blocks.push(new Mathblock(this, focusFunc));
        this.blocks.push(new Mathblock(this, focusFunc));
    }
    render() {
        let renderedMath = "\\begin{matrix}";
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (j > 0)
                    renderedMath += "&";
                renderedMath += "{";
                renderedMath += this.blocks[i * this.columns + j].render();
                renderedMath += "}";
            }
            if (i != this.rows - 1)
                renderedMath += "\\\\"
        }
        renderedMath += "\\end{matrix}";
        return renderedMath;
    }
}