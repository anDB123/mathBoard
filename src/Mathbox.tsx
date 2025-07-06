import "./Mathbox.css"
import { createContext, useEffect, useMemo, useState } from "react";
import Mathblock from './Mathblock'
import { BracketBlock } from "./FunctionBlocks/BracketBlock";
import Caret from "./Caret";
import { IntBlock } from "./FunctionBlocks/IntBlock";
import { LatexRender } from "./LatexRender";

import { FractionBlock } from "./InputBlocks/FractionBlock";
import { SqrtBlock } from "./FunctionBlocks/SqrtBlock";
import { DiffBlock } from "./FunctionBlocks/DiffBlock";
import { PowerBlock } from "./InputBlocks/PowerBlock";
import { SubBlock } from "./InputBlocks/SubBlock";
import { LimitBlock } from "./FunctionBlocks/LimitBlock";
import { SumBlock } from "./FunctionBlocks/SumBlock";
import { MatrixBlock } from "./FunctionBlocks/MatrixBlock";
import { VectorBlock } from "./FunctionBlocks/VectorBlock";
import { SinBlock } from "./FunctionBlocks/SinBlock";
import { CosBlock } from "./FunctionBlocks/CosBlock";
import { TanBlock } from "./FunctionBlocks/TanBlock";
import { ExpBlock } from "./FunctionBlocks/ExpBlock";
import { LogBlock } from "./FunctionBlocks/LogBlock";
import { TenPowerBlock } from "./FunctionBlocks/TenPowerBlock";


const CaretContext = createContext(false);

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

const blocksMap = { //will add upper case variants for extra space when needed
    'q': "\\nabla ",
    'w': SinBlock,
    'e': CosBlock,
    'r': TanBlock,
    't': ExpBlock,
    'y': LogBlock,
    'u': TenPowerBlock,
    'i': SubBlock,
    'o': '?',
    'p': '\\infty ',
    'a': '+',
    's': '-',
    'd': '\\times ',
    'f': '÷',
    'g': DiffBlock,
    'h': IntBlock,
    'j': FractionBlock,
    'k': PowerBlock,
    'l': SqrtBlock,
    ';': BracketBlock,
    'z': '\\pm ',
    'x': '?',
    'c': '?',
    'v': LimitBlock,
    'b': SumBlock,
    'n': VectorBlock,
    'm': MatrixBlock,
    ',': '?',
    '.': '?',
}

export default function Mathbox() {
    const [focused, setFocused] = useState(false);
    const [text, setText] = useState("x+2y=z");
    // Replace 'any' with the actual type if available, e.g., Mathblock or a base class/interface
    const [focusedBlock, setFocusedBlock] = useState<Mathblock | null>(null);
    const outerMathblock = useMemo(() => new Mathblock(null, setFocusedBlock), [setFocusedBlock]);
    const caret = useMemo(() => new Caret(outerMathblock), [outerMathblock]);
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
        e.preventDefault(); //in case the page tries to scroll or smth

        //navigation
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
            const newBlock = new PowerBlock(focusedBlock, setFocusedBlock)
            focusedBlock.addItem(newBlock, false);
            newBlock.blocks[1].addItem(number);
        }
        //check if capslock is enabled (we are in "Mathmode")
        if (e.getModifierState('CapsLock')) {
            if ((/^[a-zA-Z;,.]$/.test(e.key))) {
                const key = e.key.toLowerCase() as keyof typeof blocksMap;
                const block = blocksMap[key];
                if (typeof block === 'string') {
                    focusedBlock.addItem(block);
                } else if (typeof block === 'function') {
                    focusedBlock.addItem(new block(focusedBlock, setFocusedBlock));
                }
            }
        }
        else if (/^[a-zA-Z]$/.test(e.key)) {
            const caretPos = focusedBlock.items.indexOf(caret);
            const value = e.key.toString();
            const last = focusedBlock.items[caretPos - 1]?.toString();
            if (value == last) {
                const temp = focusedBlock.items[caretPos - 1]?.toString();
                const vector = "\\vec{" + temp + "}";
                focusedBlock.items[caretPos - 1] = vector;
            }
            else
                focusedBlock.addItem(e.key.toString());
        }

        setText(outerMathblock.render())
    };


    function TextCopiedNotification(text: string) {
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
            <p className="latex-clipboard" onClick={() => TextCopiedNotification(text)}>{text}</p>
        </div>
    )
}