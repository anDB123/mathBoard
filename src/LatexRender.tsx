import katex from "katex";

export function LatexRender(text: string) {
    const html = katex.renderToString(text, {
        throwOnError: false,
        displayMode: false, // false for inline math
    });

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}