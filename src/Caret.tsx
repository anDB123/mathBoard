import Mathblock from "./Mathblock";

export default class Caret extends Mathblock {
    parent: Mathblock | null;
    constructor(parent: Mathblock | null = null) {
        super(parent, null);
        this.parent = parent;
    }
    render() {
        return '|';
    }

};