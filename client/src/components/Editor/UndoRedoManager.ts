class UndoRedoManager {
    private undoStack: string[];
    private redoStack: string[];
    private capacity: number;

    constructor(capacity: number = 20) {
        this.undoStack = [];
        this.redoStack = [];
        this.capacity = capacity;
    }

    // Save the current state to the undo stack and clear the redo stack
    saveState(state: string): void {
        if (this.undoStack.length === this.capacity) {
            this.undoStack.shift(); // Remove the oldest state if at capacity
        }
        this.undoStack.push(state);
        this.redoStack = []; // Clear the redo stack whenever a new state is saved
    }

    // Undo the last action, moving the state from the undo stack to the redo stack
    undo(): string | null {
        if (this.undoStack.length === 0) {
            return null; // No states to undo
        }
        const state = this.undoStack.pop()!;
        this.redoStack.push(state);
        return this.undoStack.length > 0 ? this.undoStack[this.undoStack.length - 1] : null;
    }

    // Redo the last undone action, moving the state from the redo stack back to the undo stack
    redo(): string | null {
        if (this.redoStack.length === 0) {
            return null; // No states to redo
        }
        const state = this.redoStack.pop()!;
        this.undoStack.push(state);
        return state;
    }

    // Get the current state without altering the stacks
    getCurrentState(): string | null {
        return this.undoStack.length > 0 ? this.undoStack[this.undoStack.length - 1] : null;
    }

    // Clear all stacks
    clearHistory(): void {
        this.undoStack = [];
        this.redoStack = [];
    }
}

export default UndoRedoManager;