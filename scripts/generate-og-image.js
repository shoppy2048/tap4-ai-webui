const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/images');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 创建一个简单的Open Graph图片SVG
const createSimpleOgImage = () => {
  return `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <!-- 背景 -->
    <rect width="1200" height="630" fill="#222129"/>
    
    <!-- 渐变背景元素 -->
    <rect x="0" y="0" width="1200" height="630" fill="#4169E1" opacity="0.05"/>
    <circle cx="1100" cy="100" r="300" fill="#4169E1" opacity="0.1"/>
    <circle cx="100" cy="500" r="200" fill="#4169E1" opacity="0.1"/>
    
    <!-- 简化的游戏手柄图标 -->
    <g transform="translate(180, 200)">
      <circle cx="120" cy="120" r="100" fill="#222129" stroke="#4169E1" stroke-width="8"/>
      <rect x="80" y="90" width="80" height="60" rx="10" fill="#4169E1"/>
      <rect x="90" y="110" width="15" height="5" rx="2" fill="#222129"/>
      <rect x="95" y="105" width="5" height="15" rx="2" fill="#222129"/>
      <circle cx="135" cy="110" r="5" fill="#FF5252"/>
      <circle cx="125" cy="120" r="5" fill="#43A047"/>
      <circle cx="125" cy="100" r="5" fill="#FFC107"/>
      <circle cx="145" cy="110" r="5" fill="#9C27B0"/>
    </g>
    
    <!-- 标题和副标题 -->
    <text x="600" y="250" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">XXgames</text>
    <text x="600" y="330" font-family="Arial, sans-serif" font-size="36" fill="#CCCCCC" text-anchor="middle">探索最佳游戏 2024</text>
    
    <!-- 底部网址 -->
    <text x="600" y="550" font-family="Arial, sans-serif" font-size="28" fill="#AAAAAA" text-anchor="middle">xxgames.com</text>
  </svg>
  `;
};

async function generateOgImage() {
  try {
    console.log('开始生成Open Graph图片...');
    
    const ogImageSvg = createSimpleOgImage();
    const ogImagePath = path.join(OUTPUT_DIR, 'og-image.jpg');
    
    // 将SVG转换为JPG
    await sharp(Buffer.from(ogImageSvg))
      .jpeg({ quality: 90 })
      .toFile(ogImagePath);
      
    console.log(`成功生成Open Graph图片: ${ogImagePath}`);
    
    // 同时创建Twitter图片
    const twitterImagePath = path.join(OUTPUT_DIR, 'twitter-image.jpg');
    
    await sharp(Buffer.from(ogImageSvg))
      .resize(800, 418)
      .jpeg({ quality: 85 })
      .toFile(twitterImagePath);
      
    console.log(`成功生成Twitter图片: ${twitterImagePath}`);
    
  } catch (error) {
    console.error('生成Open Graph图片过程中出现错误:', error);
    process.exit(1);
  }
}

generateOgImage(); 