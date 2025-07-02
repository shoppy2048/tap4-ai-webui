/**
 * 图标生成脚本
 *
 * 此脚本使用sharp库从SVG源文件生成各种尺寸的图标
 * 需要先安装sharp: npm install --save sharp
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 图标尺寸配置
const iconSizes = [
  { name: 'favicon.ico', size: 32 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
];

// 源SVG文件路径
const svgSourcePath = path.join(__dirname, '../public/icons/favicon.svg');
const outputDir = path.join(__dirname, '../public/icons');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 将SVG转换为PNG
function convertSvgToPng(inputPath, outputPath, size) {
  try {
    // 使用Inkscape (如果可用)
    try {
      console.log(`Converting ${inputPath} to ${outputPath} (${size}x${size})`);
      execSync(`inkscape --export-filename=${outputPath} --export-width=${size} --export-height=${size} ${inputPath}`);
      console.log(`Generated ${outputPath}`);
      return true;
    } catch (e) {
      console.log('Inkscape not available, trying other methods...');
      return false;
    }
  } catch (error) {
    console.error(`Error converting ${inputPath} to ${outputPath}: ${error.message}`);
    return false;
  }
}

// 创建favicon.ico (需要ImageMagick)
function createFavicon(pngPath, outputPath) {
  try {
    console.log(`Creating favicon.ico from ${pngPath}`);
    execSync(`convert ${pngPath} -define icon:auto-resize=16,32,48,64 ${outputPath}`);
    console.log(`Generated ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error creating favicon: ${error.message}`);
    return false;
  }
}

// 复制SVG到根目录
function copySvgToRoot() {
  const rootFaviconPath = path.join(__dirname, '../public/favicon.svg');
  fs.copyFileSync(svgSourcePath, rootFaviconPath);
  console.log(`Copied SVG to ${rootFaviconPath}`);
}

// 主函数
async function generateIcons() {
  console.log('Starting icon generation...');

  // 生成PNG图标
  for (const icon of iconSizes) {
    if (icon.name === 'favicon.ico') {
      // 先生成32x32 PNG用于favicon
      const tempPngPath = path.join(outputDir, 'temp-favicon.png');
      if (convertSvgToPng(svgSourcePath, tempPngPath, 32)) {
        createFavicon(tempPngPath, path.join(__dirname, '../public/favicon.ico'));
        // 清理临时文件
        try {
          fs.unlinkSync(tempPngPath);
        } catch (e) {}
      }
    } else {
      // 生成其他尺寸的PNG
      convertSvgToPng(svgSourcePath, path.join(outputDir, icon.name), icon.size);
    }
  }

  // 复制SVG到根目录
  copySvgToRoot();

  console.log('Icon generation completed!');
}

// 执行生成
generateIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
