## 将项目发布到gh-pages上

1.成功发布到gh-pages,打开gh-pages的预览地址，发现app.js文件找不到404了。 
```
    - 修改index.html中的
        - <script type="text/javascript" src="/assets/app.js"></script>`
        + <script type="text/javascript" src="assets/app.js"></script>` 
```

2.app.js找到之后，却又发现图片都找不到404了。我们在cfg/default.js文件中的scripts可以看到：
```
    - publicPath: '/assets/'
    + publicPath: 'assets/'
```