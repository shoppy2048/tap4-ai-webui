const fs = require('fs');
const path = require('path');

// 修复尾随空格和确保文件以换行符结尾
function fixTrailingSpacesAndEOL(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // 删除每行末尾的空格
    content = content.replace(/[ \t]+$/gm, '');

    // 确保文件以换行符结尾
    if (!content.endsWith('\n')) {
      content += '\n';
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed trailing spaces and EOL in ${filePath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}: ${err.message}`);
  }
}

// 修复缺少尾随逗号的问题
function fixMissingCommas(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // 匹配可能缺少尾随逗号的模式
    // 注意：这是一个简化的修复，可能不适用于所有情况
    content = content.replace(/(\s*)(\w+)(\s*)\n(\s*)[}\]]/g, '$1$2,$3\n$4$5');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed missing commas in ${filePath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}: ${err.message}`);
  }
}

// 修复JSX引号问题
function fixJsxQuotes(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // 将双引号替换为单引号
    content = content.replace(/(\s+\w+)="([^"]+)"/g, "$1='$2'");

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed JSX quotes in ${filePath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}: ${err.message}`);
  }
}

// 需要修复的文件列表
const filesToFix = [
  'app/[locale]/(with-footer)/(home)/page.tsx',
  'app/[locale]/layout.tsx',
  'app/sitemap.ts',
  'components/seo/GameSchema.tsx',
  'components/seo/SeoScript.tsx',
  'components/webNav/WebNavCard.tsx',
  'lib/seo-config.ts',
];

// 执行修复
filesToFix.forEach((file) => {
  const filePath = path.join(__dirname, file);
  console.log(`Processing ${filePath}...`);

  fixTrailingSpacesAndEOL(filePath);
  fixMissingCommas(filePath);

  // 只对需要的文件修复JSX引号
  if (file === 'components/seo/GameSchema.tsx') {
    fixJsxQuotes(filePath);
  }
});

console.log('All files processed.');
