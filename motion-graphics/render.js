const puppeteer = require('puppeteer-core');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function render() {
  const WIDTH = 1080;
  const HEIGHT = 1920;
  const FPS = 24; // Smooth cinematic motion rate
  const DURATION = 33.0; // seconds
  const TOTAL_FRAMES = Math.round(DURATION * FPS);
  
  const templatePath = path.resolve(__dirname, 'template.html');
  const audioPath = path.resolve(__dirname, 'assets/final_audio.m4a');
  const outputPath = path.resolve(__dirname, 'malaria_typhoid_truth_reel.mp4');

  console.log(`Starting high-speed deterministic render:`);
  console.log(`- Dimensions: ${WIDTH}x${HEIGHT}`);
  console.log(`- FPS: ${FPS}`);
  console.log(`- Duration: ${DURATION}s (${TOTAL_FRAMES} frames)`);
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

  // Spawn FFmpeg to receive high-quality MJPEG frames
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
    '-crf', '19',
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
    const screenshot = await page.screenshot({ type: 'jpeg', quality: 95 });
    
    const canWrite = ffmpeg.stdin.write(screenshot);
    if (!canWrite) {
      await new Promise((resolve) => ffmpeg.stdin.once('drain', resolve));
    }

    if (f % 60 === 0 || f === TOTAL_FRAMES - 1) {
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
