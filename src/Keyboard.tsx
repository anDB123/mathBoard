//Keyboard.tsx
import './Keyboard.css'
import { useEffect, useState } from 'react';
import { LatexRender } from './LatexRender';
export default function DisplayKeyboard(handleKey: (key: string, shifting: boolean, capping: boolean) => void) {
    const keys = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';',
        'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'
    ];

    const shiftKeys = [
        '^1', '^2', '^3', '^4', '^5', '^6', '^7', '^8', '^9', '^0',
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'
    ];

    const mathKeys = [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
        '\\nabla', '\\sin', '\\cos', '\\tan', 'e^\\square', 'log', '\\times 10^{\\square}', '{\\square}_{\\square}', '?', '\\infty',
        '+', '-', '\\times ', '÷', '\\frac{d\\square}{d\\square}', '\\int_{\\square}^{\\square}', '\\frac{\\square}{\\square}', '{\\square}^{\\square}', '\\sqrt{}', '()',
        '\\pm', '?', '?', '\\lim\\limits_{\\square \\to \\square}', '\\sum_{\\square}^{\\square}', 'vec', 'mx', '?', '?', '?'
    ];

    const shiftMathKeys = [
        '^1', '^2', '^3', '^4', '^5', '^6', '^7', '^8', '^9', '^0',
        "\\alpha", "\\alpha", "\\eta", "\\rho", "\\tau", "\\upsilon", "\\theta", "\\iota", "\\omega", "\\pi",
        "\\alpha", "\\sigma", "\\delta", "\\phi", "\\gamma", "\\eta", "\\xi", "\\kappa", "\\lambda", '()',
        "\\zeta", "\\chi", "\\psi", "\\omega", "\\beta", "\\nu", "\\mu", '?', '?', '?'
    ];

    const [litKeys, setLitKeys] = useState(Array(keys.length).fill(false));
    const [shifting, setShifting] = useState(false);
    const [capping, setCapping] = useState(false);
    const [spacing, setSpacing] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setCapping(e.getModifierState('CapsLock'));
            setShifting(e.shiftKey);
            if (e.key == ' ')
                setSpacing(true);
            if (keys.includes(e.key.toLowerCase())) {
                const keyPos = keys.indexOf(e.key.toLowerCase());
                setLitKeys(litKeys.map((lit, index) => index === keyPos ? true : lit));
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            setCapping(e.getModifierState('CapsLock'))
            setShifting(e.shiftKey)
            if (e.key == ' ')
                setSpacing(false);
            if (keys.includes(e.key.toLowerCase())) {
                const keyPos = keys.indexOf(e.key.toLowerCase());
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

    function pressedKey(index: number) {
        handleKey(keys[index], shifting, capping);
    }
    function pressSpace() {
        handleKey(' ', shifting, capping);
    }

    return (
        <div className="keyboard-wrapper">
            <div className='all-keys'>
                {(
                    <div className='modifier-keys'>
                        <div className="keyboard-key"></div>
                        <div className="keyboard-key">Tab</div>
                        <div className={capping ? "keyboard-key lit-key" : "keyboard-key"}>Caps</div>
                        <div className={shifting ? "keyboard-key lit-key" : "keyboard-key"}>Shift</div>
                    </div>
                )}
                {(
                    <div className='keyboard'>
                        {(!shifting && !capping) && keys.map((key) => {
                            const keyPos = keys.indexOf(key);
                            const lit = litKeys[keyPos];
                            return (<button onClick={() => pressedKey(keyPos)} className={lit ? "keyboard-key lit-key" : "keyboard-key"}>{LatexRender(key)}</button>);
                        })}
                        {(shifting && !capping) && shiftKeys.map((key) => {
                            const keyPos = shiftKeys.indexOf(key);
                            const lit = litKeys[keyPos];
                            return (<button onClick={() => pressedKey(keyPos)} className={lit ? "keyboard-key lit-key" : "keyboard-key"}>{LatexRender(key)}</button>);
                        })}
                        {(!shifting && capping) && mathKeys.map((key) => {
                            const keyPos = mathKeys.indexOf(key);
                            const lit = litKeys[keyPos];
                            return (<button onClick={() => pressedKey(keyPos)} className={lit ? "keyboard-key lit-key" : "keyboard-key"}>{LatexRender(key)}</button>);
                        })}
                        {(shifting && capping) && shiftMathKeys.map((key) => {
                            const keyPos = shiftMathKeys.indexOf(key);
                            const lit = litKeys[keyPos];
                            return (<button onClick={() => pressedKey(keyPos)} className={lit ? "keyboard-key lit-key" : "keyboard-key"}>{LatexRender(key)}</button>);
                        })}
                    </div>
                )}
            </div>
            <button onClick={pressSpace} className={spacing ? "space lit-key" : "space"}>{LatexRender("Space")}</button>
        </div>);
}