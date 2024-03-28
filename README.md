# Code translation

```sh
jar cfm comment.jar MANIFEST.MF *.class
java -jar comment.jar <arg1>
```
打包使用
```sh
npm install -g vsce
vsce package
```
生成一个.vsix文件。之后在vscode插件里面安装.
