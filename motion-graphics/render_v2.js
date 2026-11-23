const puppeteer = require('puppeteer-core');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function render() {
  const WIDTH = 1080;
  const HEIGHT = 1920;
  const FPS = 24;
  const DURATION = 33.0;
  const TOTAL_FRAMES = Math.round(DURATION * FPS);
  
  const templatePath = path.resolve(__dirname, 'template_v2.html');
  const audioPath = path.resolve(__dirname, 'assets/final_audio_v2.m4a');
  const outputPath = path.resolve(__dirname, 'malaria_typhoid_truth_reel_v2.mp4');

  console.log(`Starting v2 render with enhanced visual balance and lively audio:`);
  console.log(`- Dimensions: ${WIDTH}x${HEIGHT}`);
  console.log(`- Frames: ${TOTAL_FRAMES} (24 fps)`);
  console.log(`- Audio: ${audioPath}`);
  console.log(`- Output: ${outputPath}`);

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      `--window-size=${WIDTH},${HEIGHT}`
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
  await page.goto(`file://${templatePath}`, { waitUntil: 'networkidle0' });

  const ffmpegArgs = [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-r', String(FPS),
    '-i', '-',
    '-i', audioPath,
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'veryfast',
    '-crf', '18',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-shortest',
    outputPath
  ];

  const ffmpeg = spawn('ffmpeg', ffmpegArgs, { stdio: ['pipe', 'inherit', 'inherit'] });

  console.log('Rendering frames...');
  const startTime = Date.now();

  for (let f = 0; f < TOTAL_FRAMES; f++) {
    const t = f / FPS;
    await page.evaluate((time) => window.setTime(time), t);
    const screenshot = await page.screenshot({ type: 'jpeg', quality: 96 });
    
    const canWrite = ffmpeg.stdin.write(screenshot);
    if (!canWrite) {
      await new Promise((resolve) => ffmpeg.stdin.once('drain', resolve));
    }

    if (f % 90 === 0 || f === TOTAL_FRAMES - 1) {
      const pct = Math.round((f / TOTAL_FRAMES) * 100);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const fps = (f / Math.max(0.001, (Date.now() - startTime) / 1000)).toFixed(1);
      console.log(`Progress: ${pct}% (frame ${f}/${TOTAL_FRAMES}, ${elapsed}s, ${fps} fps)`);
    }
  }

  ffmpeg.stdin.end();
  await browser.close();

  await new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });

  const totalSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n Render Complete in ${totalSec}s!`);
  console.log(`Video saved to: ${outputPath}`);
}

render().catch((err) => {
  console.error('Render error:', err);
  process.exit(1);
});
