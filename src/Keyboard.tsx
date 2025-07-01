//Keyboard.tsx
import './Keyboard.css'
import { useEffect, useState } from 'react';
import { LatexRender } from './LatexRender';
export default function Keyboard() {
    const keys = [
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'
    ];
    const keysLower = [
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
        'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.',
    ];
    const mathKeys =
        ['\\nabla', '\\sin', '\\cos', '\\tan', 'e^\\square', 'log', '\\times 10^{\\square}', '{\\square}_{\\square}', '?', '\\infty',
            '+', '-', '\\times ', '÷', '\\frac{d\\square}{d\\square}', '\\int_{\\square}^{\\square}', '\\frac{\\square}{\\square}', '{\\square}^{\\square}', '\\sqrt{}', '()',
            '\\pm', '?', '?', '\\lim\\limits_{\\square \\to \\square}', '\\sum_{\\square}^{\\square}', '?', 'mx', '?', '?', '?'];

    const [curKeys, setCurKeys] = useState(keys);
    const [litKeys, setLitKeys] = useState(Array(keys.length).fill(false));

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Check if CapsLock is on and switch to math keys if it is
            if ((e.getModifierState('CapsLock')))
                setCurKeys(mathKeys);
            else
                setCurKeys(keys);

            if (keysLower.includes(e.key)) {
                const keyPos = keysLower.indexOf(e.key);
                if (litKeys[keyPos])
                    return;
                setLitKeys(litKeys.map((lit, index) => index === keyPos ? true : lit));
            }
            if (keys.includes(e.key)) {
                const keyPos = keys.indexOf(e.key);
                if (litKeys[keyPos])
                    return;
                setLitKeys(litKeys.map((lit, index) => index === keyPos ? true : lit));
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if ((e.getModifierState('CapsLock')))
                setCurKeys(mathKeys);
            else
                setCurKeys(keys);
            if (keysLower.includes(e.key)) {
                const keyPos = keysLower.indexOf(e.key);
                setLitKeys(litKeys.map((lit, index) => index === keyPos ? false : lit));
            }
            if (keys.includes(e.key)) {
                const keyPos = keys.indexOf(e.key);
                setLitKeys(litKeys.map((lit, index) => index === keyPos ? false : lit));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyDown);
        };
    }, []);

    return (
        <div className="keyboard-wrapper">
            {(
                <div className='keyboard'>
                    {curKeys.map((key) => {
                        const keyPos = curKeys.indexOf(key);
                        const lit = litKeys[keyPos];
                        return (<div className={lit ? "keyboard-key lit-key" : "keyboard-key"}>{LatexRender(key)}</div>);
                    })}
                </div>
            )
            }
        </div>);
}