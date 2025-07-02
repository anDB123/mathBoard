import "./Mathbox.css"
import { useEffect, useState } from "react";
import Mathblock from './Mathblock'
import { BracketBlock } from "./Blocks/BracketBlock";
import Caret from "./Caret";
import { IntBlock } from "./Blocks/IntBlock";
import { LatexRender } from "./LatexRender";

import { FractionBlock } from "./Blocks/FractionBlock";
import { SqrtBlock } from "./Blocks/SqrtBlock";
import { DiffBlock } from "./Blocks/DiffBlock";
import { PowerBlock } from "./Blocks/PowerBlock";
import { SubBlock } from "./Blocks/SubBlock";
import { LimitBlock } from "./Blocks/LimitBlock";
import { SumBlock } from "./Blocks/SumBlock";
import { MatrixBlock } from "./Blocks/MatrixBlock";
import { VectorBlock } from "./Blocks/VectorBlock";
import { SinBlock } from "./Blocks/SinBlock";
import { CosBlock } from "./Blocks/CosBlock";
import { TanBlock } from "./Blocks/TanBlock";
import { ExpBlock } from "./Blocks/ExpBlock";
import { LogBlock } from "./Blocks/LogBlock";
import { TenPowerBlock } from "./Blocks/TenPowerBlock";

const shiftedNumbers = ['!', '@', '£', '$', '%', '^', '&', '*', '(', ')']
const shiftedNumberMap: { [key: string]: string } = {
    '!': '1',
    '@': '2',
    '£': '3',
    '$': '4',
    '%': '5',
    '^': '6',
    '&': '7',
    '*': '8',
    '(': '9',
    ')': '0',
};


export default function Mathbox() {
    const [focused, setFocused] = useState(false);
    const [text, setText] = useState("x+2y=z");
    // Replace 'any' with the actual type if available, e.g., Mathblock or a base class/interface
    const [focusedBlock, setFocusedBlock] = useState<Mathblock | null>(null);
    const [outerMathblock, setOuterMathBlock] = useState(new Mathblock(null, setFocusedBlock));
    const [caret, setCaret] = useState(new Caret());
    const [history, setHistory] = useState<string[]>([]);
    useEffect(() => {
        outerMathblock.focusFunc = setFocusedBlock;
        if (outerMathblock.caret === null)
            outerMathblock.getFocus(caret);
        setText(outerMathblock.render());
    }, [caret, outerMathblock]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        //temporariliy for testing, we WANT to always be mathing
        //if (!focused) return;
        if (focusedBlock === null)
            return;
        e.preventDefault();
        const value = e.key.toString();
        const caretPos = focusedBlock.items.indexOf(caret);
        if (caretPos > 0) {
            const last = focusedBlock.items[caretPos - 1]?.toString();
            if (value == last) {
                console.log("found match")
                const temp = focusedBlock.items[caretPos - 1]?.toString();
                const vector = "\\vec{" + temp + "}";
                focusedBlock.items[caretPos - 1] = vector;
                setText(outerMathblock.render())
                return;
            }
        }
        if (e.key === 'Backspace')
            focusedBlock.removeItem();
        if (e.key === 'Enter' || e.key === ' ')
            focusedBlock.submit();
        if (e.key === 'ArrowLeft')
            focusedBlock.left();
        if (e.key === 'ArrowRight')
            focusedBlock.right();
        if (/^[0-9]$/.test(e.key))
            focusedBlock.addItem(e.key.toString());

        if (shiftedNumbers.includes(e.key)) {
            const number = shiftedNumberMap[e.key.toString()];
            focusedBlock.addItem('^' + number);
        }

        //check if capslock is enabled
        if (e.getModifierState('CapsLock')) {
            if (e.key === 'A')
                focusedBlock.addItem('+');
            if (e.key === 'S')
                focusedBlock.addItem('-');
            if (e.key === 'D')
                focusedBlock.addItem('\\times ');
            if (e.key === 'F')
                focusedBlock.addItem('÷');
            if (e.key === '=')
                focusedBlock.addItem('=');
            if (e.key === 'P')
                focusedBlock.addItem('\\infty ');
            if (e.key === 'Z')
                focusedBlock.addItem('\\pm ');
            if (e.key === 'Q')
                focusedBlock.addItem('\\nabla ');
            if (e.key === ';')
                focusedBlock.addBlock(new BracketBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'J')
                focusedBlock.addBlock(new FractionBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'L')
                focusedBlock.addBlock(new SqrtBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'H')
                focusedBlock.addBlock(new IntBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'G')
                focusedBlock.addBlock(new DiffBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'K')
                focusedBlock.addBlock(new PowerBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'I')
                focusedBlock.addBlock(new SubBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'V')
                focusedBlock.addBlock(new LimitBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'B')
                focusedBlock.addBlock(new SumBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'N')
                focusedBlock.addBlock(new VectorBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'M')
                focusedBlock.addBlock(new MatrixBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'W')
                focusedBlock.addBlock(new SinBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'E')
                focusedBlock.addBlock(new CosBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'R')
                focusedBlock.addBlock(new TanBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'T')
                focusedBlock.addBlock(new ExpBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'Y')
                focusedBlock.addBlock(new LogBlock(focusedBlock, setFocusedBlock));
            if (e.key === 'U')
                focusedBlock.addBlock(new TenPowerBlock(focusedBlock, setFocusedBlock));
        }
        else if (/^[a-zA-Z]$/.test(e.key)) {
            focusedBlock.addItem(e.key.toString());
        }
        setText(outerMathblock.render())
    };


    function ClipboardText(text: string) {
        navigator.clipboard.writeText(text);
        const alertDiv = document.createElement("div");
        alertDiv.textContent = "Copied to clipboard";
        alertDiv.style.position = "fixed";
        alertDiv.style.top = "20px";
        alertDiv.style.left = "50%";
        alertDiv.style.transform = "translateX(-50%)";
        alertDiv.style.background = "#333";
        alertDiv.style.color = "#fff";
        alertDiv.style.padding = "10px 20px";
        alertDiv.style.borderRadius = "5px";
        alertDiv.style.zIndex = "9999";
        alertDiv.style.opacity = "1";
        alertDiv.style.transition = "opacity 0.5s";
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.style.opacity = "0";
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 500);
        }, 2000);
    }

    return (
        <div>
            <div
                tabIndex={0}
                onClick={() => setFocused(!focused)}
                onKeyDown={handleKeyDown}
                className="mathbox-outer"
            >
                {LatexRender(text)}
            </div>
            <p className="latex-clipboard" onClick={() => ClipboardText(text)}>{text}</p>
        </div>
    )
}