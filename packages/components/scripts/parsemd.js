import { marked } from 'marked';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const testPath = path.resolve(__dirname, '../Button/__demo__/icon.md');
const content = fs.readFileSync(testPath).toString();

// 配置marked选项，禁用HTML转义
marked.setOptions({
  sanitize: false,
  headerIds: false,
  mangle: false,
});

// 解析Markdown内容
let parsedContent = marked.parse(content);

// 将HTML实体转换回HTML标签
parsedContent = parsedContent
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'");

console.log(parsedContent);
