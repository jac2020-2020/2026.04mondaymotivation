# 产品需求文档 (PRD) v2.0: MondayMotivation.org

## 1. 产品定位与核心价值
* **定位：** 全球领先的极简主义周一动力资源库与海报生成器。
* **核心词：** `Monday Motivation` (SEO 核心) 。
* **商业模式：** 依靠高权重域名吸引搜索流量，通过 AdSense 广告与“赞助背景图”变现。

---

## 2. SEO 架构需求 (核心更新)
为了匹配 `mondaymotivation.org` 的权威感，系统必须支持以下技术 SEO 特性：

### 2.1 动态 TDK 映射
系统需根据当前选择的“场景标签 (Category)”动态更新页面元数据：
| 场景 (Slug) | 网页标题 (Title Tag) | Meta Description (部分) |
| :--- | :--- | :--- |
| `/work` | Monday Motivation for Work & Employees | 50+ professional quotes to boost office productivity... |
| `/gym` | Monday Motivation for Gym & Fitness | Hardcore workout quotes and aesthetic fitness posters... |
| `/funny` | Funny Monday Motivation & Memes | Start your week with a laugh. Short, witty Monday quotes... |

### 2.2 结构化数据 (Schema.org)
* **JSON-LD 注入：** 全站集成 `SoftwareApplication`（工具属性）和 `FAQPage`（搜索结果占坑）。
* **ImageObject：** 导出的海报需携带 Metadata，提升 Google Images 排名。

---

## 3. 功能需求与用户流程更新

### 3.1 核心用户体验路径 (User Flow)
* **零门槛体验：** 用户进入网站**无需注册/登录**。
* **即时生成 (Aha Moment)：** 访问首页或具体场景路由时，系统自动随机搭配图文，直接生成 1 张高质量且可分享的海报。
* **高度自定义：** 若对默认生成的图片不满意，用户可进行以下快捷操作：
  * **场景切换：** 切换不同的语录主题（如 Work, Gym, Funny 等）。
  * **一键换图/换文：** 独立切换背景图片或引文内容。
  * **字体自定义：** 允许用户自由切换文字字体（如衬线体、无衬线体等多种精选字体）。
  * **自定义背景：** 支持用户上传自己的本地图片作为海报背景。
* **下载与传播：** 用户调整满意后，可一键下载图片。导出的图片底部自动附加带有 `mondaymotivation.org` 网站 Logo 的极简水印。

### 3.2 增强型画布 (Canvas 2.0)
* **比例自适应：** 提供 `9:16` (Story), `1:1` (Feed), `16:9` (Desktop Wallpaper) 三种尺寸。
* **智能水印：** 在下载导出的图片底部自动渲染极细的网站 Logo 和 `mondaymotivation.org` 字样（要求：低对比度，不破坏审美）。
* **滤镜引擎：** 为背景图提供极简滤镜（如：Grayscale, Darken 40%, Blur），确保文字可读性。

### 3.3 交互逻辑
* **“SEO 文本区”：** 在主画布下方，建立一个由 HTML 渲染的文本区块，自动罗列当前分类下的所有语录（用于爬虫抓取）。
* **一键分享：** 利用 Web Share API，支持手机端直接唤起系统分享。

---

## 4. 数据需求 (Content Schema)
语录库必须结构化，以便支持 SEO 路由：

```json
{
  "id": "unique-slug",
  "text": "The quote content",
  "author": "Author Name",
  "category": ["work", "professional", "success"], // 多标签利于索引
  "seo_alt": "Description for image alt tag"
}
```

---

## 5. 技术堆栈建议 (针对 Builder)
* **框架：** Next.js (SSR/SSG 对 SEO 友好)。
* **部署：** Vercel 或 Cloudflare Pages (与域名解析无缝集成)。
* **图片生成：** Satori (Vercel 出品) 或原生 Canvas API。
* **分析：** Google Search Console + Cloudflare Web Analytics。

---

## 6. 视觉风格 (The .ORG Standard)
* **字体：** 衬线体 (Playfair Display) 用于高级感，无衬线体 (Inter) 用于现代感。
* **UI：** 彻底的留白设计。广告位必须是“非侵入式”的（例如：在下载按钮下方的极简 Banner）。

---

## 7. 待办清单 (Next Steps)
1.  [ ] **基础设施：** 将 `mondaymotivation.org` Nameservers 指向 Cloudflare。
2.  [ ] **SEO 部署：** 配置全套 Meta Tags 和 Schema 脚本。
3.  [ ] **数据注入：** 导入完整的语录数据库。

---

**PRD 更新完毕。** 现在，为了让你的网站不再是“空城”，我们要注入最重要的**燃料**。我已经为你准备好了**第一批 150 条精选语录 (JSON)**，涵盖了从 `Work` 到 `Gym` 到 `Funny` 的所有 SEO 路径。

**准备好接收这份 JSON 数据库了吗？** 拿到它，你的项目今天就能跑起来。