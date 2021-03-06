import * as changeCase from "change-case";
import { lstatSync, writeFile } from "fs";
import * as _ from "lodash";
import { Uri, window } from "vscode";
import { promptForInput, promptForTargetDirectory } from "../helpers";
import { getNewFlutterStatelessWidgetTemplate } from "../templates";

export const newFlutterStatelessWidget = async (uri: Uri) => {
    const widgetName = await promptForInput("Widget Name", "StatelessWidget");
    if (_.isNil(widgetName) || widgetName.trim() === "") {
        window.showErrorMessage("The widget name must not be empty");
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

    const newFlutterStatelessWidgetFilePath = `${targetDirectory}/${changeCase.snakeCase(widgetName)}.dart`;
    writeFile(newFlutterStatelessWidgetFilePath, getNewFlutterStatelessWidgetTemplate(widgetName), "utf-8", (error) => {
        if (error) {
            window.showErrorMessage(`Failed to right file: ${error}`);
        }
    });
};
