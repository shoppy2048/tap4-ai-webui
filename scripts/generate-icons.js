const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SVG_PATH = path.join(__dirname, '../public/icons/favicon.svg');
const OUTPUT_DIR = path.join(__dirname, '../public/icons');
const PUBLIC_DIR = path.join(__dirname, '../public');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generatePng(size) {
  try {
    const outputPath = path.join(OUTPUT_DIR, `android-chrome-${size}x${size}.png`);
    await sharp(SVG_PATH)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`生成 ${size}x${size} PNG 成功: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error(`生成 ${size}x${size} PNG 失败:`, error);
    throw error;
  }
}

async function generateAppleIcon() {
  try {
    const outputPath = path.join(OUTPUT_DIR, 'apple-touch-icon.png');
    await sharp(SVG_PATH)
      .resize(180, 180)
      .png()
      .toFile(outputPath);
    console.log(`生成 Apple Touch Icon 成功: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error('生成 Apple Touch Icon 失败:', error);
    throw error;
  }
}

// 生成 favicon.ico（实际上是复制PNG，因为sharp不直接支持ico）
async function generateFavicon() {
  try {
    // 使用生成的32x32 PNG替换现有的favicon.ico
    const faviconOutput = path.join(PUBLIC_DIR, 'favicon.ico');
    const tempPng = path.join(OUTPUT_DIR, 'favicon-32x32.png');
    
    // 先创建32x32的PNG
    await sharp(SVG_PATH)
      .resize(32, 32)
      .png()
      .toFile(tempPng);
      
    // 复制到favicon.ico位置
    fs.copyFileSync(tempPng, faviconOutput);
    console.log(`生成临时 favicon PNG 成功，并复制到: ${faviconOutput}`);
    
    // 删除临时文件
    fs.unlinkSync(tempPng);
    
    return faviconOutput;
  } catch (error) {
    console.error('生成 favicon.ico 失败:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('开始生成图标...');
    
    // 生成不同尺寸的PNG图标
    await generatePng(192);
    await generatePng(512);
    
    // 生成Apple Touch Icon
    await generateAppleIcon();
    
    // 生成favicon.ico
    await generateFavicon();
    
    console.log('所有图标生成完成！');
  } catch (error) {
    console.error('图标生成过程中出现错误:', error);
    process.exit(1);
  }
}

main(); 