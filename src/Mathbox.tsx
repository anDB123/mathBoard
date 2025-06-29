import "./Mathbox.css"
import { useEffect, useState } from "react";
import katex from "katex";
import Mathblock from './Mathblock'
import { BracketBlock } from "./BracketBlock";
import { FractionBlock } from "./FractionBlock";
import { SqrtBlock } from "./SqrtBlock";
import Caret from "./Caret";
import { IntBlock } from "./IntBlock";
import { DiffBlock } from "./DiffBlock";
import { PowerBlock } from "./PowerBlock";
import { SubBlock } from "./SubBlock";
import { LimitBlock } from "./LimitBlock";
export default function Mathbox() {
    const [focused, setFocused] = useState(false);
    const [text, setText] = useState("x+2y=z");
    // Replace 'any' with the actual type if available, e.g., Mathblock or a base class/interface
    const [focusedBlock, setFocusedBlock] = useState<Mathblock>(new Mathblock(null, null));
    const [outerMathblock, setOuterMathBlock] = useState(new Mathblock(null, setFocusedBlock));
    const [caret, setCaret] = useState(new Caret());
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
                focusedBlock.addItem('×');
            if (e.key === 'F')
                focusedBlock.addItem('÷');
            if (e.key === '=')
                focusedBlock.addItem('=');
            if (e.key === 'P')
                focusedBlock.addItem('\\infty ');
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
        }
        else if (/^[a-zA-Z0-9]$/.test(e.key)) {
            focusedBlock.addItem(e.key);
        }
        setText(outerMathblock.render())
    };

    function LatexRender(text: string) {
        const html = katex.renderToString(text, {
            throwOnError: false,
            displayMode: false, // false for inline math
        });

        return <div dangerouslySetInnerHTML={{ __html: html }} />;
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
            {focused && (<div>We are focused</div>)}

        </div>
    )
}