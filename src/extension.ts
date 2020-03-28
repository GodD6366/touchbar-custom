// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

const terminal = vscode.window.terminals[0];

function sendTextFunc(setting: string, isGit: boolean = false) {
  let temp =
    vscode.workspace.getConfiguration("touchbar").get(setting) ?? setting;
  vscode.commands.executeCommand("workbench.action.terminal.focus");
  terminal.show();
  vscode.commands.executeCommand("workbench.action.terminal.clear");
  isGit
    ? terminal.sendText("gitp commit -a -s")
    : terminal.sendText("tnpm run " + String(temp));
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "touchbar-custom" is now active!'
  );

  let NPM_RUN = vscode.commands.registerCommand("extension.NPM_run", () => {
    let temp = vscode.workspace.getConfiguration("touchbar").get("run");
    vscode.commands.executeCommand("npm-script.run");
  });

  let GIT_PRO_COMMIT = vscode.commands.registerCommand(
    "extension.GIT_PRO_COMMIT",
    () => {
      sendTextFunc("start", true);
    }
  );
  let NPM_DEV = vscode.commands.registerCommand("extension.NPM_dev", () => {
    sendTextFunc("dev");
  });
  let NPM_BUILD = vscode.commands.registerCommand("extension.NPM_build", () => {
    sendTextFunc("build");
  });
  let NPM_TEST = vscode.commands.registerCommand("extension.NPM_test", () => {
    sendTextFunc("test");
  });
  context.subscriptions.push(
    NPM_DEV,
    NPM_BUILD,
    NPM_TEST,
    NPM_RUN,
    GIT_PRO_COMMIT
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
