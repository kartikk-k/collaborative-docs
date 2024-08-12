import { ABC } from 'abc-library'; // Assuming 'abc-library' is the library to be used for auto-completion

interface AutoCompleteContext {
    text: string;
    cursorPosition: number;
}

class AutoCompleter {
    private abcInstance: ABC;

    constructor() {
        this.abcInstance = new ABC();
    }

    /**
     * Predicts the next word or symbol based on the current context.
     * @param context The current text and cursor position in the editor.
     * @returns A list of suggested completions.
     */
    predict(context: AutoCompleteContext): string[] {
        const { text, cursorPosition } = context;
        const prefix = this.extractPrefix(text, cursorPosition);
        return this.abcInstance.predict(prefix);
    }

    /**
     * Extracts the prefix used for the prediction based on the cursor position.
     * @param text The current text in the editor.
     * @param cursorPosition The position of the cursor in the text.
     * @returns The extracted prefix.
     */
    private extractPrefix(text: string, cursorPosition: number): string {
        const words = text.substring(0, cursorPosition).split(/\s+/);
        return words[words.length - 1]; // Get the last word before the cursor
    }
}

export default AutoCompleter;