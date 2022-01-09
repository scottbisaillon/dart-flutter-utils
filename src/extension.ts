import * as vscode from "vscode";
import { newDartClass, newDartEnum, newFlutterStatefulWidget, newFlutterStatelessWidget } from "./commands";
import { existsSync } from "fs";

export function activate(context: vscode.ExtensionContext) {
	if (vscode.workspace.workspaceFolders !== undefined) {
		let f = vscode.workspace.workspaceFolders[0].uri.fsPath;
		const isDartProject = existsSync(f + "/pubspec.yaml");
		vscode.commands.executeCommand("setContext", "ext.isDartProject", isDartProject);
	}
	else {
		vscode.commands.executeCommand("setContext", "ext.isDartProject", false);
	}

	context.subscriptions.push(vscode.commands.registerCommand("dart-flutter-utils.dartNewClass", newDartClass));
	context.subscriptions.push(vscode.commands.registerCommand("dart-flutter-utils.dartNewEnum", newDartEnum));
	context.subscriptions.push(vscode.commands.registerCommand("dart-flutter-utils.flutterNewStatelessWidget", newFlutterStatelessWidget));
	context.subscriptions.push(vscode.commands.registerCommand("dart-flutter-utils.flutterNewStatefulWidget", newFlutterStatefulWidget));
}

export function deactivate() {}
