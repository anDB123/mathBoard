import Mathblock from "./Mathblock";
import AbstractBlock from "./AbstractBlock";

export default class InputBlock extends AbstractBlock {
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        const cursorPos = parent.getCursorPos();
        if (cursorPos === 0) {
            super(parent, focusFunc);
            this.addItem(new Mathblock(this, focusFunc));
            return;
        }
        const prevBlock = parent.items[cursorPos - 1];
        parent.removeItem();
        super(parent, focusFunc);
        this.addItem(new Mathblock(this, focusFunc), false);
        this.blocks[0].addItem(prevBlock, false);
        this.currentBlock = 1;
    }
};
