### 安装
```
npm install tryjs -g
```
如果安装失败，请使用 sudo

### 使用
1. 进入到想要执行的目录
2. 执行 tryjs
```
$ tryjs
```

### Usage
```
Usage: tryjs [options]

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -c --configFile [file]       指定 config 文件
    -f, --file [file]            指定某个文件
    -d, --directory [directory]  指定文件夹
    -i, --ignore [ignores]       忽略文件夹或文件
```

### 通过 config 文件配置，默认为项目根目录下的 tryjs.config 文件，格式为JSON
```
{
    include: '.js .jsx', //包含的文件类型
    ignoreFiles: [], //忽略的文件
    ignoreFolders: [], //忽略的文件夹
    compileFile: '', //指定编译的文件
    directory: ["src"], //指定编译的文件夹
    errHandler: 'ErrorHandler' //错误处理函数名
}
```

### UPDATE LOG
- *0.0.1* use uglifyjs2

- *0.0.2*

- *0.1.0* rework
  change: change acore to parse AST
  change: use esgencode to gennereate code

- *0.1.2*
  change: 读写操作改为同步
