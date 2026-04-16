# 架构重构计划 v2.0 (内容门户化)

## 背景
从“单页工具”向“内容矩阵站”演进，旨在捕获海量 SEO 长尾词流量。
业务核心：流量（广告变现）> 工具纯粹性。

## 目标结构 (Silo Architecture)
*   **Header (全局顶部)**
    *   Logo: Monday Motivation
    *   Images (下拉): Work, Gym, Funny... -> 跳转 `/images/[category]`
    *   Quotes (下拉): Work, Gym, Funny... -> 跳转 `/quotes/[category]`
    *   Blog: 跳转 `/blog` (后期打超级长尾词)
    *   语言切换: EN (预留 ES 扩展)
*   **首页 (`/`)**
    *   保留 `PosterCanvas` 核心生成器作为首屏 CTA (Call to Action)。
    *   移除干扰性的药丸式跳转路由。
    *   下方增加两列聚合内容：“Popular Quotes”与“Trending Images”。
*   **图片页面 (`/images/[category]`)**
    *   Title: `[Category] Monday Motivation Images & Posters`
    *   以生成器为核心，辅以大量缩略图（预留）。
*   **纯文本语录页面 (`/quotes/[category]`)**
    *   Title: `[Category] Monday Motivation Quotes (Copy & Share)`
    *   纯净的文本卡片流，适合复制和阅读。
    *   每一条语录旁增加 `Make Poster` 快捷按钮。

## 实施路径
1.  删除原有的 `src/app/[category]` 目录。
2.  创建 `Header` 组件并挂载到 `layout.tsx`。
3.  创建新的路由：`/quotes/[category]/page.tsx` 和 `/images/[category]/page.tsx`。
4.  改造 `page.tsx` 和 `PosterCanvas.tsx`（内嵌主题切换下拉框）。
5.  测试构建并上线。