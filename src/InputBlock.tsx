import Mathblock from "./Mathblock";
import FunctionBlock from "./FunctionBlock";

export default class InputBlock extends FunctionBlock {
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        const caretPos = parent.items.indexOf(parent.caret);
        if (caretPos === 0) {
            super(parent, focusFunc);
            this.blocks.push(new Mathblock(this, focusFunc));
            this.currentBlock = 0;
            return;
        }
        const prevBlock = parent.items[caretPos - 1];
        parent.removeItem();
        super(parent, focusFunc);
        this.blocks.push(new Mathblock(this, focusFunc));

        if (prevBlock instanceof Mathblock)
            this.blocks[0].addBlock(prevBlock);
        else if (typeof prevBlock === "string")
            this.blocks[0].addItem(prevBlock);
        this.currentBlock = 1;
    }
};
