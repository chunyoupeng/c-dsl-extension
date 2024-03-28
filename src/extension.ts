// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

export function activate(context: vscode.ExtensionContext): void {
    let disposable = vscode.commands.registerCommand('c-comment.insertStruct', () => {

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        // No open text editor
        console.error('No open text editor');
        return;
    }

    const document = editor.document;
    const fullText = document.getText();
    const jarPath = path.join(context.extensionPath, 'lib', 'comment.jar ', context.extensionPath);
    console.log(jarPath);
    const javaCmd = 'java -jar ' + jarPath;
    // Execute the Java JAR and pass the file content
    const process = exec(javaCmd, (error, stdout, stderr) => {
        if (error) {
            console.error(` Error running JAR: ${error}`);
            return;
        }

        // Replace the editor content with the output
		//@racket
        editor.edit(editBuilder => {
            const entireRange = new vscode.Range(
                document.lineAt(0).range.start,
                document.lineAt(document.lineCount - 1).range.end
            );
			console.log(entireRange);
            editBuilder.replace(entireRange, stdout);
        }).then(success => {
            console.log("Sucessfully replaced text in editor");
            if (!success) {
                vscode.window.showErrorMessage('Error replacing text in editor');
            }
        });
    });

    // Check if stdin is not null
    if (process.stdin) {
        console.log("Successfully got stdin for the child process");
        process.stdin.write(fullText);
        process.stdin.end();
    } else {
        console.error('Failed to get stdin for the child process');
    }
    });
    context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
export function deactivate() {}
