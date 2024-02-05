const os = require('os');

function activate(context) {
    setFont()
    // listen on configuration change
    vscode.workspace.onDidChangeConfiguration((e) => {
        setFont()
    });
}

function setFont() {
    // 检测操作系统
    const platform = os.platform();

    // 获取插件设置对象
    let fontSizeSettings = vscode.workspace.getConfiguration('config-per-os');
    // 获取编辑器设置对象
    let editorConfiguration = vscode.workspace.getConfiguration('editor');

    // 根据操作系统设置字体大小
    if (platform === 'darwin') { // If MacOS
        editorConfiguration.update('fontSize', fontSizeSettings.get('FontSizeMacOS'), vscode.ConfigurationTarget.Global);
    } else if (platform === 'win32') { // If Windows
        editorConfiguration.update('fontSize', fontSizeSettings.get('FontSizeWindows'), vscode.ConfigurationTarget.Global);
    } else if (platform === 'linux') { // If Linux
        editorConfiguration.update('fontSize', fontSizeSettings.get('FontSizeLinux'), vscode.ConfigurationTarget.Global);
    }
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}