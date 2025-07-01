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

export default function Mathbox() {
    const [focused, setFocused] = useState(false);
    const [text, setText] = useState("x+2y=z");
    // Replace 'any' with the actual type if available, e.g., Mathblock or a base class/interface
    const [focusedBlock, setFocusedBlock] = useState<Mathblock>(new Mathblock(null, null));
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
        if (e.key === 'Backspace') {
            focusedBlock.removeItem();
        }
        if (e.key === 'Enter' || e.key === ' ') {
            focusedBlock.submit();
        }
        if (e.key === 'ArrowLeft') {
            focusedBlock.left();
        }
        if (e.key === 'ArrowRight') {
            focusedBlock.right();
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
            if (e.key === ';') {
                const newBracket = new BracketBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newBracket);
                focusedBlock.removeCaret();
                newBracket.getFocus(caret);
            }
            if (e.key === 'J') {
                const newFraction = new FractionBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newFraction);
                focusedBlock.removeCaret();
                newFraction.getFocus(caret);
            }
            if (e.key === 'L') {
                const newSqrt = new SqrtBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newSqrt);
                focusedBlock.removeCaret();
                newSqrt.getFocus(caret);
            }
            if (e.key === 'H') {
                const newInt = new IntBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newInt);
                focusedBlock.removeCaret();
                newInt.getFocus(caret);
            }
            if (e.key === 'G') {
                const newBlock = new DiffBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newBlock);
                focusedBlock.removeCaret();
                newBlock.getFocus(caret);
            }
            if (e.key === 'K') {
                const newBlock = new PowerBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newBlock);
                focusedBlock.removeCaret();
                newBlock.getFocus(caret);
            }
            if (e.key === 'I') {
                const newBlock = new SubBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newBlock);
                focusedBlock.removeCaret();
                newBlock.getFocus(caret);
            }
            if (e.key === 'V') {
                const newBlock = new LimitBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newBlock);
                focusedBlock.removeCaret();
                newBlock.getFocus(caret);
            }
            if (e.key === 'B') {
                const newBlock = new SumBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newBlock);
                focusedBlock.removeCaret();
                newBlock.getFocus(caret);
            }
            if (e.key === 'N') {
                const newBlock = new VectorBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newBlock);
                focusedBlock.removeCaret();
                newBlock.getFocus(caret);
            }
            if (e.key === 'M') {
                const newBlock = new MatrixBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newBlock);
                focusedBlock.removeCaret();
                newBlock.getFocus(caret);
            }
            if (e.key === 'W') {
                const newBlock = new SinBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newBlock);
                focusedBlock.removeCaret();
                newBlock.getFocus(caret);
            }
            if (e.key === 'E') {
                const newBlock = new CosBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newBlock);
                focusedBlock.removeCaret();
                newBlock.getFocus(caret);
            }
            if (e.key === 'R') {
                const newBlock = new TanBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newBlock);
                focusedBlock.removeCaret();
                newBlock.getFocus(caret);
            }
            if (e.key === 'T') {
                const newBlock = new ExpBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newBlock);
                focusedBlock.removeCaret();
                newBlock.getFocus(caret);
            }
            if (e.key === 'Y') {
                const newBlock = new LogBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newBlock);
                focusedBlock.removeCaret();
                newBlock.getFocus(caret);
            }
            if (e.key === 'U') {
                const newBlock = new TenPowerBlock(focusedBlock, setFocusedBlock);
                focusedBlock.addItem(newBlock);
                focusedBlock.removeCaret();
                newBlock.getFocus(caret);
            }
        }
        else if (/^[a-zA-Z0-9]$/.test(e.key)) {
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