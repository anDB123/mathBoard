import Mathblock from "../Mathblock";
import FunctionBlock from "../FunctionBlock";
import type AbstractBlock from "../AbstractBlock";


export class LimitBlock extends FunctionBlock {
    patterns: string[] = ["\\lim\\limits_{", "{\\to}", "}{", "}"]
    depths = [0, 1, 1, 0];
    constructor(parent: Mathblock, focusFunc: (block: Mathblock) => void) {
        super(parent, focusFunc);
        for (let i = 0; i < this.patterns.length - 1; i++)
            this.blocks.push(new Mathblock(this, focusFunc));
    }
    startOfNextPattern(text: string, depth: number, pattern: string) {
        //returns the index after end of scope
        let i = 0;
        const openers = ['(', '[', '{'];
        const closers = [')', ']', '}'];
        const stack = ['{'];
        while (i < text.length && stack.length != 0) {
            if (stack.length == depth && text.slice(i).startsWith(pattern))
                return i;
            if (openers.includes(text[i])) {
                stack.push('{');
            }
            if (closers.includes(text[i]))
                stack.pop();

            i++;
        }
        if (stack.length != 0)
            return -1;
        return i - 1;
    }
    parse(text: string): AbstractBlock {
        let j = 0;
        for (let i = 0; i < this.patterns.length - 1; i++) {
            j += this.patterns[i].length;
            const start = j;
            j += this.startOfNextPattern(text.slice(j), this.depths[i + 1], this.patterns[i + 1]);
            this.blocks[i].parse(text.slice(start, j), this.focusFunc);
        }
        return this;
    }
    matchesPattern(text: string): number {
        if (!text.startsWith(this.patterns[0]))
            return -1;
        let j = 0;

        for (let i = 0; i < this.patterns.length - 1; i++) {
            j += this.patterns[i].length;
            j += this.startOfNextPattern(text.slice(j), this.depths[i + 1], this.patterns[i + 1]);
            if (!text.slice(j).startsWith(this.patterns[i + 1]))
                return -1;
        }
        console.log(`matched pattern: ${text.slice(0, j + this.patterns[this.patterns.length - 1].length)}`);
        return j + this.patterns[this.patterns.length - 1].length;
    }
}