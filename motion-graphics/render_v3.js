const puppeteer = require('puppeteer-core');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function render() {
  const WIDTH = 1080;
  const HEIGHT = 1920;
  const FPS = 24;
  const DURATION = 52.0;
  const TOTAL_FRAMES = Math.round(DURATION * FPS);
  
  const templatePath = path.resolve(__dirname, 'template_v3.html');
  const audioPath = path.resolve(__dirname, 'assets/final_audio_v3.m4a');
  const outputPath = path.resolve(__dirname, 'malaria_typhoid_truth_reel_v3.mp4');

  console.log(`Starting v3 Clinical Motion Graphics render:`);
  console.log(`- Dimensions: ${WIDTH}x${HEIGHT}`);
  console.log(`- Frames: ${TOTAL_FRAMES} (24 fps, ${DURATION}s)`);
  console.log(`- Audio: ${audioPath}`);
  console.log(`- Output: ${outputPath}`);

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 });
  await page.goto(`file://${templatePath}`, { waitUntil: 'networkidle0' });

  // Spawn ffmpeg to read MJPEG pipe
  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-c:v', 'mjpeg',
    '-framerate', `${FPS}`,
    '-i', '-',
    '-i', audioPath,
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-crf', '19',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-shortest',
    outputPath
  ]);

  ffmpeg.stderr.on('data', (d) => {
    const s = d.toString();
    if (s.includes('frame=')) {
      process.stdout.write(s.substring(0, 80) + '\r');
    }
  });

  console.log('Rendering frames...');
  const start = Date.now();

  for (let f = 0; f < TOTAL_FRAMES; f++) {
    await page.evaluate((frameIdx) => {
      window.seekFrame(frameIdx);
    }, f);

    const buffer = await page.screenshot({
      type: 'jpeg',
      quality: 92
    });

    const ok = ffmpeg.stdin.write(buffer);
    if (!ok) {
      await new Promise(r => ffmpeg.stdin.once('drain', r));
    }

    if (f % 48 === 0 || f === TOTAL_FRAMES - 1) {
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      const pct = ((f / TOTAL_FRAMES) * 100).toFixed(0);
      const fpsReal = (f / (Date.now() - start) * 1000).toFixed(1);
      console.log(`Progress: ${pct}% (frame ${f}/${TOTAL_FRAMES}, ${elapsed}s, ${fpsReal} fps)`);
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

  const totalTime = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n🎉 Render Complete in ${totalTime}s!`);
  console.log(`Video saved to: ${outputPath}`);
}

render().catch(err => {
  console.error('Fatal render error:', err);
  process.exit(1);
});
