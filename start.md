git clone  ssh链接

进入目录 vue create . （项目初始化） code.(打开项目)

提交至云仓库 git add .    git commit -m "项目初始化" git push

安装vant   vue2按需引入样式

​	npm i babel-plugin-import -D

​	在babel里引入配置plugins: [    ['import', {      libraryName: 'vant',      libraryDirectory: 'es',      style: true    }, 'vant']  ]

配置适配rem

​	cssrem配置

​	html{font-size: 100px !important;}

​	html，body{height:100%} #app{min-height:100%}

清楚样式：

​	npm i reset-css

​	main.js 引入 **import** 'reset-css';

数据请求封装

​	http://kumanxuan1.f3322.net:8001

​	