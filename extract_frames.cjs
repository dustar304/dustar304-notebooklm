const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputPath = path.join(__dirname, 'wave.mp4');
const outputDir = path.join(__dirname, 'client', 'public', 'wave_frames');

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Extracting frames to webp...');

ffmpeg(inputPath)
  .outputOptions([
    '-c:v libwebp',
    '-qscale 75' // compression quality
  ])
  .output(path.join(outputDir, 'frame_%03d.webp'))
  .on('end', () => {
    console.log('Frames extraction finished successfully!');
  })
  .on('error', (err) => {
    console.error('Error extracting frames:', err);
  })
  .run();
