运行 npm run start 启动

localhost:9088

### 1. 同构的优点

1. 直接输出完整结构的html和首屏数据，且页面加载速度极快，用户体验好
2. 对seo友好

#### 2. 知识点

1.   webpack对前后端文件进行打包，涉及模板编译等知识，后端负责每个页面首屏的html和数据输出，后面的操作就交给前端js
2.   代理转发，实际工作中很可能是要去调java的接口，这就存在跨域的问题了，这个时候就要通过proxy代理转发了
3.   错误监控，通过多一层promise的封装，捕捉到接口错误，不至于让页面死掉，代码更具健壮性让用户体验更好
4.   npm run dev:server,服务端用webpack将jsx等变成原生的代码
5.   npm run dev:start,用nodemon去执行上面打包的的bundle.js
6.   csr降级：通过url？_mode='csr'或者server文件夹下的config.js文件设置是否为csr