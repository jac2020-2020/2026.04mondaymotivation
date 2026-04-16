# 核心开发计划: MondayMotivation.org

基于项目 PRD (v2.0)，本计划采用**敏捷开发策略 (Agile Strategy)**，目标是在最短时间内交付核心 MVP (Minimum Viable Product)，验证“零门槛即时生成”与“SEO 驱动流量”两大假设。

开发周期预计分为 **4 个阶段 (Phases)**。

---

## Phase 1: 基础设施搭建与数据层
**目标：** 构建极简、SEO 友好的底层架构，完成数据注入与基础路由。

*   **1.1 项目初始化**
    *   搭建 Next.js (App Router) 脚手架，配置 Tailwind CSS。
    *   引入核心字体库（`Playfair Display` 衬线体, `Inter` 无衬线体）。
    *   配置绝对路径、代码规范 (ESLint + Prettier)。
*   **1.2 语录数据驱动 (Data Layer)**
    *   设计 TypeScript 接口 (`Quote`, `Category`)。
    *   将 150 条精选 JSON 语录数据注入项目 (或集成轻量级 CMS / 静态文件读取)。
    *   实现核心工具函数：根据类别随机获取语录 (`getRandomQuoteByCategory`)。
*   **1.3 SEO 基础骨架**
    *   配置全站静态化路由 (SSG) 与动态路由 (`/[category]`)。
    *   实现基于类别的动态 TDK (Title, Description, Keywords) 映射。
    *   开发 JSON-LD 组件，支持 `SoftwareApplication` 和 `FAQPage` 结构化数据注入。

---

## Phase 2: 核心画布引擎与随机生成
**目标：** 实现用户的“Aha Moment”，一进网站即可看到精美的图文海报。

*   **2.1 画布基础 (Canvas Base)**
    *   集成 `html-to-image` 或 `Satori`（用于服务端/客户端的高质量图片渲染）。
    *   实现三种核心比例的自适应容器：`9:16` (Story), `1:1` (Feed), `16:9` (Wallpaper)。
*   **2.2 图文合成引擎**
    *   接入无版权高质量图库 API (如 Unsplash API) 获取背景，或使用预设本地精美背景库。
    *   实现背景图片极简滤镜处理 (Grayscale, Darken, Blur)，保证上方文字高对比度可读。
    *   实现文字自动换行与排版（居中/左对齐，配合 `Playfair Display` 呈现高级感）。
*   **2.3 零门槛即时体验**
    *   页面加载时（首页或分类页），自动随机拼装“背景 + 语录”。
    *   实现主视图下方的“SEO 文本区”，用纯 HTML 渲染当前场景的所有语录，供爬虫抓取。

---

## Phase 3: 用户自定义交互与分享
**目标：** 提供高自由度的自定义功能，闭环用户的分享下载流程。

*   **3.1 自定义控制面板 (Control Panel)**
    *   **一键换搭：** 实现独立刷新背景图 (Refresh Image) 与刷新引文 (Refresh Quote) 功能。
    *   **场景切换：** 分类 Tab 栏，无缝切换 `Work`, `Gym`, `Funny` 等，并同步更新路由。
    *   **排版调整：** 提供字体切换按钮 (衬线体 vs 无衬线体)。
*   **3.2 用户上传功能**
    *   实现本地图片上传读取功能 (FileReader API)。
    *   将用户上传的图片应用为画布背景，并自动应用滤镜。
*   **3.3 下载与传播 (Export)**
    *   实现“一键下载”功能：在渲染前，向画布底部自动注入极细/低对比度的 `mondaymotivation.org` 网站 Logo 水印。
    *   实现 Web Share API 唤起：在移动端支持一键调用系统原生分享。

---

## Phase 4: 视觉打磨、变现与上线
**目标：** 达到 `.ORG Standard` 极简视觉标准，部署上线并配置追踪。

*   **4.1 极致视觉 (UI/UX Polish)**
    *   全站留白设计审查，去除多余线条和色彩。
    *   优化加载状态 (Skeleton/Spinner) 和交互微动画，提升高级感。
*   **4.2 商业化占位 (Monetization Prep)**
    *   在下载按钮下方或其他非侵入式区域，预留极简 AdSense 广告位或赞助商 Logo 区域。
*   **4.3 部署与运维监控**
    *   部署至 Vercel 或 Cloudflare Pages，绑定 `mondaymotivation.org` 域名并开启 HTTPS。
    *   集成 Google Search Console 进行 Sitemap 提交。
    *   集成 Cloudflare Web Analytics 跟踪流量。
    *   最终多端（Desktop/Mobile）兼容性及生成图片质量测试。