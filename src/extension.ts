// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { newDartClass } from "./commands";
import { newDartEnum } from "./commands/dart-new-enum.command";
import { newFlutterStatelessWidget } from "./commands/flutter-new-stateless-widget.command";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand("dart-flutter-utils.dartNewClass", newDartClass));
	context.subscriptions.push(vscode.commands.registerCommand("dart-flutter-utils.dartNewEnum", newDartEnum));
	context.subscriptions.push(vscode.commands.registerCommand("dart-flutter-utils.flutterNewStatelessWidget", newFlutterStatelessWidget));
}

// this method is called when your extension is deactivated
export function deactivate() {}
