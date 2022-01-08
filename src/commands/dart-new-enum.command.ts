import * as changeCase from "change-case";
import { lstatSync, writeFile } from "fs";
import * as _ from "lodash";
import { Uri, window } from "vscode";
import { promptForInput, promptForTargetDirectory } from "../helpers";
import { getNewDartEnumTemplate } from "../templates";

export const newDartEnum = async (uri: Uri) => {
    const className = await promptForInput("Enum Name", "DartEnum");
    if (_.isNil(className) || className.trim() === "") {
        window.showErrorMessage("The enum name must not be empty");
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
    writeFile(newDartClassFilePath, getNewDartEnumTemplate(className), "utf-8", (error) => {
        if (error) {
            window.showErrorMessage(`Failed to right file: ${error}`);
        }
    });
};