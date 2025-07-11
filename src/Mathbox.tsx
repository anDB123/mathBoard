import "./Mathbox.css"
import { useEffect, useMemo, useState } from "react";
import Mathblock from './Mathblock'
import Cursor from "./Cursor"

import { LatexRender } from "./LatexRender";

import { PowerBlock } from "./InputBlocks/PowerBlock";
import { SymbolBlock } from "./SymbolBlock";
import { symbolsMap } from "./SymbolsList";
import { BlocksList } from "./BlocksList";
import DisplayKeyboard from "./Keyboard";


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
    const [history, setHistory] = useState<string[]>([])
    const [outerMathblock, setOuterMathBlock] = useState(new Mathblock(null, setFocusedBlock));
    const cursor = useMemo(() => new Cursor(outerMathblock), [outerMathblock]);

    function undo() {
        setHistory(prev => {
            const newHistory = prev.slice(0, -1);
            if (newHistory.length > 0) {
                const newOuterBlock = new Mathblock(null, setFocusedBlock);
                newOuterBlock.parse(newHistory[newHistory.length - 1], setFocusedBlock);
                setOuterMathBlock(newOuterBlock);
                newOuterBlock.getFocus(cursor);
                setText(newOuterBlock.render());
                return newHistory;
            }
            const newOuterBlock = new Mathblock(null, setFocusedBlock);
            setOuterMathBlock(newOuterBlock);
            newOuterBlock.getFocus(cursor);
            setText(newOuterBlock.render());
            return [];
        });
        return;
    }
    function handleKey(key: string, shifting: boolean, capping: boolean) {
        key = key.toLowerCase();
        console.log(key);
        if (shifting)
            key = key.toUpperCase();
        if (!focusedBlock)
            return;
        if (key === 'backspace')
            focusedBlock.removeItem();
        if (key === 'enter' || key === ' ')
            focusedBlock.submit();
        if (key === 'arrowleft')
            focusedBlock.left();
        if (key === 'arrowright')
            focusedBlock.right();

        if (/^[0-9]$/.test(key)) {
            if (shifting) {
                const newBlock = new PowerBlock(focusedBlock, setFocusedBlock)
                focusedBlock.addItem(newBlock, false);
                newBlock.blocks[1].addItem(key);
            }
            else
                focusedBlock.addItem(key.toString());
        }

        if (shiftedNumbers.includes(key)) {
            const number = shiftedNumberMap[key.toString()];
            const newBlock = new PowerBlock(focusedBlock, setFocusedBlock)
            focusedBlock.addItem(newBlock, false);
            newBlock.blocks[1].addItem(number);
        }
        //check if capslock is enabled (we are in "Mathmode")
        if (capping) {
            if ((/^[a-zA-Z;,.]$/.test(key))) {
                const block = BlocksList.get(key);
                const symbol = symbolsMap.get(key);
                if (symbol)
                    focusedBlock.addItem(new SymbolBlock(focusedBlock, symbol));
                else if (block) {
                    focusedBlock.addItem(new block(focusedBlock, setFocusedBlock));
                }
            }
        }
        else if (/^[a-zA-Z]$/.test(key)) {
            const cursorPos = focusedBlock.items.indexOf(cursor);
            const value = key.toString();
            const last = focusedBlock.items[cursorPos - 1]?.toString();
            if (value == last) {
                const temp = focusedBlock.items[cursorPos - 1]?.toString();
                const vector = "\\vec{" + temp + "}";
                focusedBlock.items[cursorPos - 1] = vector;
            }
            else
                focusedBlock.addItem(key.toString());
        }
        const renderedMath = outerMathblock.render();
        if (renderedMath.replace(/\|/g, "") != history[history.length - 1]) {
            console.log(history);
            if (history.length > 1000)
                setHistory(history.slice(1));
            setHistory(prev => [...prev, outerMathblock.render().replace(/\|/g, "")]);
        }
        setText(renderedMath);
    }
    useEffect(() => {
        outerMathblock.focusFunc = setFocusedBlock;
        if (outerMathblock.cursor === null)
            outerMathblock.getFocus(cursor);
        setText(outerMathblock.render());
    }, [cursor, outerMathblock]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (focusedBlock === null)
            return;
        e.preventDefault(); //in case the page tries to scroll or smth

        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
            undo();
            return;
        }
        handleKey(e.key, e.shiftKey, e.getModifierState('CapsLock'));

    };


    function TextCopiedNotification(text: string) {
        text = text.replace(/\|/g, "");
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
            <p className="latex-clipboard" onClick={() => TextCopiedNotification(text)}>{text && text.length > 1 ? text.replace(/\|/g, "") : "Empty"}</p>
            {DisplayKeyboard(handleKey)}
        </div>
    )
}