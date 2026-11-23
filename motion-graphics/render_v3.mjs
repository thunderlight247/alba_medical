import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function render() {
  const width = 1080;
  const height = 1920;
  const fps = 24;
  const duration = 52.0; // 52 seconds
  const totalFrames = Math.round(fps * duration);
  const audioPath = path.join(__dirname, 'assets', 'final_audio_v3.m4a');
  const outputPath = path.join(__dirname, 'malaria_typhoid_truth_reel_v3.mp4');
  const templatePath = 'file://' + path.join(__dirname, 'template_v3.html');

  console.log('Starting v3 Clinical Motion Graphics render:');
  console.log(`- Dimensions: ${width}x${height}`);
  console.log(`- Frames: ${totalFrames} (${fps} fps, ${duration}s)`);
  console.log(`- Audio: ${audioPath}`);
  console.log(`- Output: ${outputPath}`);

  const ffmpeg = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-c:v', 'mjpeg',
    '-framerate', fps.toString(),
    '-i', 'pipe:0',
    '-i', audioPath,
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-shortest',
    outputPath
  ]);

  ffmpeg.stderr.on('data', (data) => {
    const msg = data.toString();
    if (msg.includes('frame=')) {
      process.stdout.write(msg.substring(0, 80) + '\r');
    }
  });

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/chromium',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--font-render-hinting=none'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(templatePath, { waitUntil: 'networkidle0' });

  console.log('\nRendering frames...');
  const startTime = Date.now();

  for (let f = 0; f < totalFrames; f++) {
    await page.evaluate((frameIndex) => {
      window.seekFrame(frameIndex);
    }, f);

    const buffer = await page.screenshot({
      type: 'jpeg',
      quality: 95
    });

    const canWrite = ffmpeg.stdin.write(buffer);
    if (!canWrite) {
      await new Promise(resolve => ffmpeg.stdin.once('drain', resolve));
    }

    if (f % 48 === 0 || f === totalFrames - 1) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const percent = ((f / totalFrames) * 100).toFixed(1);
      const currentFps = (f / ((Date.now() - startTime) / 1000)).toFixed(1);
      console.log(`Progress: ${percent}% (frame ${f}/${totalFrames}, ${elapsed}s, ${currentFps} fps)`);
    }
  }

  ffmpeg.stdin.end();
  await browser.close();

  await new Promise((resolve, reject) => {
    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });
  });

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n🎉 Render Complete in ${totalTime}s!`);
  console.log(`Video saved to: ${outputPath}`);
}

render().catch(err => {
  console.error('Render error:', err);
  process.exit(1);
});
