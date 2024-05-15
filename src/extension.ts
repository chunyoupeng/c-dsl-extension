// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { exec } from "child_process";
import * as path from "path";
const fs = require("fs");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {
export function activate(context: vscode.ExtensionContext): void {
  let disposable = vscode.commands.registerCommand(
    "c-comment.insertStruct",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        console.error("No open text editor");
        return;
      }

      const document = editor.document;
      const fullText = document.getText();
      const originalFilePath = document.fileName;
      const originalFileName = path.basename(originalFilePath);
      const newFileName = originalFileName.replace(/\.[^/.]+$/, ".json"); // 替换文件扩展名为.json
      const outDir = path.join(path.dirname(originalFilePath), "out");

      // 确保out目录存在
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }

      const jarPath = path.join(context.extensionPath, "lib", "TestC.jar");
      console.log(jarPath);
      const javaCmd = "java -Dfile.encoding=UTF-8 -jar " + jarPath;

      // 执行Java JAR并传递文件内容
      const process = exec(javaCmd, (error, stdout, stderr) => {

        if (error) {
          console.error(`Error running JAR: ${error}`);
          return;
        }

        // 将处理后的内容输出到out目录下的新.json文件
        const outputPath = path.join(outDir, newFileName);
        fs.writeFile(outputPath, stdout, (err: any) => {
          if (err) {
            console.error(`Error writing to file: ${err}`);
            return;
          }
          console.log(`Successfully wrote to ${outputPath}`);
        });
      });

      if (process.stdin) {
        process.stdin.write(fullText);
        process.stdin.end();
      } else {
        console.error("Failed to get stdin for the child process");
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
