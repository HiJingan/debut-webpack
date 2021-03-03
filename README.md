Webpack官网指南笔记

https://webpack.docschina.org/guides/

## 资源管理

### 加载 CSS

为了在 JavaScript 模块中 import 一个 CSS 文件，需要安装 style-loader 和 css-loader，并在 module 配置 中添加这些 loader

`use: ['style-loader', 'css-loader']`

1. .css 不是 js 模块，需要配置 webpack 使用 css-loader 或者 style-loader 去处理他们
2. style-loader 是将 css-loader 打包好的 css 代码以`<style>`标签的形式插入到 html 中
3. style-loader 是通过一个 JS 脚本创建一个 style 标签，里面包含一些样式。style-loader 是不能单独使用的，应为它并不负责解析 css 之前的依赖关系，每个 loader 的功能都是单一的，各自拆分独立
4. 模块 loader 可链式条用，链会逆序执行，即先执行 css-loader，再把执行的结果传给 style-loader，继续执行

### 加载 images 图像

webpack4 中使用 file-loader、url-loader 来处理图片资源；
webpack5 中新增内置 `Asset Modules`，可以接受并加载文件，然后将其输出到构建目录。图片或者字体文件都可以使用它。

```
{
  test: /\.(jpg|jpeg|png|svg|gif)$/i,
  type: 'asset/resource'
}
```

### 加载数据

1. csv-loader
2. xml-loader

#### 自定义 JSON 模块 parse

暂时不理解具体的应用，参考 https://webpack.docschina.org/guides/asset-management/#customize-parser-of-json-modules

## 管理输出

1. html-webpack-plugin
2. clean-webpack-plugin

## 开发环境

### 使用 source map

当 webpack 打包源码时，可能会很难追踪到 error 和 warning 在源码中的原始位置。例如有三个文件 a.js、b.js、c.js 打包到一个 bundle，而其中有一个源文件包含一个错误，那么堆栈跟踪就会直接指向 bundle.js。

为了更容易的最终到源代码异常，js 提供了 source map 功能，可以将编译后的代码映射会原始代码，如果异常来自于 a.js，那么 source map 可以明确的告知你。

参考： https://webpack.docschina.org/configuration/devtool

### 选择一个开发工具

#### 1. 使用 watch mode(观察者模式)

package.json 添加一个 npm scripts：

```
"watch": "webpack --watch"
```

如果不想在 watch 触发增量构建后删除 index.html 文件，可以在 CleanWebpackPlugin 中配置 cleanStaleWebpackAssets: false 选项 来实现。

这种方式的缺点：为了看到修改后的效果，需要手动刷新浏览器。

#### 2. 使用 webpack-dev-server

webpack-dev-server 提供了一个简单的 web server，且具有 live reloading（实时重新加载）功能

package.json 添加一个 npm scripts:

```
"start": "webpack serve --open"
```

webpack.config.js 中添加配置：
```
devServer: {
  contentBase: './dist'
}
```
上诉配置告知 webpack-dev-server，将 dist 目录下的文件 serve 到 localhost:8080 下



#### 3. 使用 webpack-dev-middleware

参考：https://webpack.docschina.org/guides/development/


## 代码分离

代码分离是webpack的特性之一。它能够把代码分离到不同的bundle中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的bundle，以及控制资源加载优先级，如果使用合理，会极大的影响加载时间。

代码分离的方式：
1. 入口起点，使用entry配置手动分离代码；
2. 防止重复，使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离 chunk；
3. 动态导入：通过模块的内联函数调用来分离代码；

### 入口起点



## 缓存

## 创建 library

## 环境变量

## 构建性能
