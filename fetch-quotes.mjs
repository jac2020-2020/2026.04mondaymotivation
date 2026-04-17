import fs from 'fs';
import path from 'path';

// 备用方案：DummyJSON Quotes API (1454条语录)
// 因为该 API 没有内置强大的分类标签，我们需要自己基于关键词进行归类
const TOTAL_TO_FETCH = 1000;
const MAX_LENGTH = 200;

const KEYWORDS = {
  work: ["work", "business", "leader", "job", "career", "money", "company", "boss", "wealth", "manage"],
  gym: ["strength", "gym", "train", "sport", "pain", "body", "push", "muscle", "endurance", "sweat", "hard", "tough"],
  funny: ["humor", "funny", "laugh", "joke", "smile", "fool", "stupid", "hilarious"],
  success: ["success", "motivate", "inspire", "win", "achieve", "dream", "goal", "future", "believe", "great", "best"]
};

// 简单的本地归类函数
function inferCategory(text) {
  const t = text.toLowerCase();
  for (const [cat, words] of Object.entries(KEYWORDS)) {
    if (words.some(w => t.includes(w))) {
      return cat;
    }
  }
  return "motivation"; // 默认 fallback
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  let allQuotes = [];
  const seen = new Set();
  
  console.log("Quotable API 不可用，切换至 DummyJSON Quotes API 抓取数据...");
  
  // DummyJSON quotes 一次最多获取 30 条，我们可以通过 skip 和 limit 分页获取
  let skip = 0;
  const limit = 50;

  while (allQuotes.length < TOTAL_TO_FETCH && skip < 1454) {
    try {
      const url = `https://dummyjson.com/quotes?limit=${limit}&skip=${skip}`;
      const res = await fetch(url);
      
      if (!res.ok) {
        console.warn(`请求失败: ${res.status}`);
        break;
      }
      
      const data = await res.json();
      if (!data.quotes || data.quotes.length === 0) break;

      for (const item of data.quotes) {
        if (item.quote.length <= MAX_LENGTH && !seen.has(item.id)) {
          seen.add(item.id);
          
          const category = inferCategory(item.quote);
          
          allQuotes.push({
            id: `dj-${item.id}`,
            text: item.quote,
            author: item.author || "Unknown",
            category: category,
            seo_alt: `${category} motivation quote by ${item.author || "Unknown"}`
          });
        }
      }
      
      console.log(`已抓取并处理: ${allQuotes.length} 条... (进度 skip: ${skip})`);
      skip += limit;
      
      await delay(500); // 稍微延迟防并发
    } catch (err) {
      console.error("抓取错误:", err.message);
      break;
    }
  }

  // 按分类统计
  const counts = { work: 0, gym: 0, funny: 0, success: 0, motivation: 0 };
  allQuotes.forEach(q => { counts[q.category] = (counts[q.category] || 0) + 1; });
  
  console.log("\n--- 分类统计 ---");
  console.table(counts);

  const outDir = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'fetched_quotes.json');
  fs.writeFileSync(outPath, JSON.stringify(allQuotes, null, 2), 'utf-8');
  console.log(`\n✅ 抓取完成！成功保存 ${allQuotes.length} 条语录到: ${outPath}`);
}

main();
