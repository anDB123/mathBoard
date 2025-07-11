
import MathBlock from "./Mathblock";
import AbstractBlock from "./AbstractBlock";

export default class FunctionBlock extends AbstractBlock {
    constructor(parent: MathBlock, focusFunc: (block: MathBlock) => void) {
        super(parent, focusFunc);
    }
};
