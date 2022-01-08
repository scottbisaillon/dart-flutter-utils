import * as _ from "lodash";
import { InputBoxOptions, OpenDialogOptions, Uri, window } from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";
import * as changeCase from "change-case";
import { getNewDartClassTemplate } from "../templates";

export const newDartClass = async (uri: Uri) => {
    const className = await promptForClassName();
    if (_.isNil(className) || className.trim() === "") {
        window.showErrorMessage("The class name must not be empty");
        return;
    }

    let targetDirectory;
    if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
        targetDirectory = await promptForTargetDirectory();
        if (_.isNil(targetDirectory)) {
            window.showErrorMessage("Please select a valid directory");
            return;
        }
    } else {
        targetDirectory = uri.fsPath;
    }

    const newDartClassFilePath = `${targetDirectory}/${changeCase.snakeCase(className)}.dart`;
    writeFile(newDartClassFilePath, getNewDartClassTemplate(className), "utf-8", (error) => {
        if (error) {
            // TODO: Show error
        }
    });
};

function promptForClassName(): Thenable<string | undefined> {
    const featureNameProperties: InputBoxOptions = {
        prompt: "Class Name",
        placeHolder: "DartClass"
    };
    return window.showInputBox(featureNameProperties);
}

async function promptForTargetDirectory(): Promise<string | undefined> {
    const options: OpenDialogOptions = {
        canSelectMany: false,
        openLabel: "Select a folder to create the class in",
        canSelectFolders: true,
    };

    return window.showOpenDialog(options).then((uri) => {
        if (_.isNil(uri) || _.isEmpty(uri)) {
            return undefined;
        }
        return uri[0].fsPath;
    });
}
