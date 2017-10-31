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
path：用来存放打包后文件的输出目录 
publicPath：指定资源文件引用的目录 
用处：例如在express中，指定了public/dist是网站的根目录，网站的源文件存放在public中，那么就需要设置path:”./dist”指定打包输出到该目录，而publicPath就需要设置为”/”,表示当前路径。 
publicPath取决于你的网站根目录的位置，因为打包的文件都在网站根目录了，这些文件的引用都是基于该目录的。假设网站根目录为public，引用的图片路径是’./img.png’，如果publicPath为’/’，图片显示不了，因为图片都打包放在了dist中，那么你就要把publicPath设置为”/dist”
