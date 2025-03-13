import { marked } from 'marked';
import path, { dirname } from 'path';
import fs from 'fs';
import * as htmlparser2 from 'htmlparser2';
import render from 'dom-serializer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getMetaData(path: string) {
  const content = fs.readFileSync(path).toString();
  let parsedContent = marked.parse(content);
  const root = htmlparser2.parseDocument(parsedContent as string);
  const jsCode = htmlparser2.DomUtils.findOne(el => {
    return el.attribs.class === 'language-tsx';
  }, root);
  const cssCode = htmlparser2.DomUtils.findOne(el => {
    return el.attribs.class === 'language-css';
  }, root);

  const findBySingleH2ChildrenData = str => {
    const dom = htmlparser2.DomUtils.findOne(el => {
      return el.name === 'h2' && el.children.length > 0 && el.children[0].data === str;
    }, root);
    //   console.log(dom, 'dom');
    if (dom) {
      let current = dom;

      while (current?.nextSibling?.name !== 'p' && current) {
        current = current.nextSibling;
      }
      if (current && current.nextSibling.name === 'p') {
        return render(current.nextSibling, { decodeEntities: false });
      }
      return '';
    }
    return '';
  };
  const findTitle = (key: string) => {
    const h2 = htmlparser2.DomUtils.findOne(el => el.name === 'h2', root);
    if (h2) {
      const value = render(h2.children, { decodeEntities: false });
      const cc = value.split('\n');

      for (const item of cc) {
        const [_key, _value] = item.split(':');
        //   console.log(c, d);
        if ((_key || '').trim() === key) {
          return (_value || '').trim();
        }
      }
    }
    return '';
  };
  const result = {
    js_code:
      jsCode && jsCode.children && (jsCode.children || []).length > 0
        ? jsCode.children[0].data
        : '',
    css_code:
      cssCode && cssCode.children && (cssCode.children || []).length > 0
        ? cssCode.children[0].data
        : '',
    'zh-CN_desc': findBySingleH2ChildrenData('zh-CN'),
    'en-US_desc': findBySingleH2ChildrenData('en-US'),
    'zh-CN_title': findTitle('zh-CN'),
    order: findTitle('order'),
    'en-US_title': findTitle('en-US'),
  };
  return {
    result: result,
    formatString: `const params={
         order:${result.order},
        'zh-CN_title':"${result['zh-CN_title']}",
        'en-US_title':"${result['en-US_title']}",
        'zh-CN_desc':${result['zh-CN_desc']},
        'en-US_desc':${result['en-US_desc']},
        'js_code':\`${result.js_code}\`,

    }`,
  };
}
export default getMetaData;
