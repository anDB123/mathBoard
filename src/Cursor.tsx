import Mathblock from "./Mathblock";

export default class Cursor {
    parent: Mathblock;
    constructor(parent: Mathblock) {
        this.parent = parent;
    }
    render() {
        return '|';
    }

};