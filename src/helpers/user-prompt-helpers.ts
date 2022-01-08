import { InputBoxOptions, window } from "vscode";

export function promptForInput(prompt: string, placeHolder: string): Thenable<string | undefined> {
    const featureNameProperties: InputBoxOptions = {
        prompt,
        placeHolder
    };
    return window.showInputBox(featureNameProperties);
}