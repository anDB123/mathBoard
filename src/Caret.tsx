import Mathblock from "./Mathblock";

export default class Caret {
    parent: Mathblock;
    constructor(parent: Mathblock) {
        this.parent = parent;
    }
    render() {
        return '|';
    }

};