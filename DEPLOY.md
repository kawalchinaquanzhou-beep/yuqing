# YUQING 卫浴独立站 — 部署与配置指南

纯静态展示站（HTML/CSS/JS），零构建依赖，**无任何在线支付功能**，所有询盘/报价统一走 WhatsApp，直接上传 Cloudflare Pages 即可上线。

## 一、部署到 Cloudflare Pages（约 5 分钟）

1. 打开 https://dash.cloudflare.com → 左侧 **Workers & Pages** → **Create** → **Pages** 标签 → **Upload assets**（直接上传）。
2. 项目名随便填（如 `yuqing`），把 `bathroom-site` 文件夹**内的全部内容**（注意：不是文件夹本身）拖进上传区。
3. 点 **Deploy**，几十秒后你会得到一个 `xxx.pages.dev` 的临时域名，先预览检查。
4. 绑定正式域名：进入该项目 → **Custom domains** → **Set up a custom domain** → 输入你托管在 Cloudflare 的域名（如 `yuqingquanzhou.com` 和根域名 `yuqingquanzhou.com`）。
   - 域名 DNS 已在同一 Cloudflare 账号，会自动添加 CNAME 记录，零配置，几分钟生效。
   - HTTPS 证书自动签发，无需任何操作。
5. 根域名跳转 www（可选）：DNS 里给根域名加一条 CNAME 到 `www`（开启代理橙云即可，Cloudflare 会自动 flatten）。

## 二、已填入的真实信息

| 项目 | 当前值 | 备注 |
|---|---|---|
| 品牌 | YUQING | 全站已替换（Logo 占位为字母 Y，拿到 SVG 后替换） |
| 定位 | 产品展示 + 工厂信任背书 | 无在线支付，报价走 WhatsApp |
| WhatsApp / 电话 | +86 183 5956 3566 | 导航"Get a Quote"、所有报价按钮、悬浮按钮均直达 |
| 邮箱 | kawalchinaquanzhou@gmail.com | 页脚、联系页、政策页 |
| Facebook | Bang Long | 暂用搜索链接，拿到主页 URL 后替换 |
| Instagram | instagram.com/banglongweiyu | 已直连 |
| YouTube | KAWAL | 暂用搜索链接，拿到频道页 URL 后替换 |
| TikTok | tiktok.com/@KAWAL-China1996 | 已直连 |
| 营业时间 | 北京时间 8:00–12:00 / 14:00–18:00（周一至周六） | 联系页 |
| OEM/ODM | 首页板块 + about.html#oem + 导航入口 | "Since 1996" 请确认年份无误 |

仅剩占位：`yuqingquanzhou.com`（canonical/OG/sitemap/robots，上线时全局替换为真实域名）、CSS `:root` 主题色。

Facebook/YouTube 替换位置：全部页面页脚 "Follow Us" 列 + contact.html 联系卡片，全局搜索 `facebook.com/search` 和 `search_query=KAWAL` 定位。

## 三、产品分类与筛选（数据来自你的分类收集表）

产品列表页是**一级分类 + 二级分类两级联动下拉框**，分类名称严格按表格英文填写（已去掉中文括号）：

- 分类树在 `assets/js/main.js` 的 `CATEGORY_TREE`（5 个一级 / 30 个二级）。
- 每个产品在 `PRODUCTS` 数组里通过 `cat`（一级 slug）和 `sub`（二级名称）归属。
- 首页五张分类卡片与表格一级分类一一对应，点击带 `?cat=` 参数直达筛选结果。
- 表格新增分类：只改 `CATEGORY_TREE`，下拉框自动更新。

录入真实产品：在 `PRODUCTS` 复制一段条目改字段；详情页复制 `product/` 下任一文件改名填写。当前 5 个演示产品仅为展示效果，全部替换后演示页可删。

## 四、日常更新

- **改产品**：`assets/js/main.js` 的 `PRODUCTS` 数组（列表页自动更新）+ 对应详情页。
- **改 OEM/ODM 文案**：首页 "Your Brand, Our Factory" 板块 + about.html 的 `#oem` 板块。
- **改完重新部署**：Cloudflare Pages 项目页 → **Create new deployment** → 重新拖拽上传，自动覆盖。

## 五、上线后建议（SEO 与转化）

1. Google Search Console 提交 `https://你的域名/sitemap.xml`。
2. Cloudflare 后台开启 **Auto Minify**（已默认）和 **Brotli** 压缩。
3. 欧盟流量上线前可加 Cookie 同意横幅（可用 Cookiebot 免费版）。
4. 产品图后续换成实拍图时，保持文件名不变即可直接替换，不用改代码。

## 六、将来若要开通在线收款

`main.js` 里保留了空的 `PAYMENT_LINKS` / `PAYPAL_LINKS` 配置位和购买按钮接线逻辑，页面结构无需改动即可恢复收款功能；届时同步更新隐私政策中的支付条款。
